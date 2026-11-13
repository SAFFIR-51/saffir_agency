import { isContactTopic, routes, type ContactTopic } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { ButtonLink } from "./button-link";

/** 요금 행. content/pricing.ts의 Plan과 같은 모양이다. 금액 단위는 원, null이면 별도 견적. */
export type PlanRow = {
  id: string;
  name: string;
  includes: string;
  setup?: number | null;
  monthly?: number | null;
  note?: string;
  checkout?: boolean;
  consult?: string;
};

/**
 * 요금표 버튼 규칙 (모든 요금표 공통)
 * - checkout 상품: 주문서로 (월 요금이 있으면 "구독하기", 없으면 "결제하기")
 * - 나머지: 상담으로. 상품의 consult 유형, 없으면 표의 기본 유형을 미리 골라 보낸다
 */
type PlanActions = {
  consultFallback: ContactTopic;
  consultLabel?: string;
  /** 0원 상품의 버튼 (예: GEO 무료 → 무료 진단) */
  free?: { label: string; href: Parameters<typeof ButtonLink>[0]["href"] };
};

function planLink(plan: PlanRow, actions: PlanActions) {
  if (actions.free && plan.monthly === 0) {
    return { href: actions.free.href, label: actions.free.label, primary: true };
  }
  if (plan.checkout) {
    return {
      href: routes.order(plan.id),
      label: plan.monthly ? "구독하기" : "결제하기",
      primary: true,
    };
  }
  const topic = isContactTopic(plan.consult) ? plan.consult : actions.consultFallback;
  return { href: routes.contactFor(topic), label: actions.consultLabel ?? "상담", primary: false };
}

function price(value: number | null | undefined, from: boolean) {
  if (value === undefined) return null;
  if (value === null) return "별도 견적";
  if (value === 0) return "무료";
  return `${formatKRW(value)}${from ? "~" : ""}`;
}

/** "A, B, C" / "A + B" 형태의 포함 내용을 목록으로 나눈다 */
function splitIncludes(text: string) {
  return text
    .split(/,\s*|\s\+\s/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * 요금 카드 (애플 "어떤 모델이 맞을까요?" 비교 카드).
 * 상품마다 한 장: 이름 · 큰 금액 · 포함 목록(체크) · 버튼. 금액은 VAT 포함.
 */
export function PlanTable({
  plans,
  setupLabel = "1회",
  monthlyLabel = "월",
  caption,
  actions,
}: {
  plans: PlanRow[];
  setupLabel?: string;
  monthlyLabel?: string;
  caption?: string;
  /** 주면 카드마다 버튼을 단다 (규칙은 planLink) */
  actions?: PlanActions;
}) {
  return (
    <div>
      <ul className="grid [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {plans.map((plan) => {
          const from = plan.note?.includes("~") ?? false;
          const setup = price(plan.setup, from);
          const monthly = price(plan.monthly, from && plan.setup === undefined);
          const link = actions ? planLink(plan, actions) : null;
          return (
            <li
              key={plan.id}
              className="flex flex-col rounded-[28px] bg-surface p-8 [section:nth-of-type(even)_&]:bg-background"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                {plan.checkout ? (
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                    바로 결제
                  </span>
                ) : null}
              </div>
              <div className="mt-6 space-y-1">
                {setup ? (
                  <p className="text-[28px] leading-tight font-semibold tracking-tight">
                    {plan.setup ? (
                      <span className="mr-1.5 text-sm font-normal text-muted">{setupLabel}</span>
                    ) : null}
                    {setup}
                  </p>
                ) : null}
                {monthly ? (
                  <p
                    className={
                      setup
                        ? "text-xl font-semibold tracking-tight"
                        : "text-[28px] leading-tight font-semibold tracking-tight"
                    }
                  >
                    {plan.monthly ? (
                      <span className="mr-1.5 text-sm font-normal text-muted">{monthlyLabel}</span>
                    ) : null}
                    {monthly}
                  </p>
                ) : null}
                {plan.note ? <p className="pt-1 text-sm text-muted">{plan.note}</p> : null}
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-divider pt-6 text-[15px] leading-relaxed">
                {splitIncludes(plan.includes).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="mt-[0.3em] size-4 shrink-0 text-brand"
                    >
                      <path
                        d="M3 8.5l3 3 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {link ? (
                <ButtonLink
                  href={link.href}
                  variant={link.primary ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {link.label}
                </ButtonLink>
              ) : null}
            </li>
          );
        })}
      </ul>
      {caption ? <p className="mt-5 text-sm text-muted">{caption}</p> : null}
    </div>
  );
}
