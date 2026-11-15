import { withCaseImages } from "@/content/portfolio";
import { formatKRW } from "@/shared/lib";
import { installedSolutionRows } from "@/content/company";
import { solutionPlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { DataTable, PlanTable, Subheading, WireBox } from "@/shared/ui";
import { connectContent } from "../model/content";

export function ConnectPage() {
  return (
    <SolutionTemplate
      content={{ ...connectContent, cases: withCaseImages(connectContent.cases) }}
      summary={(() => {
        const plan = solutionPlans.find((p) => p.id === "connect");
        const parts = [
          plan?.setup ? `세팅비 ${formatKRW(plan.setup)}` : null,
          plan?.monthly ? `월 ${formatKRW(plan.monthly)}` : null,
        ].filter(Boolean);
        return [
          { label: "시작 요금", value: parts.join(" + ") || "별도 견적" },
          { label: "결제 방식", value: "상담 후 결제" },
        ];
      })()}
      slots={{
        afterFeatures: <WireBox label="동기화 방식 · 주기, 충돌 처리, 마켓별 차이" />,
        pricing: (
          <PlanTable
            plans={solutionPlans.filter((p) => p.id === "connect")}
            setupLabel="도입 세팅비"
            monthlyLabel="월 이용료"
            actions={{ consultFallback: "connect", consultLabel: "도입 상담" }}
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
