import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { SalesPageContent } from "@/shared/sections";

/** 병원 홈페이지 세부 페이지 문구 (기획서 기능·패키지 기준, 판매용으로 다듬음) */
export const hospitalWebsiteSales: SalesPageContent = {
  path: routes.hospital.website,
  name: "사피어 병원 홈페이지",
  message: "AI 검색 최적화 기본 세팅이 들어간 병원 홈페이지를 만들고, 납품 뒤 관리까지 맡습니다.",
  parent: { label: "병원 솔루션", href: routes.hospital.root },
  headline: ["AI 검색에 강한", "병원 홈페이지"],
  lead: "기본형부터 AI 검색 최적화 기본 세팅이 들어갑니다. 네이버 예약·카카오 채널 연결까지 한 번에 맡기세요.",
  points: ["기본형 3~4주 제작", "AI 검색 기본 세팅 포함", "기본형은 바로 결제"],
  problems: [
    "진단 점수가 낮은데 직접 고치기 어렵다",
    "예약·상담으로 이어지는 홈페이지가 필요하다",
    "만든 뒤 관리해 줄 곳이 없다",
  ],
  features: [
    {
      title: "AI 검색 기본 세팅",
      detail: "기본형부터 AI 검색 최적화 기본 세팅을 넣어 만듭니다.",
    },
    {
      title: "예약·채널 연결",
      detail: "검색 등록, GA4, 네이버 예약·카카오 채널까지 연결합니다.",
    },
    {
      title: "진료항목별 페이지",
      detail: "표준형은 진료항목별 페이지와 예약·상담 동선, 구조화데이터를 갖춥니다.",
    },
    { title: "의료광고 문구 점검", detail: "표준형부터 의료광고 문구를 점검해 드립니다." },
    {
      title: "맞춤 디자인·다국어",
      detail: "프리미엄은 맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장까지.",
    },
    {
      title: "납품 뒤 월 관리",
      detail: "GEO 관리형 또는 단순 유지보수로 계속 관리합니다.",
    },
  ],
  screens: ["제작 사례 화면 · 메인", "제작 사례 화면 · 진료 안내"],
  cases: [
    { title: "피부과 웹", href: routes.portfolioDetail("derma-clinic-web") },
    { title: "내과 웹", href: routes.portfolioDetail("internal-clinic-web") },
    { title: "병원 컨설팅 웹", href: routes.portfolioDetail("hospital-consulting-web") },
  ],
  process: [
    { step: "상담", detail: "병원 상황을 듣고 맞는 패키지를 정합니다." },
    { step: "계약", detail: "패키지를 고르고 계약합니다. 기본형은 바로 결제할 수 있습니다." },
    { step: "제작", detail: "패키지별 기간에 맞춰 만듭니다." },
    { step: "납품", detail: "완성된 홈페이지를 넘겨드립니다." },
    { step: "관리", detail: "GEO 관리형 또는 단순 유지보수를 고릅니다." },
  ],
  faq: faqForService("hospital-website"),
  cta: { label: "제작 상담", href: routes.contactFor("hospital-website") },
  secondaryCta: { label: "기본형 바로 결제", href: routes.order("web-basic") },
  closing: {
    title: "우리 병원에 맞는 패키지를 골라 드릴게요",
    text: "상담은 무료입니다. 기본형은 상담 없이 바로 결제할 수도 있습니다.",
  },
};
