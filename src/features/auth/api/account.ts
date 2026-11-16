"use server";

import { dataSource } from "@/server/api";
import {
  backendFindEmail,
  backendForgotPassword,
  backendRegister,
  backendResetPassword,
} from "@/server/auth";
import { getClientKey, isRateLimited } from "@/server/inquiry";
import { routes } from "@/shared/config";

/**
 * 회원가입·아이디 찾기·비밀번호 찾기·재설정. 백엔드 모드(API_URL)에서만 실제로 처리하고,
 * 데모 모드에서는 준비 중 안내를 돌려준다 (화면 미리보기용 배포).
 */
type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const notReady = (what: string): Result<never> => ({
  ok: false,
  error: `${what}는 회원 서버 연결 후 열립니다. 지금은 카카오·네이버 간편 로그인이나 문의하기를 이용해 주세요.`,
});

const tooMany = { ok: false, error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strong = (v: string) => v.length >= 8 && /[a-zA-Z]/.test(v) && /\d/.test(v);
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function signupAction(input: {
  customerType: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  password: string;
  agreed: boolean;
  marketing: boolean;
  inviteToken?: string;
}): Promise<Result<{ next: string }>> {
  if (dataSource() !== "api") return notReady("이메일 가입");
  if (isRateLimited(`signup:${await getClientKey()}`, { max: 5 })) return tooMany;
  const email = str(input.email, 200).toLowerCase();
  const password = typeof input.password === "string" ? input.password : "";
  const customerType = input.customerType === "기업" ? "기업" : "병원";
  if (!input.agreed) return { ok: false, error: "필수 약관에 동의해 주세요." };
  if (!str(input.name, 100) || !EMAIL.test(email) || !strong(password)) {
    return { ok: false, error: "입력한 내용을 확인해 주세요." };
  }
  const result = await backendRegister({
    customerType,
    name: str(input.name, 100),
    organization: str(input.organization, 200),
    email,
    phone: str(input.phone, 30),
    password: password.slice(0, 72),
    marketing: input.marketing === true,
    ...(typeof input.inviteToken === "string" &&
      /^[a-f0-9]{64}$/.test(input.inviteToken) && { inviteToken: input.inviteToken }),
  });
  if (!result.ok) return result;
  return { ok: true, next: result.session.staff ? routes.admin.home : routes.portal.home };
}

export async function findEmailAction(input: {
  name: string;
  phone: string;
}): Promise<Result<{ found: boolean; email: string | null; provider: string | null }>> {
  if (dataSource() !== "api") return notReady("아이디 찾기");
  if (isRateLimited(`find-email:${await getClientKey()}`, { max: 10 })) return tooMany;
  return backendFindEmail(str(input.name, 100), str(input.phone, 30));
}

export async function forgotPasswordAction(email: string): Promise<Result> {
  if (dataSource() !== "api") return notReady("비밀번호 찾기");
  if (isRateLimited(`forgot:${await getClientKey()}`, { max: 5 })) return tooMany;
  const value = str(email, 200).toLowerCase();
  if (!EMAIL.test(value)) return { ok: false, error: "이메일 형식이 올바르지 않습니다." };
  return backendForgotPassword(value);
}

export async function resetPasswordAction(token: string, password: string): Promise<Result> {
  if (dataSource() !== "api") return notReady("비밀번호 재설정");
  if (isRateLimited(`reset:${await getClientKey()}`, { max: 10 })) return tooMany;
  if (!strong(password)) return { ok: false, error: "8자 이상, 영문과 숫자를 함께 넣어 주세요." };
  return backendResetPassword(str(token, 64), password.slice(0, 72));
}
