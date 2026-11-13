import Link from "next/link";
import { formatKRW } from "@/shared/lib";
import { planLink, type PlanActions, type PlanRow } from "@/shared/ui";

function priceText(value: number | null | undefined, from: boolean) {
  if (value === undefined) return null;
  if (value === null) return "별도 견적";
  if (value === 0) return "무료";
  return `${formatKRW(value)}${from ? "~" : ""}`;
}

/**
 * 요금 한 줄씩: 상품명 · 포함 내용 · 금액 · 버튼.
 * 카드 대신 표처럼 읽히게 해서 여러 상품을 한눈에 비교한다.
 */
export function PriceRows({
  plans,
  setupLabel = "1회",
  monthlyLabel = "월",
  actions,
}: {
  plans: PlanRow[];
  setupLabel?: string;
  monthlyLabel?: string;
  /** 없으면 버튼을 그리지 않는다 (예: 서버 운영비) */
  actions?: PlanActions;
}) {
  return (
    <ul className="pr-list">
      {plans.map((plan) => {
        const from = plan.note?.includes("~") ?? false;
        // 세팅·월 모두 견적이면 "별도 견적" 한 번만
        const bothQuote = plan.setup === null && plan.monthly === null;
        const setup = bothQuote ? null : priceText(plan.setup, from);
        const monthly = bothQuote
          ? "별도 견적"
          : priceText(plan.monthly, from && plan.setup === undefined);
        const link = actions ? planLink(plan, actions) : null;
        return (
          <li key={plan.id} className="pr-item">
            <div className="pr-item-name">
              <strong>{plan.name}</strong>
              {plan.checkout ? <span className="pr-badge">바로 결제</span> : null}
            </div>
            <p className="pr-item-includes">{plan.includes.split(/,\s*|\s\+\s/).join(" · ")}</p>
            <p className="pr-item-price">
              {setup ? (
                <span>
                  <small>{setupLabel}</small>
                  {setup}
                </span>
              ) : null}
              {monthly ? (
                <span>
                  {plan.monthly === 0 || bothQuote ? null : <small>{monthlyLabel}</small>}
                  {monthly}
                </span>
              ) : null}
            </p>
            {link ? (
              <Link href={link.href} className="pr-item-btn">
                {link.label}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
