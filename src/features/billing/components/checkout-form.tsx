"use client";

import type { Route } from "next";
import Link from "next/link";
import { useId, useState } from "react";
import { cn, formatKRW } from "@/shared/lib";

type Item = {
  id: string;
  name: string;
  includes: string;
  amount: number;
  subscription: boolean;
};

const tossBlue = "bg-[#3182f6] text-white hover:bg-[#1b64da]";
const card = "rounded-2xl bg-white p-6 sm:p-8";
const label = "block text-sm font-semibold text-[#333d4b]";
const input =
  "mt-2 h-12 w-full rounded-xl border border-[#e5e8eb] bg-white px-4 text-[0.9375rem] text-[#191f28] placeholder:text-[#b0b8c1] focus-visible:border-[#3182f6] focus-visible:outline-none aria-invalid:border-[#f04452]";

const fields = [
  { name: "organization", label: "병원명 또는 회사명", type: "text", auto: "organization" },
  { name: "contactName", label: "담당자 이름", type: "text", auto: "name" },
  { name: "email", label: "이메일 (영수증 받을 곳)", type: "email", auto: "email" },
  { name: "phone", label: "연락처", type: "tel", auto: "tel", placeholder: "010-0000-0000" },
] as const;

/**
 * 주문서 왼쪽(주문자·결제 수단·동의) + 오른쪽(결제 금액 요약, 따라옴).
 * 실제 결제창(토스페이먼츠) 연결은 결제 기능 개발 때 붙인다. 지금은 입력·동의 확인까지만 한다.
 */
export function CheckoutForm({
  item,
  methods,
  notes,
  links,
  seller,
}: {
  item: Item;
  methods: readonly string[];
  notes: { subscription: string; pending: string };
  links: { terms: Route; refund: Route; privacy: Route; pricing: Route };
  seller: string;
}) {
  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [method, setMethod] = useState(methods[0]);
  const [agree, setAgree] = useState({ order: false, terms: false, privacy: false });
  const [tried, setTried] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const missing = fields.filter((f) => !values[f.name]?.trim()).map((f) => f.name);
  const allAgreed = agree.order && agree.terms && agree.privacy;
  const payLabel = item.subscription
    ? `카드 등록하고 월 ${formatKRW(item.amount)} 구독 시작`
    : `${formatKRW(item.amount)} 결제하기`;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setTried(true);
    if (missing.length > 0 || !allAgreed) {
      setMessage("빠진 정보와 동의 항목을 확인해 주세요.");
      return;
    }
    setMessage(notes.pending);
  }

  const check = (key: keyof typeof agree, text: React.ReactNode) => (
    <label className="flex cursor-pointer items-start gap-3 py-1.5 text-[0.9375rem] text-[#333d4b]">
      <input
        type="checkbox"
        checked={agree[key]}
        onChange={(e) => setAgree((a) => ({ ...a, [key]: e.target.checked }))}
        className="mt-0.5 size-5 shrink-0 accent-[#3182f6]"
      />
      <span>{text}</span>
    </label>
  );

  return (
    <form
      id={formId}
      onSubmit={submit}
      noValidate
      className="grid items-start gap-3 lg:grid-cols-12 lg:gap-4"
    >
      <div className="flex flex-col gap-3 lg:col-span-7">
        {/* 주문 상품 */}
        <section aria-labelledby={`${formId}-item`} className={card}>
          <h2 id={`${formId}-item`} className="text-lg font-bold text-[#191f28]">
            주문 상품
          </h2>
          <div className="mt-5 flex items-start justify-between gap-6">
            <div>
              <p className="text-[1.0625rem] font-bold tracking-[-0.02em] text-[#191f28]">
                {item.name}
              </p>
              <p className="mt-1 text-sm leading-[1.55] text-[#6b7684]">{item.includes}</p>
              <span className="mt-3 inline-block rounded-md bg-[#e8f3ff] px-2 py-1 text-xs font-semibold text-[#1b64da]">
                {item.subscription ? "매달 자동결제" : "1회 결제"}
              </span>
            </div>
            <p className="shrink-0 text-[1.0625rem] font-bold text-[#191f28] tabular-nums">
              {formatKRW(item.amount)}
              {item.subscription && <span className="text-sm font-medium text-[#6b7684]">/월</span>}
            </p>
          </div>
          {item.subscription && (
            <p className="mt-5 rounded-xl bg-[#f9fafb] px-4 py-3 text-sm leading-[1.6] text-[#4e5968]">
              {notes.subscription}
            </p>
          )}
        </section>

        {/* 주문자 정보 */}
        <section aria-labelledby={`${formId}-buyer`} className={card}>
          <h2 id={`${formId}-buyer`} className="text-lg font-bold text-[#191f28]">
            주문자 정보
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {fields.map((f) => {
              const invalid = tried && missing.includes(f.name);
              return (
                <div key={f.name}>
                  <label htmlFor={`${formId}-${f.name}`} className={label}>
                    {f.label}
                  </label>
                  <input
                    id={`${formId}-${f.name}`}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.auto}
                    placeholder={"placeholder" in f ? f.placeholder : undefined}
                    aria-invalid={invalid || undefined}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    className={input}
                  />
                  {invalid && <p className="mt-1.5 text-sm text-[#f04452]">입력해 주세요.</p>}
                </div>
              );
            })}
          </div>
          <label className="mt-5 flex cursor-pointer items-center gap-3 text-[0.9375rem] text-[#333d4b]">
            <input type="checkbox" name="taxInvoice" className="size-5 accent-[#3182f6]" />
            세금계산서 발행을 원해요
          </label>
        </section>

        {/* 결제 수단 */}
        <section aria-labelledby={`${formId}-method`} className={card}>
          <h2 id={`${formId}-method`} className="text-lg font-bold text-[#191f28]">
            결제 수단
          </h2>
          <div
            role="radiogroup"
            aria-labelledby={`${formId}-method`}
            className="mt-5 grid gap-2 sm:grid-cols-3"
          >
            {methods.map((m) => {
              const on = method === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setMethod(m)}
                  className={cn(
                    "h-14 rounded-xl border text-[0.9375rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6] motion-safe:transition-colors",
                    on
                      ? "border-[#3182f6] bg-[#e8f3ff] text-[#1b64da]"
                      : "border-[#e5e8eb] bg-white text-[#4e5968] hover:bg-[#f9fafb]",
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-[#8b95a1]">결제는 토스페이먼츠 결제창에서 진행됩니다.</p>
        </section>
      </div>

      {/* 결제 금액: 데스크톱에서는 오른쪽에 따라온다 */}
      <aside aria-label="결제 금액" className="lg:sticky lg:top-28 lg:col-span-5">
        <div className={card}>
          <h2 className="text-lg font-bold text-[#191f28]">결제 금액</h2>
          <dl className="mt-5 grid gap-3 text-[0.9375rem]">
            <div className="flex justify-between">
              <dt className="text-[#6b7684]">상품 금액</dt>
              <dd className="text-[#333d4b] tabular-nums">{formatKRW(item.amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6b7684]">결제 방식</dt>
              <dd className="text-[#333d4b]">{item.subscription ? "매달 자동결제" : "1회 결제"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6b7684]">결제 수단</dt>
              <dd className="text-[#333d4b]">{method}</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-end justify-between border-t border-[#f2f4f6] pt-5">
            <p className="font-bold text-[#191f28]">
              총 결제 금액
              <span className="mt-0.5 block text-xs font-medium text-[#8b95a1]">VAT 포함</span>
            </p>
            <p className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#3182f6] tabular-nums">
              {formatKRW(item.amount)}
              {item.subscription && <span className="text-base font-semibold">/월</span>}
            </p>
          </div>

          <div className="mt-6 border-t border-[#f2f4f6] pt-4">
            <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[0.9375rem] font-bold text-[#191f28]">
              <input
                type="checkbox"
                checked={allAgreed}
                onChange={(e) =>
                  setAgree({
                    order: e.target.checked,
                    terms: e.target.checked,
                    privacy: e.target.checked,
                  })
                }
                className="size-5 accent-[#3182f6]"
              />
              전체 동의
            </label>
            <div className="mt-1 pl-1">
              {check("order", "주문 상품과 결제 금액을 확인했습니다 (필수)")}
              {check(
                "terms",
                <>
                  <Link href={links.terms} className="underline underline-offset-4">
                    이용약관
                  </Link>
                  과{" "}
                  <Link href={links.refund} className="underline underline-offset-4">
                    취소 및 환불 규정
                  </Link>
                  에 동의합니다 (필수)
                </>,
              )}
              {check(
                "privacy",
                <>
                  결제를 위한{" "}
                  <Link href={links.privacy} className="underline underline-offset-4">
                    개인정보 수집·이용
                  </Link>
                  에 동의합니다 (필수)
                </>,
              )}
            </div>
            {tried && !allAgreed && (
              <p className="mt-1 text-sm text-[#f04452]">필수 항목에 모두 동의해 주세요.</p>
            )}
          </div>

          <button
            type="submit"
            className={cn(
              "mt-6 h-14 w-full rounded-xl text-[1.0625rem] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6] motion-safe:transition-colors",
              tossBlue,
            )}
          >
            {payLabel}
          </button>
          {message && (
            <p role="status" className="mt-3 text-sm leading-[1.55] text-[#4e5968]">
              {message}
            </p>
          )}
          <p className="mt-5 text-xs leading-[1.6] text-[#8b95a1]">
            판매자 {seller} · 결제 대행 토스페이먼츠
            <br />
            <Link href={links.pricing} className="underline underline-offset-2">
              다른 상품 고르기
            </Link>
          </p>
        </div>
      </aside>
    </form>
  );
}
