import { withCaseImages } from "@/content/portfolio";
import { formatKRW } from "@/shared/lib";
import { installedSolutionRows } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { DataTable, PlanTable, Subheading } from "@/shared/ui";
import { erpContent, pricingCaptions } from "../model/content";

export function ErpPage() {
  return (
    <SolutionTemplate
      content={{ ...erpContent, cases: withCaseImages(erpContent.cases) }}
      summary={(() => {
        const plan = solutionPlans.find((p) => p.id === "erp");
        const parts = [
          plan?.setup ? `1단계 진단·설계 ${formatKRW(plan.setup)}` : null,
          plan?.monthly ? `월 ${formatKRW(plan.monthly)}` : null,
        ].filter(Boolean);
        return [
          { label: "시작 요금", value: parts.join(" + ") || "별도 견적" },
          { label: "결제 방식", value: "상담 후 결제" },
        ];
      })()}
      slots={{
        pricing: (
          <PlanTable
            plans={solutionPlans.filter((p) => p.id === "erp")}
            setupLabel="1단계 진단·설계"
            monthlyLabel="월 이용료"
            caption={pricingCaptions.erp}
            actions={{ consultFallback: "erp", consultLabel: "1단계 진단 신청" }}
          />
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
