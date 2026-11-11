import { installedSolutionNotes } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, Note, PlanTable } from "@/shared/ui";
import { erpContent } from "../model/content";

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
          />
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
