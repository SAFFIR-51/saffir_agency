import Link from "next/link";
import { installedSolutionRows } from "@/content/company";
import { crmDemo, crmSecurity } from "@/content/hospital";
import { messagePriceNote, messagePriceRows, solutionPlans } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, DataTable, PlanTable, Subheading } from "@/shared/ui";
import { crmContent } from "../model/content";

export function CrmPage() {
  return (
    <SolutionTemplate
      content={crmContent}
      slots={{
        afterFeatures: (
          <>
            <Subheading>보안</Subheading>
            <BulletList items={[...crmSecurity.items, crmSecurity.messaging]} />
            <Link
              href={routes.legal.security}
              className="inline-block underline underline-offset-4"
            >
              보안·데이터 정책 자세히 보기
            </Link>
          </>
        ),
        screens: <BulletList items={crmDemo} />,
        pricing: (
          <>
            <PlanTable
              plans={solutionPlans.filter((p) => p.id.startsWith("crm-"))}
              setupLabel="도입 세팅비"
              monthlyLabel="월 이용료"
            />
            <DataTable
              columns={["메시지", "건당"]}
              rows={messagePriceRows.map((m) => [m.name, formatKRW(m.unit)])}
              caption={messagePriceNote}
            />
          </>
        ),
        afterProcess: (
          <>
            <Subheading>제공 방식</Subheading>
            <DataTable
              columns={["항목", "내용"]}
              rows={installedSolutionRows.map((r) => [r.item, r.detail])}
            />
          </>
        ),
      }}
    />
  );
}
