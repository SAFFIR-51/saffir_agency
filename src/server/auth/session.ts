import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "saffir_session";

/** 회원 유형 (기획서 "로그인과 고객 포털") */
export type MemberRole = "member" | "subscriber" | "client";

export type Session = {
  userId: string;
  email: string;
  role: MemberRole;
  /** 구독 중인 GEO 등급, 도입한 솔루션 등 메뉴 노출에 쓰는 값 */
  hasSolutions: boolean;
};

/** TODO: 실제 세션 검증으로 교체 (saffirgeo 로그인과 통합) */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return null;
}
