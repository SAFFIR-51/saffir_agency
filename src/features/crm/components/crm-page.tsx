import Link from "next/link";
import { installedSolutionNotes } from "@/content/company";
import { crmDemo, crmSecurity } from "@/content/hospital";
import { messagePriceNote, messagePriceRows, solutionPlans } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, DataTable, Note, PlanTable, Subheading } from "@/shared/ui";
import { crmContent } from "../model/content";

export function CrmPage() {
  return (
    <SolutionTemplate
      content={crmContent}
      slots={{
        afterFeatures: (
          <>
            <Subheading>보안</Subheading>
            <BulletList items={crmSecurity.items} />
            <p>{crmSecurity.messaging}</p>
            <Link
              href={routes.legal.security}
              className="inline-block underline underline-offset-4"
            >
              보안·데이터 정책 자세히 보기
            </Link>
          </>
        ),
        demo: <BulletList items={crmDemo} />,
        pricing: (
          <>
            <PlanTable
              plans={solutionPlans.filter((p) => p.id.startsWith("crm-"))}
              setupLabel="도입 세팅비"
              monthlyLabel="월 이용료"
            />
            <Subheading>메시지 발송 (건별)</Subheading>
            <DataTable
              columns={["종류", "건당"]}
              rows={messagePriceRows.map((m) => [m.name, formatKRW(m.unit)])}
            />
            <p className="text-sm text-foreground/70">{messagePriceNote}</p>
          </>
        ),
        afterProcess: (
          <Note title="제공 방식">
            <BulletList items={installedSolutionNotes} />
          </Note>
        ),
      }}
    />
  );
}
