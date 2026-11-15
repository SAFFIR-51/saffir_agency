"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors } from "@/shared/lib";
import { fieldA11y } from "@/shared/ui";
import { authInput, authLabel, authSubmit, oauthErrors } from "./auth-ui";
import { login } from "../api/login";
import { loginSchema, type LoginInput } from "../model/schema";

export type DemoAccountOption = { email: string; label: string };

/** 로그인 폼. demo가 있으면 데모 계정을 눌러 바로 채울 수 있다 */
export function LoginForm({
  demo,
  children,
}: {
  demo?: { accounts: DemoAccountOption[]; password: string };
  /** 폼과 데모 계정 사이에 둘 것 (간편 로그인, 링크). 데모 계정은 나중에 지울 것이라 맨 아래에 둔다 */
  children?: React.ReactNode;
}) {
  const params = useSearchParams();
  const next = params.get("next") ?? undefined;
  const oauthError = oauthErrors[params.get("error") ?? ""];
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", next },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    // 성공하면 서버에서 바로 이동(redirect)하므로 실패만 돌아온다
    const result = await login(values);
    if (result && !result.ok) {
      setServerError(result.error);
      applyFieldErrors(setError, result.fieldErrors);
    }
  });

  return (
    <div>
      {oauthError ? (
        <p role="alert" className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {oauthError}
        </p>
      ) : null}
      {next ? (
        <p
          role="status"
          className="mb-5 rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700"
        >
          로그인하면 보던 화면으로 돌아갑니다.
        </p>
      ) : null}
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className={authLabel}>
            이메일
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className={authInput}
            {...fieldA11y("email", errors.email?.message)}
            {...register("email")}
          />
          {errors.email?.message && (
            <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className={authLabel}>
            비밀번호
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className={authInput}
            {...fieldA11y("password", errors.password?.message)}
            {...register("password")}
          />
          {errors.password?.message && (
            <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {serverError ? (
          <p role="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        ) : null}
        <button type="submit" disabled={isSubmitting} className={`mt-2 ${authSubmit}`}>
          {isSubmitting ? "로그인 중…" : "로그인"}
        </button>
      </form>

      {children}

      {demo ? (
        <details className="group mt-12 rounded-lg border border-dashed border-neutral-300 px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-semibold [&::-webkit-details-marker]:hidden">
            데모 계정으로 둘러보기
            <span className="ml-1 text-neutral-400 group-open:hidden">+</span>
          </summary>
          <p className="mt-2 text-sm text-neutral-600">
            누르면 입력칸이 채워집니다. 비밀번호는 모두 <code>{demo.password}</code>
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {demo.accounts.map((account) => (
              <li key={account.email}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-left text-sm hover:bg-neutral-50"
                  onClick={() => {
                    setValue("email", account.email);
                    setValue("password", demo.password);
                  }}
                >
                  <span className="block font-medium">{account.label}</span>
                  <span className="block text-neutral-500">{account.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
