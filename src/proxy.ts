import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "saffir_session";

/** saffirgeo 흡수 (기획서 "saffirgeo 통합 방식"): 기존 도메인의 모든 주소를 /geo 아래 같은 경로로 */
const LEGACY_GEO_HOST = "saffirgeo.saffirdev.com";
const SITE_ORIGIN = "https://saffir.co.kr";

/**
 * 1) 기존 saffirgeo 도메인 요청 → saffir.co.kr/geo/<같은 경로> 로 301 이동
 *    (해당 도메인이 이 배포를 가리키도록 DNS를 연결해야 동작)
 * 2) 포털(/dashboard) 1차 확인: 세션 쿠키가 없으면 로그인으로 보낸다.
 *    실제 권한 검증은 server/auth/session.ts 에서 한다 (proxy는 낙관적 확인만).
 *    개발 중 포털 화면을 보려면 .env.local 에 PORTAL_AUTH_BYPASS=1
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (request.headers.get("host") === LEGACY_GEO_HOST) {
    const target = new URL(`/geo${pathname === "/" ? "" : pathname}${search}`, SITE_ORIGIN);
    return NextResponse.redirect(target, 301);
  }

  if (pathname.startsWith("/dashboard")) {
    if (process.env.PORTAL_AUTH_BYPASS === "1") return NextResponse.next();
    if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // 정적 파일과 이미지 최적화 요청은 건너뛴다
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
