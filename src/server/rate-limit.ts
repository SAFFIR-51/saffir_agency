import "server-only";
import { headers } from "next/headers";

/**
 * 반복 요청 제한 (frontend-guide 10번). 키별로 windowMs 안에 max번까지.
 * 서버 메모리에 기록하므로 서버가 여러 대이거나 재시작되면 초기화된다.
 * TODO: 운영 배포 방식이 정해지면 공유 저장소(Redis 등) 기반으로 바꾼다.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/** 요청자 키 (IP) */
export async function getClientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
