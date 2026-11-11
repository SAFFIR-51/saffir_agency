import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const crmContent: SolutionPageContent = {
  path: routes.hospital.crm,
  eyebrow: "병원 솔루션",
  name: "사피어 병원 CRM",
  message: "한 번 온 환자가 다시 오게",
  problems: ["예약·문의가 들어와도 환자 관리로 이어지지 않는다", "다시 와야 할 환자를 놓친다"],
  features: [
    "환자 분류",
    "리콜·사후관리 메시지",
    "재진율 대시보드",
    "병원별 전용 서버·데이터 분리",
  ],
  screens: ["재진율 대시보드 화면"],
  cases: [
    { title: "병원 ERP 1", href: routes.portfolioDetail("hospital-erp-1") },
    { title: "병원 ERP 2", href: routes.portfolioDetail("hospital-erp-2") },
  ],
  process: [
    { step: "데모 신청", detail: "샘플 병원 데이터로 직접 써봅니다." },
    { step: "도입 신청", detail: "병원 규모에 맞는 요금제를 정합니다." },
    { step: "서버 세팅", detail: "병원 전용 서버를 만들고 기존 데이터를 옮깁니다." },
    { step: "운영", detail: "포털에서 서버 상태와 사용량을 확인합니다." },
  ],
  faq: [],
  cta: { label: "데모 신청", href: routes.contactFor("crm-demo") },
  secondaryCta: { label: "도입 신청", href: routes.contactFor("crm-adopt") },
};
