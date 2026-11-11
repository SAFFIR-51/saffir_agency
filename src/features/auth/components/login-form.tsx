"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors } from "@/shared/lib";
import { Button, FormField, Input, fieldA11y } from "@/shared/ui";
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
        <p role="status" className="rounded-md bg-foreground/5 p-3 text-sm">
          로그인하면 보던 화면으로 돌아갑니다.
        </p>
      ) : null}
      <form onSubmit={onSubmit} noValidate className="max-w-sm space-y-4">
        <FormField id="email" label="이메일" error={errors.email?.message}>
          <Input
            type="email"
            autoComplete="email"
            {...fieldA11y("email", errors.email?.message)}
            {...register("email")}
          />
        </FormField>
        <FormField id="password" label="비밀번호" error={errors.password?.message}>
          <Input
            type="password"
            autoComplete="current-password"
            {...fieldA11y("password", errors.password?.message)}
            {...register("password")}
          />
        </FormField>
        {serverError ? (
          <p role="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중…" : "로그인"}
        </Button>
      </form>

      {demo ? (
        <div className="rounded-md border border-dashed border-foreground/30 p-4">
          <p className="text-sm font-semibold">데모 계정</p>
          <p className="mt-1 text-sm text-foreground/60">
            누르면 입력칸이 채워집니다. 비밀번호는 모두 <code>{demo.password}</code>
          </p>
          <ul className="mt-3 space-y-2">
            {demo.accounts.map((account) => (
              <li key={account.email}>
                <button
                  type="button"
                  className="w-full rounded-md border border-foreground/15 px-3 py-2 text-left text-sm hover:bg-foreground/5"
                  onClick={() => {
                    setValue("email", account.email);
                    setValue("password", demo.password);
                  }}
                >
                  <span className="block font-medium">{account.label}</span>
                  <span className="block text-foreground/60">{account.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
