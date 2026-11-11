import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "saffir_session";

/**
 * 포털(/dashboard) 1차 확인: 세션 쿠키가 없으면 로그인으로 보냅니다.
 * 실제 권한 검증은 server/auth/session.ts 에서 합니다 (proxy는 낙관적 확인만).
 * 개발 중 포털 화면을 보려면 .env.local 에 PORTAL_AUTH_BYPASS=1
 */
export function proxy(request: NextRequest) {
  if (process.env.PORTAL_AUTH_BYPASS === "1") return NextResponse.next();
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  const url = new URL("/login", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
