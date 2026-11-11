import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isProduction } from "../env";
import { DEMO_PASSWORD, demoAccounts, findDemoAccount, type DemoAccount } from "./demo-accounts";

const SESSION_COOKIE = "saffir_session";
const SESSION_DAYS = 7;

export type Session = DemoAccount;

/** 데모 로그인 허용: 개발 환경이거나 DEMO_LOGIN=1 (토스 심사 기간 등) */
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
function encode(accountId: string) {
  const payload = Buffer.from(
    JSON.stringify({ sub: accountId, exp: Date.now() + SESSION_DAYS * 86_400_000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      sub?: string;
      exp?: number;
    };
    if (!data.sub || !data.exp || data.exp < Date.now()) return null;
    return data.sub;
  } catch {
    return null;
  }
}

/** 로그인한 회원. 없으면 null. 개발 중 PORTAL_AUTH_BYPASS=1이면 모든 서비스 계정으로 본다 */
export async function getSession(): Promise<Session | null> {
  if (!isProduction && process.env.PORTAL_AUTH_BYPASS === "1") return findDemoAccount("all");
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const accountId = token ? decode(token) : null;
  return accountId ? findDemoAccount(accountId) : null;
}

export async function startSession(accountId: string) {
  (await cookies()).set(SESSION_COOKIE, encode(accountId), {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
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
