import "server-only";

/**
 * 반복 제출 제한 (frontend-guide 10번). 같은 IP 기준, 10분에 5건까지.
 * 서버 메모리에 기록하므로 서버가 여러 대이거나 재시작되면 초기화된다.
 * TODO: 운영 배포 방식이 정해지면 공유 저장소(Redis 등) 기반으로 바꾼다.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
