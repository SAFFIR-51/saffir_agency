import { isContactTopic, routes, type ContactTopic } from "@/shared/config";
import Link from "next/link";
import { cn, formatKRW } from "@/shared/lib";
import { ButtonLink } from "./button-link";
import { DataTable } from "./data-table";

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
  highlightConsult?: boolean;
  /** 0원 상품의 버튼 (예: GEO 무료 → 무료 진단) */
  free?: { label: string; href: Parameters<typeof ButtonLink>[0]["href"] };
};

function PlanButton({
  href,
  highlighted = false,
  children,
}: {
  href: Parameters<typeof ButtonLink>[0]["href"];
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6] motion-safe:transition-colors",
        highlighted
          ? "bg-[#3182f6] text-white hover:bg-[#1b64da]"
          : "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]",
      )}
    >
      {children}
    </Link>
  );
}

function planAction(plan: PlanRow, actions: PlanActions) {
  if (actions.free && plan.monthly === 0) {
    return <PlanButton href={actions.free.href}>{actions.free.label}</PlanButton>;
  }
  if (plan.checkout) {
    return (
      <PlanButton href={routes.order(plan.id)} highlighted>
        {plan.monthly ? "구독하기" : "결제하기"}
      </PlanButton>
    );
  }
  const topic = isContactTopic(plan.consult) ? plan.consult : actions.consultFallback;
  return (
    <PlanButton href={routes.contactFor(topic)} highlighted={actions.highlightConsult}>
      {actions.consultLabel ?? "상담"}
    </PlanButton>
  );
}

function price(value: number | null | undefined) {
  if (value === undefined) return "-";
  if (value === null) return "별도 견적";
  return formatKRW(value);
}

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
  /** 주면 "신청" 열에 상품별 버튼을 단다 (규칙은 planAction) */
  actions?: PlanActions;
}) {
  const hasSetup = plans.some((p) => p.setup !== undefined);
  const hasMonthly = plans.some((p) => p.monthly !== undefined);
  const hasNote = plans.some((p) => p.note);
  const columns = [
    "상품",
    "포함",
    ...(hasSetup ? [setupLabel] : []),
    ...(hasMonthly ? [monthlyLabel] : []),
    ...(hasNote ? ["비고"] : []),
    ...(actions ? ["신청"] : []),
  ];
  const rows = plans.map((p) => [
    p.name,
    p.includes,
    ...(hasSetup ? [price(p.setup)] : []),
    ...(hasMonthly ? [price(p.monthly)] : []),
    ...(hasNote ? [p.note ?? ""] : []),
    ...(actions ? [planAction(p, actions)] : []),
  ]);
  return <DataTable columns={columns} rows={rows} caption={caption} />;
}
