import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const crmContent: SolutionPageContent = {
  name: "사피어 병원 CRM",
  message: "한 번 온 환자가 다시 오게",
  cta: { label: "데모 신청", href: routes.contact },
};
