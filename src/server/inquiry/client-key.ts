import "server-only";
import { headers } from "next/headers";

/** 반복 제출 제한에 쓰는 요청자 키 (IP) */
export async function getClientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
