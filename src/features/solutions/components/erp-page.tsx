import { solutionPlans } from "@/content/pricing";
import { BeforeAfter } from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { erpContent, erpOverview, pricingCaptions } from "../model/content";
import { BusinessSolutionPage } from "./business-solution-page";

export function ErpPage() {
  return (
    <BusinessSolutionPage
      content={erpContent}
      featureLayout="medium"
      overview={
        <BeforeAfter caption="업무 통합 ERP 도입 전후 비교" comparison={erpOverview.comparison}>
          {erpOverview.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </BeforeAfter>
      }
      pricing={
        <PlanTable
          plans={solutionPlans.filter((p) => p.id === "erp")}
          setupLabel="1단계 진단·설계"
          monthlyLabel="월 이용료"
          caption={pricingCaptions.erp}
          actions={{ consultFallback: "erp", consultLabel: "1단계 진단 신청" }}
        />
      }
    />
  );
}
