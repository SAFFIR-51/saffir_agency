"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { authInput, authLabel, authSubmit } from "./auth-ui";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

type Tab = "id" | "password";

/** 아이디 찾기 / 비밀번호 찾기. 처리 서버가 아직 없어 확인 뒤 준비 중 안내를 보여 준다 */
export function FindAccount({ initial = "password" }: { initial?: Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tried, setTried] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const errors: Record<string, string | undefined> =
    tab === "id"
      ? {
          name: name.trim() ? undefined : "이름을 입력해 주세요.",
          phone:
            phone.replace(/\D/g, "").length >= 10
              ? undefined
              : "가입한 휴대폰 번호를 입력해 주세요.",
        }
      : {
          email: !email.trim()
            ? "가입한 이메일을 입력해 주세요."
            : EMAIL.test(email.trim())
              ? undefined
              : "이메일 형식이 올바르지 않습니다.",
        };
  const shown = (key: string) => (tried ? errors[key] : undefined);

  function switchTo(next: Tab) {
    setTab(next);
    setTried(false);
    setMessage(null);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setTried(true);
    if (Object.values(errors).some(Boolean)) return;
    setMessage(
      tab === "id"
        ? "아이디 찾기를 준비하고 있습니다. 급하시면 문의하기로 남겨 주세요."
        : "재설정 메일 발송을 준비하고 있습니다. 급하시면 문의하기로 남겨 주세요.",
    );
  }

  const input = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    error: string | undefined,
    attrs: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label htmlFor={id} className={authLabel}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setMessage(null);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={authInput}
        {...attrs}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="계정 찾기"
        className="grid grid-cols-2 border-b border-neutral-300"
      >
        {(
          [
            ["id", "아이디 찾기"],
            ["password", "비밀번호 찾기"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`find-tab-${key}`}
            aria-selected={tab === key}
            aria-controls="find-panel"
            onClick={() => switchTo(key)}
            className={cn(
              "-mb-px h-12 border-b-2 text-[0.9375rem] font-semibold motion-safe:transition-colors",
              tab === key
                ? "border-black text-black"
                : "border-transparent text-neutral-400 hover:text-black",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="find-panel" role="tabpanel" aria-labelledby={`find-tab-${tab}`} className="pt-7">
        <p className="mb-6 text-sm leading-[1.6] text-neutral-600">
          {tab === "id"
            ? "가입할 때 입력한 이름과 휴대폰 번호로 아이디(이메일)를 찾아 드립니다."
            : "가입한 이메일로 비밀번호를 다시 정하는 링크를 보내 드립니다. 링크는 30분 동안 쓸 수 있습니다."}
        </p>
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
          {tab === "id" ? (
            <>
              {input("find-name", "이름", name, setName, shown("name"), {
                autoComplete: "name",
                placeholder: "홍길동",
              })}
              {input(
                "find-phone",
                "휴대폰 번호",
                phone,
                (v) => setPhone(formatPhone(v)),
                shown("phone"),
                {
                  type: "tel",
                  inputMode: "numeric",
                  autoComplete: "tel",
                  placeholder: "010-0000-0000",
                },
              )}
            </>
          ) : (
            input("find-email", "가입한 이메일", email, setEmail, shown("email"), {
              type: "email",
              inputMode: "email",
              autoComplete: "email",
              placeholder: "name@example.com",
            })
          )}
          <button type="submit" className={`mt-2 ${authSubmit}`}>
            {tab === "id" ? "아이디 찾기" : "재설정 링크 보내기"}
          </button>
          {message ? (
            <p
              role="status"
              className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700"
            >
              {message}
            </p>
          ) : null}
        </form>

        <div className="mt-8 rounded-lg bg-neutral-50 px-4 py-4 text-sm leading-[1.6] text-neutral-600">
          카카오·네이버로 가입하셨다면 따로 비밀번호가 없습니다. 로그인 화면에서 가입한 간편 로그인
          버튼을 눌러 주세요.
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-neutral-600">
          <Link href={routes.auth.login} className="font-semibold text-black hover:underline">
            로그인
          </Link>
          <span aria-hidden="true" className="h-3 w-px bg-neutral-300" />
          <Link href={routes.auth.signup} className="hover:text-black hover:underline">
            무료 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
