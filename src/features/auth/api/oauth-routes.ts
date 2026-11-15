import "server-only";
import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { authorizeUrl, fetchProfile, isOAuthProvider, startSession } from "@/server/auth";
import { routes, toInternalRoute } from "@/shared/config";

/**
 * 간편 로그인 경로 (app/(auth)/auth/[provider]/... 에서 그대로 내보낸다)
 * 1) /auth/kakao?next=/dashboard → state를 쿠키에 담고 카카오 로그인 창으로
 * 2) /auth/kakao/callback?code&state → state 확인, 회원 정보 받아 세션 시작, next로 이동
 * 키가 없거나 실패하면 /login?error=... 로 돌려보낸다
 */
const STATE_COOKIE = "saffir_oauth";

type Ctx = { params: Promise<{ provider: string }> };

function origin(request: NextRequest) {
  return process.env.AUTH_ORIGIN ?? request.nextUrl.origin;
}

function callbackUri(request: NextRequest, provider: string) {
  return `${origin(request)}/auth/${provider}/callback`;
}

function backToLogin(request: NextRequest, error: string) {
  const url = new URL(routes.auth.login, origin(request));
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function oauthStart(request: NextRequest, { params }: Ctx) {
  const { provider } = await params;
  if (!isOAuthProvider(provider)) return backToLogin(request, "oauth_unknown");

  const state = randomBytes(16).toString("base64url");
  const next = toInternalRoute(
    request.nextUrl.searchParams.get("next") ?? undefined,
    routes.portal.home,
  );
  const target = authorizeUrl(provider, callbackUri(request, provider), state);
  if (!target) return backToLogin(request, "oauth_unavailable");

  const response = NextResponse.redirect(target);
  response.cookies.set(STATE_COOKIE, JSON.stringify({ provider, state, next }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return response;
}

export async function oauthCallback(request: NextRequest, { params }: Ctx) {
  const { provider } = await params;
  if (!isOAuthProvider(provider)) return backToLogin(request, "oauth_unknown");

  const search = request.nextUrl.searchParams;
  // 사용자가 동의 화면에서 취소한 경우
  if (search.get("error")) return backToLogin(request, "oauth_cancelled");

  let saved: { provider?: string; state?: string; next?: string } = {};
  try {
    saved = JSON.parse(request.cookies.get(STATE_COOKIE)?.value ?? "{}");
  } catch {
    saved = {};
  }
  const code = search.get("code");
  const state = search.get("state");
  if (!code || !state || saved.provider !== provider || saved.state !== state) {
    return backToLogin(request, "oauth_state");
  }

  const profile = await fetchProfile(provider, code, state, callbackUri(request, provider));
  if (!profile) return backToLogin(request, "oauth_failed");

  await startSession(`${provider}:${profile.id}`, { name: profile.name, email: profile.email });
  const response = NextResponse.redirect(
    new URL(toInternalRoute(saved.next, routes.portal.home), origin(request)),
  );
  response.cookies.delete(STATE_COOKIE);
  return response;
}
