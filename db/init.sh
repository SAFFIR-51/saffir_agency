#!/bin/bash
# PostgreSQL 빈 볼륨(신규 기동)에서만 실행됩니다.
# db/dump.sql 이 있으면 덤프 복원, 없으면 스키마 신규 생성.
set -e

DUMP=/db/dump.sql
SCHEMA=/db/schema.sql

if [ -f "$DUMP" ]; then
  echo "[DB] dump.sql 감지 → 덤프 복원 중..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$DUMP"
  echo "[DB] 덤프 복원 완료"
else
  echo "[DB] dump.sql 없음 → 신규 스키마 생성 중..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$SCHEMA"
  echo "[DB] 스키마 생성 완료"
fi

# 마이그레이션은 모두 반복 실행해도 안전하게(IF NOT EXISTS) 작성한다. 날짜순으로 적용
for f in /db/migrations/*.sql; do
  [ -f "$f" ] || continue
  echo "[DB] 마이그레이션 적용: $(basename "$f")"
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$f"
done

# 데모 계정·예시 프로젝트 (로컬 개발용). docker-compose.dev.yml만 SEED_DEMO=1을 준다. 운영에는 넣지 않는다
if [ "$SEED_DEMO" = "1" ] && [ -f /db/seeds/demo.sql ]; then
  echo "[DB] 데모 계정·예시 데이터 넣는 중..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < /db/seeds/demo.sql
fi
