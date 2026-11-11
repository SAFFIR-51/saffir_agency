import { hospitalWebsiteNotes, hospitalWebsitePlans } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { hospitalWebsiteContent } from "../model/content";

export function HospitalWebsitePage() {
  return (
    <SolutionTemplate
      content={hospitalWebsiteContent}
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
