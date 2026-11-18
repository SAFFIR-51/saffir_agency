import { solutionPlans } from "@/content/pricing";
import { BeforeAfter } from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { connectContent, connectOverview } from "../model/content";
import { BusinessSolutionPage } from "./business-solution-page";

export function ConnectPage() {
  const { story } = connectOverview;

  return (
    <BusinessSolutionPage
      content={connectContent}
      featureLayout="wide"
      overview={
        <BeforeAfter caption="커머스 연동 도입 전후 비교" comparison={connectOverview.comparison}>
          <p>{story.context}</p>
          <p>
            {story.orders} <span className="md:block">{story.inventory}</span>
          </p>
        </BeforeAfter>
      }
      pricing={
        <PlanTable
          plans={solutionPlans.filter((p) => p.id === "connect")}
          setupLabel="도입 세팅비"
          monthlyLabel="월 이용료"
          actions={{ consultFallback: "connect", consultLabel: "도입 상담" }}
        />
      }
    />
  );
}
