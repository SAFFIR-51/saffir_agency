import { withCaseImages } from "@/content/portfolio";
import { formatKRW } from "@/shared/lib";
import { hospitalWebsiteNotes, hospitalWebsitePlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { hospitalWebsiteContent } from "../model/content";

export function HospitalWebsitePage() {
  return (
    <SolutionTemplate
      content={{ ...hospitalWebsiteContent, cases: withCaseImages(hospitalWebsiteContent.cases) }}
      summary={[
        {
          label: "시작 요금",
          value: `${formatKRW(Math.min(...hospitalWebsitePlans.flatMap((p) => (p.setup ? [p.setup] : []))))}부터`,
        },
        { label: "결제 방식", value: "기본형 바로 결제 · 그 외 상담" },
      ]}
      slots={{
        pricing: (
          <PlanTable
            plans={hospitalWebsitePlans}
            setupLabel="제작비"
            caption={hospitalWebsiteNotes.join(" ")}
            actions={{ consultFallback: "hospital-website", consultLabel: "제작 상담" }}
          />
        ),
      }}
    />
  );
}
