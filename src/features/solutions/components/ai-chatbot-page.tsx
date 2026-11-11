import { installedSolutionNotes } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, Note, PlanTable } from "@/shared/ui";
import { aiChatbotContent } from "../model/content";

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
