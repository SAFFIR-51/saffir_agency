import { installedSolutionRows } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { DataTable, PlanTable, Subheading } from "@/shared/ui";
import { erpContent, pricingCaptions } from "../model/content";

export function ErpPage() {
  return (
    <SolutionTemplate
      content={erpContent}
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
