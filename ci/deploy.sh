#!/usr/bin/env bash
#
# 운영 서버 배포 스크립트 — GitLab CI 의 deploy 잡(self-hosted Runner, 태그 saffir-prod)이 실행한다.
# 수동 실행도 가능:  IMAGE_TAG=<short-sha> ./ci/deploy.sh
#
# 동작: 배포 디렉토리 최신화 → 레지스트리 이미지 pull → compose up -d → 헬스체크 → 실패 시 로그 출력
#
set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/home/ec2-user/saffir_web}"
COMPOSE_FILE="docker-compose.prod.yml"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
HEALTH_DOMAIN="${HEALTH_DOMAIN:-saffir.co.kr}"
# pull 전 확보해야 할 최소 여유 공간(MB). 서버 루트 볼륨이 8GB 로 빠듯하다.
MIN_FREE_MB="${MIN_FREE_MB:-1200}"

REGISTRY="${REGISTRY:-${CI_REGISTRY_IMAGE:-registry.gitlab.com/saffir_agency/saffir_web}}"
IMAGE_TAG="${IMAGE_TAG:-${CI_COMMIT_SHORT_SHA:-latest}}"
export REGISTRY IMAGE_TAG

log()  { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

compose() { docker compose -f "$COMPOSE_FILE" "$@"; }

# ── 0. 배포 디렉토리 ─────────────────────────────────────────────
[ -d "$DEPLOY_DIR" ] || fail "배포 디렉토리가 없습니다: $DEPLOY_DIR"
cd "$DEPLOY_DIR"

# compose 프로젝트명은 디렉토리명에서 나온다. 여기가 아니면 postgres_data 볼륨이
# 새로 만들어져 DB 가 빈 상태로 뜬다 — 반드시 확인한다.
[ "$(basename "$PWD")" = "saffir_web" ] || fail "배포 디렉토리 이름이 saffir_web 이 아닙니다: $PWD"

log "배포 시작  tag=$IMAGE_TAG  dir=$DEPLOY_DIR"

# ── 1. 안전장치: 서버에 커밋 안 된 수정이 있으면 중단 ─────────────
# 서버에서 직접 고친 내용을 git pull 로 날려버리지 않도록.
DIRTY="$(git status --porcelain)"
if [ -n "$DIRTY" ]; then
  printf '%s\n' "$DIRTY"
  fail "서버 작업트리에 커밋되지 않은 변경이 있습니다. 위 내용을 정리한 뒤 다시 배포하세요."
fi

# ── 2. 배포 디렉토리 최신화 ──────────────────────────────────────
# compose 파일 / nginx.conf / db 초기화 스크립트가 여기서 읽히므로 코드도 최신이어야 한다.
log "git 최신화 ($DEPLOY_BRANCH)"
git fetch --prune origin
git checkout "$DEPLOY_BRANCH"
git merge --ff-only "origin/$DEPLOY_BRANCH"
git --no-pager log --oneline -1

[ -f "$COMPOSE_FILE" ] || fail "$COMPOSE_FILE 이 없습니다."

# ── 3. 롤백용으로 현재 떠 있는 태그 기록 ─────────────────────────
PREV_IMAGE="$(docker inspect --format '{{.Config.Image}}' saffir_web-web-1 2>/dev/null || true)"
case "$PREV_IMAGE" in
  *:*) PREV_TAG="${PREV_IMAGE##*:}" ;;   # registry.../web:abc1234 → abc1234
  *)   PREV_TAG="" ;;                    # 레지스트리 전환 전(로컬 빌드 이미지)이면 롤백 태그 없음
esac
if [ -n "$PREV_TAG" ]; then
  log "현재 실행 중인 태그: $PREV_TAG"
fi

# ── 4. 디스크 여유 확보 ──────────────────────────────────────────
FREE_MB="$(df -Pm / | awk 'NR==2 {print $4}')"
log "디스크 여유: ${FREE_MB}MB"
if [ "$FREE_MB" -lt "$MIN_FREE_MB" ]; then
  log "여유 공간 부족 — 사용하지 않는 이미지를 먼저 정리합니다"
  docker image prune -af --filter "until=24h" || true
  FREE_MB="$(df -Pm / | awk 'NR==2 {print $4}')"
  log "정리 후 여유: ${FREE_MB}MB"
  if [ "$FREE_MB" -lt 600 ]; then
    fail "디스크 여유가 여전히 부족합니다(${FREE_MB}MB). 수동 확인이 필요합니다."
  fi
fi

# ── 5. 레지스트리 로그인 + 이미지 pull ───────────────────────────
if [ -n "${CI_REGISTRY_PASSWORD:-}" ]; then
  log "레지스트리 로그인: ${CI_REGISTRY:-registry.gitlab.com}"
  echo "$CI_REGISTRY_PASSWORD" \
    | docker login -u "${CI_REGISTRY_USER:-gitlab-ci-token}" --password-stdin "${CI_REGISTRY:-registry.gitlab.com}"
fi

log "이미지 pull ($REGISTRY/*:$IMAGE_TAG)"
compose pull

# ── 6. 기동 ──────────────────────────────────────────────────────
log "컨테이너 기동"
compose up -d --remove-orphans

# ── 7. 헬스체크 ──────────────────────────────────────────────────
# server 컨테이너가 healthy 가 될 때까지 대기 (compose healthcheck 결과를 그대로 사용)
log "헬스체크"
for i in $(seq 1 30); do
  STATE="$(docker inspect --format '{{.State.Health.Status}}' saffir_web-server-1 2>/dev/null || echo unknown)"
  [ "$STATE" = "healthy" ] && break
  sleep 5
done
[ "${STATE:-}" = "healthy" ] || {
  compose logs --tail=80 server
  fail "server 컨테이너가 healthy 상태에 도달하지 못했습니다 (state=${STATE:-unknown})"
}

# nginx → web 경로까지 실제로 응답하는지 확인. --resolve 로 로컬 nginx 에 직접 붙되
# SNI/인증서는 실제 도메인으로 검증한다.
#
# frontend 는 depends_on(server: healthy) 이라 server 가 healthy 가 된 "직후"에야 기동한다.
# 따라서 여기서 곧바로 한 번만 찔러보면 아직 443 을 listen 하기 전이라 000 이 나온다. 재시도한다.
HTTP_CODE=000
for i in $(seq 1 20); do
  HTTP_CODE="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 \
    --resolve "${HEALTH_DOMAIN}:443:127.0.0.1" "https://${HEALTH_DOMAIN}/" 2>/dev/null)" || HTTP_CODE=000
  if [ "$HTTP_CODE" = "200" ]; then
    log "사이트 응답 확인 (${i}회차, HTTP $HTTP_CODE)"
    break
  fi
  sleep 3
done
if [ "$HTTP_CODE" != "200" ]; then
  compose logs --tail=60 frontend
  compose logs --tail=60 web
  fail "사이트 헬스체크 실패 (HTTP $HTTP_CODE). 롤백: IMAGE_TAG=${PREV_TAG:-<이전-sha>} docker compose -f $COMPOSE_FILE up -d"
fi

# ── 8. 정리 ──────────────────────────────────────────────────────
# 배포할 때마다 새 태그 이미지가 쌓이면 8GB 볼륨이 금방 찬다(1회 약 640MB).
# -a 로 태그가 붙은 미사용 이미지까지 정리하되, 48시간 이내 것은 남겨 즉시 롤백을 보장한다.
# 더 오래된 버전으로 되돌려야 하면 레지스트리에서 다시 pull 하면 된다.
# 실행 중인 컨테이너가 쓰는 이미지는 docker 가 보호하므로 서비스에는 영향이 없다.
log "이전 이미지 정리 (48시간 이전 미사용분)"
docker image prune -af --filter "until=48h" || true
df -h / | tail -1

log "배포 완료  tag=$IMAGE_TAG  https://${HEALTH_DOMAIN}/ → $HTTP_CODE"
if [ -n "$PREV_TAG" ]; then
  echo "  롤백이 필요하면: IMAGE_TAG=$PREV_TAG docker compose -f $COMPOSE_FILE up -d"
fi
exit 0
