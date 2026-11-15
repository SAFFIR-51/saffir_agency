import Link from "next/link";
import { Suspense } from "react";
import { DEMO_PASSWORD, demoAccounts, demoLoginEnabled } from "@/server/auth";
import { routes } from "@/shared/config";
import { OrDivider, SocialButtons } from "./auth-ui";
import { LoginForm } from "./login-form";

/** 로그인: 간편 로그인(네이버·카카오) + 이메일 로그인 */
export function LoginPage() {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">로그인</h1>
      <p className="mt-2 text-[0.9375rem] text-neutral-600">
        진단 기록, 프로젝트, 청구를 확인하세요.
      </p>

      <div className="mt-8" />

      {/* ?next= 를 읽으므로 Suspense 안에서 그린다 */}
      <Suspense fallback={<div aria-hidden="true" className="h-56" />}>
        <LoginForm
          demo={
            demoLoginEnabled
              ? {
                  accounts: demoAccounts.map((a) => ({ email: a.email, label: a.label })),
                  password: DEMO_PASSWORD,
                }
              : undefined
          }
        >
          <OrDivider>또는 간편 로그인</OrDivider>
          <SocialButtons mode="login" />

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-600">
            <Link href={routes.auth.forgotPassword} className="hover:text-black hover:underline">
              아이디 · 비밀번호 찾기
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-neutral-300" />
            <Link href={routes.auth.signup} className="font-semibold text-black hover:underline">
              무료 회원가입
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            계정 관련 문의는{" "}
            <Link
              href={routes.contact}
              className="font-semibold text-black underline underline-offset-4"
            >
              문의하기
            </Link>
            로 남겨 주세요.
          </p>
        </LoginForm>
      </Suspense>
    </div>
  );
}
