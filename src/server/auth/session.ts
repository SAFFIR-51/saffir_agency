import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { dataSource } from "../api";
import { isProduction } from "../env";
import { BACKEND_COOKIE, getBackendSession } from "./backend-session";
import { DEMO_PASSWORD, demoAccounts, findDemoAccount, type DemoAccount } from "./demo-accounts";

const SESSION_COOKIE = "saffir_session";
const SESSION_DAYS = 7;

export type Session = DemoAccount;

/** 쿠키에 담는 내용. 간편 로그인 회원은 회원 DB가 생기기 전까지 이름·이메일을 쿠키에 함께 담는다 */
type Payload = { sub: string; exp: number; name?: string; email?: string };

const providerLabel: Record<string, string> = { kakao: "카카오", naver: "네이버" };

/**
 * 데모 로그인 허용: 개발 환경이거나 DEMO_LOGIN=1 (토스 심사 기간 등).
 * 백엔드 모드에서도 같은 데모 계정을 쓴다 (db/seeds/demo.sql로 넣은 계정, 비밀번호 같음).
 */
export const demoLoginEnabled = !isProduction || process.env.DEMO_LOGIN === "1";

function secret() {
  const value = process.env.SESSION_SECRET;
  if (value) return value;
  if (isProduction) throw new Error("SESSION_SECRET이 없습니다.");
  return "dev-only-session-secret";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** 쿠키 값: base64url(JSON) + "." + 서명. 서명이 맞고 만료 전이어야 세션으로 인정한다 */
function encode(accountId: string, extra: { name?: string; email?: string } = {}) {
  const data: Payload = { sub: accountId, exp: Date.now() + SESSION_DAYS * 86_400_000, ...extra };
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): Payload | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as Partial<Payload>;
    if (!data.sub || !data.exp || data.exp < Date.now()) return null;
    return data as Payload;
  } catch {
    return null;
  }
}

/** 로그인한 회원. 없으면 null. 개발 중 PORTAL_AUTH_BYPASS=1이면 로그인 전에도 모든 서비스 계정으로 본다 */
export async function getSession(): Promise<Session | null> {
  // 백엔드 모드: 백엔드 JWT 쿠키로 확인 (데모 계정·자체 세션은 쓰지 않는다)
  if (dataSource() === "api") {
    await connection();
    return getBackendSession();
  }
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  // 만료 확인(Date.now)은 요청 시점에만: 쿠키를 미리 읽는 프리패치에서는 여기서 멈춘다
  await connection();
  const data = token ? decode(token) : null;
  if (!data) {
    // 로그인 쿠키가 있으면 그 계정을 우선한다 (어드민 계정 확인용)
    if (!isProduction && process.env.PORTAL_AUTH_BYPASS === "1") return findDemoAccount("all");
    return null;
  }
  // 간편 로그인 회원 (sub = "kakao:123" / "naver:abc"): 일반 회원으로 본다
  const [provider] = data.sub.split(":");
  if (provider && providerLabel[provider]) {
    return {
      id: data.sub,
      email: data.email ?? "",
      name: data.name ?? `${providerLabel[provider]} 회원`,
      organization: "",
      kinds: ["member"],
      label: `${providerLabel[provider]} 로그인 회원`,
    };
  }
  return findDemoAccount(data.sub);
}

export async function startSession(
  accountId: string,
  extra: { name?: string; email?: string } = {},
) {
  (await cookies()).set(SESSION_COOKIE, encode(accountId, extra), {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
  (await cookies()).delete(BACKEND_COOKIE);
}

/** 데모 계정 확인. 이메일·비밀번호가 맞으면 계정, 아니면 null */
export function verifyDemoLogin(email: string, password: string): DemoAccount | null {
  if (!demoLoginEnabled) return null;
  const account = demoAccounts.find((a) => a.email === email.trim().toLowerCase());
  const ok =
    password.length === DEMO_PASSWORD.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(DEMO_PASSWORD));
  return account && ok ? account : null;
}
