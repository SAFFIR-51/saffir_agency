import "server-only";

/**
 * 간편 로그인 (카카오·네이버) OAuth 2.0 인가 코드 방식.
 * 키는 환경 변수로 받는다. 비어 있으면 그 로그인은 꺼진 것으로 본다.
 * - 카카오: KAKAO_REST_API_KEY (+ 보안 설정을 켰다면 KAKAO_CLIENT_SECRET)
 * - 네이버: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET
 * 각 개발자 콘솔에 Redirect URI로 `{사이트 주소}/auth/kakao/callback`, `/auth/naver/callback`을 등록한다.
 */
export type OAuthProvider = "kakao" | "naver";
export type OAuthProfile = { provider: OAuthProvider; id: string; email?: string; name?: string };

export function isOAuthProvider(value: string): value is OAuthProvider {
  return value === "kakao" || value === "naver";
}

function keys(provider: OAuthProvider) {
  if (provider === "kakao") {
    const id = process.env.KAKAO_REST_API_KEY;
    return id ? { id, secret: process.env.KAKAO_CLIENT_SECRET } : null;
  }
  const id = process.env.NAVER_CLIENT_ID;
  const secret = process.env.NAVER_CLIENT_SECRET;
  return id && secret ? { id, secret } : null;
}

export function oauthEnabled(provider: OAuthProvider) {
  return keys(provider) !== null;
}

/** 로그인 창 주소 */
export function authorizeUrl(provider: OAuthProvider, redirectUri: string, state: string) {
  const k = keys(provider);
  if (!k) return null;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: k.id,
    redirect_uri: redirectUri,
    state,
  });
  return provider === "kakao"
    ? `https://kauth.kakao.com/oauth/authorize?${params}`
    : `https://nid.naver.com/oauth2.0/authorize?${params}`;
}

/** 인가 코드 → 토큰 → 회원 정보 */
export async function fetchProfile(
  provider: OAuthProvider,
  code: string,
  state: string,
  redirectUri: string,
): Promise<OAuthProfile | null> {
  const k = keys(provider);
  if (!k) return null;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: k.id,
    redirect_uri: redirectUri,
    code,
    ...(provider === "naver" ? { state } : {}),
    ...(k.secret ? { client_secret: k.secret } : {}),
  });
  const tokenRes = await fetch(
    provider === "kakao"
      ? "https://kauth.kakao.com/oauth/token"
      : "https://nid.naver.com/oauth2.0/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body,
      cache: "no-store",
    },
  );
  if (!tokenRes.ok) return null;
  const token = (await tokenRes.json()) as { access_token?: string };
  if (!token.access_token) return null;

  const meRes = await fetch(
    provider === "kakao"
      ? "https://kapi.kakao.com/v2/user/me"
      : "https://openapi.naver.com/v1/nid/me",
    { headers: { Authorization: `Bearer ${token.access_token}` }, cache: "no-store" },
  );
  if (!meRes.ok) return null;

  if (provider === "kakao") {
    const me = (await meRes.json()) as {
      id?: number;
      kakao_account?: { email?: string; profile?: { nickname?: string } };
    };
    if (!me.id) return null;
    return {
      provider,
      id: String(me.id),
      email: me.kakao_account?.email,
      name: me.kakao_account?.profile?.nickname,
    };
  }
  const me = (await meRes.json()) as {
    response?: { id?: string; email?: string; name?: string; nickname?: string };
  };
  if (!me.response?.id) return null;
  return {
    provider,
    id: me.response.id,
    email: me.response.email,
    name: me.response.name ?? me.response.nickname,
  };
}
