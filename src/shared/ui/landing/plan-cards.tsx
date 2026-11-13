import Link from "next/link";
import { formatKRW } from "@/shared/lib";
import { planLink, type PlanActions, type PlanRow } from "../plan-table";
import { ArrowIcon } from "./landing-section";
import "./landing.css";

function priceText(value: number | null | undefined, from: boolean) {
  if (value === undefined) return null;
  if (value === null) return "별도 견적";
  if (value === 0) return "무료";
  return `${formatKRW(value)}${from ? "~" : ""}`;
}

/** "A, B, C" / "A + B" 형태의 포함 내용을 읽기 쉬운 목록으로 나눈다 */
function splitIncludes(text: string) {
  return text
    .split(/,\s*|\s\+\s/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * 요금 카드. 상품마다 한 장: 이름 · 큰 금액 · 포함 목록 · 버튼.
 * 표시: 0원이면 "무료", 바로 결제 상품이면 "바로 결제" 표시. 금액은 VAT 포함.
 */
export function PlanCards({
  plans,
  setupLabel = "1회",
  monthlyLabel = "월",
  actions,
}: {
  plans: PlanRow[];
  setupLabel?: string;
  monthlyLabel?: string;
  actions: PlanActions;
}) {
  return (
    <ul className="pc-list">
      {plans.map((plan) => {
        const from = plan.note?.includes("~") ?? false;
        const setup = priceText(plan.setup, from);
        const monthly = priceText(plan.monthly, from && plan.setup === undefined);
        const link = planLink(plan, actions);
        return (
          <li key={plan.id} className="pc">
            <div className="pc-top">
              <h3 className="pc-name">{plan.name}</h3>
              {plan.monthly === 0 ? <span className="pc-badge">무료</span> : null}
              {plan.checkout ? <span className="pc-badge">바로 결제</span> : null}
            </div>
            <div className="pc-prices">
              {setup ? (
                <p className="pc-price">
                  <small>{setupLabel}</small>
                  {setup}
                </p>
              ) : null}
              {monthly ? (
                <p className="pc-price">
                  {plan.monthly === 0 ? null : <small>{monthlyLabel}</small>}
                  {monthly}
                </p>
              ) : null}
            </div>
            <ul className="pc-includes">
              {splitIncludes(plan.includes).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={link.href} className="ls-btn pc-btn">
              {link.label}
              <ArrowIcon />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
