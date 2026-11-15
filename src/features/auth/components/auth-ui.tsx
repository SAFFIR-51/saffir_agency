"use client";

import { useSearchParams } from "next/navigation";
import { routes } from "@/shared/config";

/** 로그인·가입 공통 모양 */
export const authInput =
  "h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-[0.9375rem] text-black placeholder:text-neutral-400 focus-visible:border-black focus-visible:outline-none aria-invalid:border-red-600";
export const authLabel = "mb-2 block text-sm font-semibold";
export const authSubmit =
  "h-12 w-full rounded-lg bg-black text-[0.9375rem] font-semibold text-white hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 motion-safe:transition-colors";

/**
 * 카카오·네이버 간편 로그인 버튼 (각 회사 로그인 버튼 안내의 기본 색).
 * 누르면 /auth/{provider}로 가서 각 회사 로그인 창이 열리고, 끝나면 보던 화면(next)으로 돌아온다.
 * useSearchParams를 쓰므로 Suspense 안에서 그린다.
 */
export function SocialButtons({ mode }: { mode: "login" | "signup" }) {
  const next = useSearchParams().get("next") ?? undefined;
  const verb = mode === "login" ? "로그인" : "시작하기";
  const base =
    "relative flex h-12 w-full items-center justify-center rounded-lg text-[0.9375rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
  return (
    <div className="flex flex-col gap-2">
      {/* 바깥 로그인 창으로 넘어가므로 Link 대신 a (미리 불러오기 없음) */}
      <a
        href={routes.auth.oauth("kakao", next)}
        className={`${base} bg-[#fee500] text-black/85 hover:bg-[#f5dc00]`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute left-4 size-[18px]"
          fill="currentColor"
        >
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.85 1.86 5.35 4.66 6.77l-.95 3.48c-.08.3.26.54.52.37l4.13-2.74c.53.07 1.08.12 1.64.12 5.52 0 10-3.58 10-8S17.52 3 12 3Z" />
        </svg>
        카카오로 {verb}
      </a>
      <a
        href={routes.auth.oauth("naver", next)}
        className={`${base} bg-[#03c75a] text-white hover:bg-[#02b350]`}
      >
        <span aria-hidden="true" className="absolute left-4 text-lg leading-none font-black">
          N
        </span>
        네이버로 {verb}
      </a>
    </div>
  );
}

/** 간편 로그인 실패 안내 (/login?error=...) */
export const oauthErrors: Record<string, string> = {
  oauth_unavailable: "간편 로그인이 아직 설정되지 않았습니다. 이메일로 로그인해 주세요.",
  oauth_cancelled: "간편 로그인을 취소했습니다.",
  oauth_state: "로그인 시간이 지났습니다. 다시 시도해 주세요.",
  oauth_failed: "간편 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  oauth_unknown: "지원하지 않는 로그인 방식입니다.",
};

/** "또는 이메일로" 구분선 */
export function OrDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-7 flex items-center gap-3 text-xs text-neutral-500">
      <span className="h-px flex-1 bg-neutral-200" />
      {children}
      <span className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}
