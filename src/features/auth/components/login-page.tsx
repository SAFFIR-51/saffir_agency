import { memberTypes } from "@/content/membership";
import { routes } from "@/shared/config";
import Link from "next/link";
import { Suspense } from "react";
import { DEMO_PASSWORD, demoAccounts, demoLoginEnabled } from "@/server/auth";
import { WireBox } from "@/shared/ui";
import { LoginForm } from "./login-form";

/**
 * 로그인 (NHN Cloud 로그인 화면 구성): 가운데 440px 칸에 큰 제목 · 입력칸 두 개 · 파란 버튼 ·
 * 회원 가입 | 비밀번호 찾기 · 회색 안내. 데모 계정은 그 아래 회색 상자.
 */
export function LoginPage() {
  return (
    <div className="w-full max-w-[440px] pt-16 sm:pt-[120px]">
      <h1 className="text-center text-[32px] leading-[44px] font-bold text-[#111] sm:text-[40px] sm:leading-[56px]">
        로그인
      </h1>
      <div className="mt-10">
        {/* ?next= 를 읽으므로 Suspense 안에서 그린다 */}
        <Suspense fallback={<WireBox label="로그인" />}>
          <LoginForm
            demo={
              demoLoginEnabled
                ? {
                    accounts: demoAccounts.map((a) => ({ email: a.email, label: a.label })),
                    password: DEMO_PASSWORD,
                  }
                : undefined
            }
          />
        </Suspense>
      </div>
      <p className="mt-6 flex items-center justify-center gap-3 text-[15px] text-[#125de6]">
        <Link href={routes.auth.signup} className="hover:underline">
          회원 가입
        </Link>
        <span aria-hidden className="h-3 w-px bg-[#d5d9e0]" />
        <Link href={routes.auth.forgotPassword} className="hover:underline">
          비밀번호 찾기
        </Link>
      </p>
      <div className="mt-10 border-t border-[#e2e5eb] pt-8">
        <p className="text-center text-[15px] font-semibold text-[#111]">
          로그인하면 볼 수 있는 것
        </p>
        <ul className="mt-4 space-y-2">
          {memberTypes.map((m) => (
            <li
              key={m.type}
              className="rounded-lg bg-[#f8f9fa] px-4 py-3 text-[14px] leading-[20px]"
            >
              <b className="text-[#111]">{m.type}</b>
              <span className="text-[#51565f]"> · {m.access}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
