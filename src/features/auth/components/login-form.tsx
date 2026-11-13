"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors } from "@/shared/lib";
import { Button, Input, fieldA11y } from "@/shared/ui";
import { login } from "../api/login";
import { loginSchema, type LoginInput } from "../model/schema";

export type DemoAccountOption = { email: string; label: string };

/** 로그인 폼. demo가 있으면 데모 계정을 눌러 바로 채울 수 있다 */
export function LoginForm({
  demo,
}: {
  demo?: { accounts: DemoAccountOption[]; password: string };
}) {
  const next = useSearchParams().get("next") ?? undefined;
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
    <div className="space-y-6">
      {next ? (
        <p role="status" className="rounded-lg bg-[#eef3ff] px-4 py-3 text-[14px] text-[#125de6]">
          로그인하면 보던 화면으로 돌아갑니다.
        </p>
      ) : null}
      <form onSubmit={onSubmit} noValidate className="space-y-3">
        <div>
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="이메일"
            className="h-[52px]"
            {...fieldA11y("email", errors.email?.message)}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p id="email-error" role="alert" className="mt-1.5 text-[13px] text-red-600">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            className="h-[52px]"
            {...fieldA11y("password", errors.password?.message)}
            {...register("password")}
          />
          {errors.password?.message ? (
            <p id="password-error" role="alert" className="mt-1.5 text-[13px] text-red-600">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        {serverError ? (
          <p role="alert" className="text-[14px] text-red-600">
            {serverError}
          </p>
        ) : null}
        <Button type="submit" disabled={isSubmitting} className="mt-5 w-full">
          {isSubmitting ? "로그인 중…" : "로그인"}
        </Button>
      </form>

      {demo ? (
        <div className="rounded-xl bg-[#f8f9fa] p-5">
          <p className="text-[15px] font-semibold text-[#111]">데모 계정</p>
          <p className="mt-1 text-[13px] text-[#9499a2]">
            누르면 입력칸이 채워집니다. 비밀번호는 모두 <code>{demo.password}</code>
          </p>
          <ul className="mt-3 space-y-2">
            {demo.accounts.map((account) => (
              <li key={account.email}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-[#e2e5eb] bg-white px-4 py-3 text-left text-[14px] hover:border-[#125de6]"
                  onClick={() => {
                    setValue("email", account.email);
                    setValue("password", demo.password);
                  }}
                >
                  <span className="block font-semibold text-[#111]">{account.label}</span>
                  <span className="block text-[#9499a2]">{account.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
