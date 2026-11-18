"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/shared/lib";
import { signupAction } from "../api/account";
import { authInput, authLabel, authSubmit } from "./auth-ui";

type FieldName = "name" | "organization" | "email" | "phone" | "password" | "passwordConfirm";
type AgreeKey = "age" | "terms" | "privacy" | "marketing";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 010-1234-5678 꼴로 하이픈을 넣는다 */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

const passwordRules = [
  { label: "8자 이상", test: (v: string) => v.length >= 8 },
  { label: "영문 포함", test: (v: string) => /[a-zA-Z]/.test(v) },
  { label: "숫자 포함", test: (v: string) => /\d/.test(v) },
];

/**
 * 이메일 가입서. 백엔드 모드면 회원 서버에 가입하고 바로 포털로, 데모 모드면 준비 중 안내.
 */
export function SignupForm({
  links,
  invite,
}: {
  links: { terms: Route; privacy: Route };
  /** 초대 링크로 들어온 경우: 이메일은 초대받은 주소로 고정, 가입하면 그 고객사에 연결 */
  invite?: { token: string; email: string; client: string };
}) {
  const [kind, setKind] = useState<"병원" | "기업">("병원");
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    organization: invite?.client ?? "",
    email: invite?.email ?? "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState<Record<AgreeKey, boolean>>({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [tried, setTried] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const errors: Partial<Record<FieldName, string>> = {};
  const v = values;
  if (!v.name.trim()) errors.name = "담당자 이름을 입력해 주세요.";
  if (!v.organization.trim())
    errors.organization = `${kind === "병원" ? "병원명" : "회사명"}을 입력해 주세요.`;
  if (!v.email.trim()) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL.test(v.email.trim())) errors.email = "이메일 형식이 올바르지 않습니다.";
  if (!v.phone) errors.phone = "연락처를 입력해 주세요.";
  else if (v.phone.replace(/\D/g, "").length < 10) errors.phone = "연락처를 끝까지 입력해 주세요.";
  if (!passwordRules.every((r) => r.test(v.password)))
    errors.password = "8자 이상, 영문과 숫자를 함께 넣어 주세요.";
  if (!v.passwordConfirm) errors.passwordConfirm = "비밀번호를 한 번 더 입력해 주세요.";
  else if (v.passwordConfirm !== v.password) errors.passwordConfirm = "비밀번호가 같지 않습니다.";

  const shown = (name: FieldName) => (tried || touched[name] ? errors[name] : undefined);
  const required: AgreeKey[] = ["age", "terms", "privacy"];
  const requiredAgreed = required.every((k) => agree[k]);
  const allAgreed = requiredAgreed && agree.marketing;

  const set = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: name === "phone" ? formatPhone(value) : value }));
    setMessage(null);
  };

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setTried(true);
    if (Object.keys(errors).length > 0 || !requiredAgreed) {
      setMessage(null);
      const first = (Object.keys(errors) as FieldName[])[0];
      if (first) document.getElementById(`signup-${first}`)?.focus();
      return;
    }
    setMessage(null);
    startTransition(async () => {
      const result = await signupAction({
        customerType: kind,
        name: v.name,
        organization: v.organization,
        email: v.email,
        phone: v.phone,
        password: v.password,
        agreed: requiredAgreed,
        marketing: agree.marketing,
        ...(invite && { inviteToken: invite.token }),
      });
      if (!result.ok) return setMessage(result.error);
      router.push(result.next as Route);
      router.refresh();
    });
  }

  const field = (
    name: FieldName,
    label: string,
    input: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">,
    after?: React.ReactNode,
  ) => {
    const error = shown(name);
    return (
      <div>
        <label htmlFor={`signup-${name}`} className={authLabel}>
          {label}
        </label>
        <div className="relative">
          <input
            id={`signup-${name}`}
            name={name}
            value={values[name]}
            onChange={(e) => set(name, e.target.value)}
            onBlur={() => values[name] && setTouched((t) => ({ ...t, [name]: true }))}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `signup-${name}-error` : undefined}
            className={authInput}
            {...input}
          />
          {after}
        </div>
        {error ? (
          <p id={`signup-${name}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  const agreeRows: { key: AgreeKey; text: React.ReactNode; required: boolean; href?: Route }[] = [
    { key: "age", text: "만 14세 이상입니다", required: true },
    { key: "terms", text: "이용약관 동의", required: true, href: links.terms },
    { key: "privacy", text: "개인정보 수집·이용 동의", required: true, href: links.privacy },
    { key: "marketing", text: "서비스 소식·혜택 안내 수신", required: false },
  ];

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div>
        <p className={authLabel}>고객 유형</p>
        <div role="radiogroup" aria-label="고객 유형" className="grid grid-cols-2 gap-2">
          {(["병원", "기업"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "h-12 rounded-lg border text-[0.9375rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                kind === k
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 text-neutral-600 hover:border-black hover:text-black",
              )}
            >
              {k === "병원" ? "병원·의원" : "기업·브랜드"}
            </button>
          ))}
        </div>
      </div>

      {field("name", "담당자 이름", { autoComplete: "name", placeholder: "홍길동" })}
      {field("organization", kind === "병원" ? "병원명" : "회사명", {
        autoComplete: "organization",
        placeholder: kind === "병원" ? "사피어의원" : "주식회사 사피어",
      })}
      {field("email", invite ? "이메일 (초대받은 주소)" : "이메일 (아이디)", {
        type: "email",
        autoComplete: "email",
        inputMode: "email",
        placeholder: "name@example.com",
        ...(invite && { readOnly: true, className: `${authInput} bg-neutral-50 text-neutral-600` }),
      })}
      {field("phone", "휴대폰 번호", {
        type: "tel",
        autoComplete: "tel",
        inputMode: "numeric",
        placeholder: "010-0000-0000",
      })}

      <div>
        {field(
          "password",
          "비밀번호",
          {
            type: showPassword ? "text" : "password",
            autoComplete: "new-password",
            placeholder: "영문·숫자 포함 8자 이상",
            className: `${authInput} pr-16`,
          },
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 px-4 text-sm text-neutral-500 hover:text-black"
          >
            {showPassword ? "숨기기" : "보기"}
          </button>,
        )}
        <ul className="mt-2 flex gap-4 text-[0.8125rem]" aria-label="비밀번호 조건">
          {passwordRules.map((r) => {
            const ok = r.test(values.password);
            return (
              <li
                key={r.label}
                className={cn("flex items-center gap-1", ok ? "text-black" : "text-neutral-400")}
              >
                <span aria-hidden="true">{ok ? "✓" : "·"}</span>
                {r.label}
                <span className="sr-only">{ok ? " 충족" : " 미충족"}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {field("passwordConfirm", "비밀번호 확인", {
        type: showPassword ? "text" : "password",
        autoComplete: "new-password",
      })}

      <fieldset className="mt-2 rounded-lg border border-neutral-300">
        <legend className="sr-only">약관 동의</legend>
        <label className="flex cursor-pointer items-center gap-3 border-b border-neutral-200 px-4 py-4 text-[0.9375rem] font-semibold">
          <input
            type="checkbox"
            checked={allAgreed}
            onChange={(e) =>
              setAgree({
                age: e.target.checked,
                terms: e.target.checked,
                privacy: e.target.checked,
                marketing: e.target.checked,
              })
            }
            className="size-5 accent-black"
          />
          전체 동의
          <span className="text-xs font-normal text-neutral-500">(선택 항목 포함)</span>
        </label>
        <ul className="flex flex-col gap-3 px-4 py-4">
          {agreeRows.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-3 text-neutral-700">
                <input
                  type="checkbox"
                  checked={agree[row.key]}
                  onChange={(e) => setAgree((a) => ({ ...a, [row.key]: e.target.checked }))}
                  className="size-4 accent-black"
                />
                <span>
                  <span className={row.required ? "text-black" : "text-neutral-500"}>
                    ({row.required ? "필수" : "선택"})
                  </span>{" "}
                  {row.text}
                </span>
              </label>
              {row.href ? (
                <Link
                  href={row.href}
                  target="_blank"
                  className="shrink-0 text-xs text-neutral-500 underline underline-offset-4 hover:text-black"
                >
                  보기
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </fieldset>
      {tried && !requiredAgreed && (
        <p role="alert" className="-mt-2 text-sm text-red-600">
          필수 항목에 모두 동의해 주세요.
        </p>
      )}

      <button type="submit" disabled={pending} className={`mt-2 ${authSubmit}`}>
        {pending ? "가입하는 중…" : "가입하기"}
      </button>
      {message && (
        <p role="status" className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
          {message}
        </p>
      )}
    </form>
  );
}
