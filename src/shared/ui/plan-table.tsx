import { isContactTopic, routes, type ContactTopic } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
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
  /** 0원 상품의 버튼 (예: GEO 무료 → 무료 진단) */
  free?: { label: string; href: Parameters<typeof ButtonLink>[0]["href"] };
};

function PlanButton({
  href,
  children,
}: {
  href: Parameters<typeof ButtonLink>[0]["href"];
  children: React.ReactNode;
}) {
  return (
    <ButtonLink href={href} variant="secondary" size="sm">
      {children}
    </ButtonLink>
  );
}

function planAction(plan: PlanRow, actions: PlanActions) {
  if (actions.free && plan.monthly === 0) {
    return <PlanButton href={actions.free.href}>{actions.free.label}</PlanButton>;
  }
  if (plan.checkout) {
    return (
      <PlanButton href={routes.order(plan.id)}>{plan.monthly ? "구독하기" : "결제하기"}</PlanButton>
    );
  }
  const topic = isContactTopic(plan.consult) ? plan.consult : actions.consultFallback;
  return <PlanButton href={routes.contactFor(topic)}>{actions.consultLabel ?? "상담"}</PlanButton>;
}

function price(value: number | null | undefined) {
  if (value === undefined) return "-";
  if (value === null) return "별도 견적";
  return <span className="whitespace-nowrap tabular-nums">{formatKRW(value)}</span>;
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
