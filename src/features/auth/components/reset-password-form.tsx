"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { routes } from "@/shared/config";
import { resetPasswordAction } from "../api/account";
import { authInput, authLabel, authSubmit } from "./auth-ui";

const rules = [
  { label: "8자 이상", test: (v: string) => v.length >= 8 },
  { label: "영문 포함", test: (v: string) => /[a-zA-Z]/.test(v) },
  { label: "숫자 포함", test: (v: string) => /\d/.test(v) },
];

/** 메일 링크(?token=)로 들어와 새 비밀번호를 정한다 */
export function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [tried, setTried] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!token) {
    return (
      <Notice
        text="링크 주소가 올바르지 않습니다. 메일의 버튼을 다시 누르거나 링크를 새로 받아 주세요."
        href={routes.auth.forgotPassword}
        action="링크 다시 받기"
      />
    );
  }
  if (done) {
    return (
      <Notice
        text="비밀번호를 바꿨습니다. 새 비밀번호로 로그인해 주세요."
        href={routes.auth.login}
        action="로그인"
      />
    );
  }

  const weak = !rules.every((r) => r.test(password));
  const mismatch = confirm !== password;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setTried(true);
    if (weak || mismatch) return;
    setError(null);
    startTransition(async () => {
      const result = await resetPasswordAction(token, password);
      if (result.ok) setDone(true);
      else setError(result.error);
    });
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="reset-password" className={authLabel}>
          새 비밀번호
        </label>
        <input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={tried && weak ? true : undefined}
          aria-describedby="reset-rules"
          className={authInput}
        />
        <ul id="reset-rules" className="mt-2 flex gap-3 text-xs">
          {rules.map((r) => (
            <li key={r.label} className={r.test(password) ? "text-black" : "text-neutral-400"}>
              {r.test(password) ? "✓ " : ""}
              {r.label}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="reset-confirm" className={authLabel}>
          새 비밀번호 확인
        </label>
        <input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-invalid={tried && mismatch ? true : undefined}
          aria-describedby={tried && mismatch ? "reset-confirm-error" : undefined}
          className={authInput}
        />
        {tried && mismatch ? (
          <p id="reset-confirm-error" className="mt-1.5 text-sm text-red-600">
            비밀번호가 같지 않습니다.
          </p>
        ) : null}
      </div>
      <button type="submit" disabled={pending} className={`mt-2 ${authSubmit}`}>
        {pending ? "바꾸는 중…" : "비밀번호 바꾸기"}
      </button>
      {error ? (
        <div role="alert" className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
          {error}{" "}
          <Link href={routes.auth.forgotPassword} className="font-semibold text-black underline">
            링크 다시 받기
          </Link>
        </div>
      ) : null}
    </form>
  );
}

function Notice({ text, href, action }: { text: string; href: Route; action: string }) {
  return (
    <div role="status">
      <p className="rounded-lg bg-neutral-100 px-4 py-4 text-sm leading-[1.6] text-neutral-700">
        {text}
      </p>
      <Link href={href} className={`mt-5 flex items-center justify-center ${authSubmit}`}>
        {action}
      </Link>
    </div>
  );
}
