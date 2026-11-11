import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const hospitalOverviewContent = {
  title: "병원 솔루션",
  lead: "무료 진단으로 들어온 병원을 홈페이지 개선, 월 관리, 환자 관리까지 한 흐름으로 안내합니다.",
};

export const hospitalWebsiteContent: SolutionPageContent = {
  eyebrow: "병원 솔루션",
  name: "사피어 병원 홈페이지",
  message: "AI 검색에 강한 병원 홈페이지",
  problems: [
    "진단 점수가 낮거나, 진단 결과를 보고도 직접 고치기 어려운 병원",
    "두 사이트(saffirgeo, 사피어)에 흩어져 있던 병원 홈페이지 가격을 하나로 정리합니다.",
  ],
  features: [
    "기본형부터 GEO 기본 세팅 포함",
    "기본형: 유니크 3면 + 반복 7면, 검색 등록, GA4, 네이버 예약·카카오 채널 연결",
    "표준형: 진료항목별 페이지(최대 20면), 예약·상담 동선, 구조화데이터 전체, 의료광고 문구 점검",
    "프리미엄: 맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장",
    "납품 후 관리 구독: GEO 관리형 또는 단순 유지보수",
  ],
  demo: [],
  cases: [
    { title: "피부과 웹", href: routes.portfolioDetail("derma-clinic-web") },
    { title: "내과 웹", href: routes.portfolioDetail("internal-clinic-web") },
    { title: "병원 컨설팅 웹", href: routes.portfolioDetail("hospital-consulting-web") },
  ],
  pricingNotes: [],
  process: [
    "제작 상담",
    "패키지 선택·계약 (기본형은 요금 안내에서 바로 결제)",
    "제작 (패키지별 기간은 요금 표 참고)",
    "납품",
    "GEO 관리형 또는 단순 유지보수 선택",
  ],
  faq: [],
  cta: { label: "제작 상담", href: routes.contact },
  secondaryCta: { label: "기본형 결제 (요금 안내)", href: `${routes.pricing}#hospital-website` },
};
