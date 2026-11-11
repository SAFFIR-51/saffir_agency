import { installedSolutionRows } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { DataTable, PlanTable, Subheading } from "@/shared/ui";
import { aiChatbotContent, pricingCaptions } from "../model/content";

export function AiChatbotPage() {
  return (
    <SolutionTemplate
      content={aiChatbotContent}
      slots={{
        pricing: (
          <PlanTable
            plans={solutionPlans.filter((p) => p.id === "ai-chatbot")}
            setupLabel="PoC"
            monthlyLabel="월 이용료"
            caption={pricingCaptions.aiChatbot}
            actions={{ consultFallback: "ai-chatbot", consultLabel: "PoC 신청" }}
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
