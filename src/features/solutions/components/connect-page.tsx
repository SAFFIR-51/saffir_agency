import { installedSolutionNotes } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, Note, PlanTable, Todo } from "@/shared/ui";
import { connectContent } from "../model/content";

export function ConnectPage() {
  return (
    <SolutionTemplate
      content={connectContent}
      slots={{
        afterFeatures: <Todo>동기화 방식 (주기, 충돌 처리, 마켓별 차이)</Todo>,
        pricing: (
          <PlanTable
            plans={solutionPlans.filter((p) => p.id === "connect")}
            setupLabel="도입 세팅비"
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
