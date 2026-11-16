import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { isProduction } from "../env";
import { apiFetch, visitorIp } from "../api";
import { demoAccounts } from "./demo-accounts";
import type { Session } from "./session";

/**
 * 백엔드 모드(API_URL 있음)의 로그인. 백엔드(NestJS)가 발급한 JWT 쿠키(access_token)를 그대로 쓴다.
 * 개발 중에는 /api가 같은 주소로 프록시되고, 운영은 nginx가 같은 도메인으로 묶어 쿠키가 공유된다.
 */
export const BACKEND_COOKIE = "access_token";
const MAX_AGE = 7 * 86_400;

type MeResponse = {
  sub: number;
  name: string;
  email: string;
  role: string;
  /** /auth/me에만 있다 (로그인·가입 응답에는 없음) */
  organization?: string | null;
  clientMember?: boolean;
  geoPlan?: string | null;
  businessNumber?: string | null;
  taxEmail?: string | null;
  colleagues?: { name: string; email: string; role: string }[];
};

function toSession(me: MeResponse): Session {
  const staff = me.role === "admin" || me.role === "staff";
  // 데모 계정(db/seeds/demo.sql)은 화면 데모와 같은 회원 종류·회사로 보여 준다
  const demo = demoAccounts.find((a) => a.email === me.email);
  if (demo) {
    return {
      id: `api:${me.sub}`,
      email: me.email,
      name: me.name,
      organization: demo.organization,
      kinds: demo.kinds,
      label: demo.label,
      staff,
    };
  }
  return {
    id: `api:${me.sub}`,
    email: me.email,
    name: me.name,
    organization: staff ? "사피어 테크놀로지" : (me.organization ?? ""),
    // 고객사에 연결된 계정이면 프로젝트 메뉴까지, 아니면 일반 회원(무료 진단 등)
    kinds: staff
      ? []
      : [
          "member",
          ...(me.geoPlan === "pro" ? (["subscriber"] as const) : []),
          ...(me.clientMember ? (["project"] as const) : []),
        ],
    label: staff ? "사피어 내부" : me.clientMember ? "프로젝트 고객" : "일반 회원",
    staff,
  };
}

/** 내 정보 (/auth/me). 한 요청 안에서는 한 번만 부른다 */
export const getBackendProfile = cache(async (): Promise<MeResponse | null> => {
  if (!(await cookies()).get(BACKEND_COOKIE)) return null;
  return apiFetch<MeResponse>("/auth/me").catch(() => null);
});

export async function getBackendSession(): Promise<Session | null> {
  const me = await getBackendProfile();
  return me ? toSession(me) : null;
}

/** 포털 계정: 내 정보·회사 정보 수정. 실패하면 백엔드 메시지 */
export async function backendUpdateProfile(body: {
  organization?: string;
  businessNumber?: string;
  taxEmail?: string;
  phone?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await apiFetch("/auth/me", { method: "PATCH", body: JSON.stringify(body) });
    return { ok: true };
  } catch (e) {
    const raw = e instanceof Error ? e.message : "";
    const parsed = (() => {
      try {
        return JSON.parse(raw) as { message?: string | string[] };
      } catch {
        return null;
      }
    })();
    const message = Array.isArray(parsed?.message) ? parsed.message.join(" ") : parsed?.message;
    return { ok: false, error: message || "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
}

/** 이메일·비밀번호 로그인 → 백엔드 쿠키를 이쪽 응답에도 심는다 */
export async function backendLogin(
  email: string,
  password: string,
): Promise<{ ok: true; session: Session } | { ok: false; error: string }> {
  const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": await visitorIp() },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  }).catch(() => null);
  if (!res)
    return { ok: false, error: "로그인 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  if (res.status === 429)
    return { ok: false, error: "여러 번 틀렸습니다. 잠시 후 다시 시도해 주세요." };
  if (!res.ok) return { ok: false, error: "이메일 또는 비밀번호가 맞지 않습니다." };

  if (!(await keepBackendCookie(res)))
    return { ok: false, error: "로그인 응답이 올바르지 않습니다." };
  return { ok: true, session: toSession((await res.json()) as MeResponse) };
}

/** 백엔드 응답의 access_token 쿠키를 화면 도메인에도 심는다. 없으면 false */
async function keepBackendCookie(res: Response) {
  const token = res.headers
    .getSetCookie()
    .map((c) => c.match(new RegExp(`^${BACKEND_COOKIE}=([^;]+)`))?.[1])
    .find(Boolean);
  if (!token) return false;
  (await cookies()).set(BACKEND_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

/** 백엔드 /api/auth/* 호출. 실패하면 백엔드가 준 한국어 메시지를 그대로 쓴다 */
async function authPost(path: string, body: unknown) {
  const res = await fetch(`${process.env.API_URL}/api/auth/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": await visitorIp() },
    body: JSON.stringify(body),
    cache: "no-store",
  }).catch(() => null);
  if (!res) return { res: null, error: "서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  if (res.status === 429) return { res, error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." };
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(data?.message) ? null : data?.message;
    return { res, error: message || "입력한 내용을 확인해 주세요." };
  }
  return { res, error: null };
}

export type RegisterInput = {
  customerType: "병원" | "기업";
  name: string;
  organization: string;
  email: string;
  phone: string;
  password: string;
  marketing: boolean;
  /** 초대 링크로 가입하면 그 고객사에 바로 연결 */
  inviteToken?: string;
};

/** 이메일 회원가입 → 바로 로그인 상태 */
export async function backendRegister(
  input: RegisterInput,
): Promise<{ ok: true; session: Session } | { ok: false; error: string }> {
  const { res, error } = await authPost("register", { ...input, agreed: true });
  if (error || !res) return { ok: false, error: error ?? "가입하지 못했습니다." };
  const me = (await res.json()) as MeResponse;
  if (!(await keepBackendCookie(res)))
    return { ok: false, error: "가입은 됐지만 로그인하지 못했습니다. 로그인해 주세요." };
  return { ok: true, session: toSession(me) };
}

/** 아이디(가입 이메일) 찾기. 이메일은 가려서 온다 */
export async function backendFindEmail(name: string, phone: string) {
  const { res, error } = await authPost("find-email", { name, phone });
  if (error || !res) return { ok: false as const, error: error ?? "찾지 못했습니다." };
  const data = (await res.json()) as {
    found: boolean;
    email: string | null;
    provider: string | null;
  };
  return { ok: true as const, ...data };
}

/** 비밀번호 재설정 메일. 계정이 있든 없든 같은 응답 */
export async function backendForgotPassword(email: string) {
  const { error } = await authPost("forgot-password", { email });
  return error ? { ok: false as const, error } : { ok: true as const };
}

/** 메일 링크의 1회용 토큰으로 새 비밀번호 */
export async function backendResetPassword(token: string, password: string) {
  const { error } = await authPost("reset-password", { token, password });
  return error ? { ok: false as const, error } : { ok: true as const };
}
