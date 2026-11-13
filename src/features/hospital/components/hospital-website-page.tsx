import { hospitalWebsiteNotes, hospitalWebsitePlans } from "@/content/pricing";
import { SalesPage } from "@/shared/sections";
import { PlanCards } from "@/shared/ui";
import { hospitalWebsiteSales } from "../model/website-sales";

export function HospitalWebsitePage() {
  return (
    <SalesPage
      content={hospitalWebsiteSales}
      slots={{
        pricingLead: hospitalWebsiteNotes.join(" "),
        pricing: (
          <PlanCards
            plans={hospitalWebsitePlans}
            setupLabel="제작비"
            actions={{ consultFallback: "hospital-website", consultLabel: "제작 상담" }}
          />
        ),
      }}
    />
  );
}
