import { Suspense } from "react";
import { FindAccount } from "./find-account";
import { ResetPasswordForm } from "./reset-password-form";

/** 아이디·비밀번호 찾기 */
export function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">
        아이디 · 비밀번호 찾기
      </h1>
      <p className="mt-2 text-[0.9375rem] text-neutral-600">가입한 정보로 계정을 확인합니다.</p>
      <div className="mt-8">
        <FindAccount />
      </div>
    </div>
  );
}

/** 메일 링크로 들어와 새 비밀번호 정하기 */
export function ResetPasswordPage() {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">
        새 비밀번호 정하기
      </h1>
      <p className="mt-2 text-[0.9375rem] text-neutral-600">
        앞으로 로그인할 때 쓸 비밀번호를 정해 주세요.
      </p>
      <div className="mt-8">
        {/* ?token= 을 읽으므로 Suspense 안에서 그린다 */}
        <Suspense fallback={<div aria-hidden="true" className="h-56" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
