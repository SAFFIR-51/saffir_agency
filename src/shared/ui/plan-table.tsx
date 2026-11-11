import { formatKRW } from "@/shared/lib";
import { DataTable } from "./data-table";

/** 요금 행. content/pricing.ts의 Plan과 같은 모양이다. 금액 단위는 원, null이면 별도 견적. */
export type PlanRow = {
  id: string;
  name: string;
  includes: string;
  setup?: number | null;
  monthly?: number | null;
  note?: string;
};

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
}: {
  plans: PlanRow[];
  setupLabel?: string;
  monthlyLabel?: string;
  caption?: string;
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
  ];
  const rows = plans.map((p) => [
    p.name,
    p.includes,
    ...(hasSetup ? [price(p.setup)] : []),
    ...(hasMonthly ? [price(p.monthly)] : []),
    ...(hasNote ? [p.note ?? ""] : []),
  ]);
  return <DataTable columns={columns} rows={rows} caption={caption} />;
}
