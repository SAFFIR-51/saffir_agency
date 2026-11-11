import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const crmContent: SolutionPageContent = {
  eyebrow: "병원 솔루션",
  name: "사피어 병원 CRM",
  message: "한 번 온 환자가 다시 오게",
  problems: [
    "홈페이지로 들어온 예약·문의가 환자 관리와 재방문 유도로 이어지지 않습니다.",
    "한 번 온 환자가 다시 오도록 관리하기 어렵습니다.",
  ],
  features: [
    "환자 분류",
    "리콜·사후관리 메시지",
    "재진율 대시보드",
    "병원별 전용 서버·데이터 분리",
  ],
  demo: [],
  cases: [
    { title: "병원 ERP 1", href: routes.portfolioDetail("hospital-erp-1") },
    { title: "병원 ERP 2", href: routes.portfolioDetail("hospital-erp-2") },
  ],
  pricingNotes: [],
  process: ["데모 신청", "도입 신청", "병원 전용 서버 세팅 (데이터 이관 포함)"],
  faq: [],
  cta: { label: "데모 신청", href: routes.contact },
  secondaryCta: { label: "도입 신청", href: routes.contact },
};
