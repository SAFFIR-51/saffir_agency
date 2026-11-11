import type { Plan } from "@/content/pricing";
import { formatKRW } from "@/shared/lib";

function price(value: number | null | undefined) {
  if (value === undefined) return "-";
  if (value === null) return "별도 견적";
  return formatKRW(value);
}

export function PriceTable({ plans }: { plans: Plan[] }) {
  const hasSetup = plans.some((p) => p.setup !== undefined);
  const hasMonthly = plans.some((p) => p.monthly !== undefined);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-foreground/10 text-foreground/60">
          <tr>
            <th className="py-3 pr-4 font-medium">상품</th>
            <th className="py-3 pr-4 font-medium">포함</th>
            {hasSetup ? <th className="py-3 pr-4 font-medium">1회</th> : null}
            {hasMonthly ? <th className="py-3 font-medium">월</th> : null}
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id} className="border-b border-foreground/5 align-top">
              <td className="py-3 pr-4 font-medium">{p.name}</td>
              <td className="py-3 pr-4 text-foreground/70">{p.includes}</td>
              {hasSetup ? <td className="py-3 pr-4">{price(p.setup)}</td> : null}
              {hasMonthly ? <td className="py-3">{p.note ?? price(p.monthly)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
