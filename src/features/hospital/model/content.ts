import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const hospitalOverviewContent = {
  title: "진단부터 환자 관리까지, 한 곳에서",
  lead: "AI 검색 진단, 홈페이지, 월 관리, 환자 관리를 이어서 맡길 수 있습니다.",
  services: "병원 솔루션 4가지",
  journey: "이렇게 이어집니다",
  bundle: "병원 성장 패키지",
};

export const hospitalWebsiteContent: SolutionPageContent = {
  path: routes.hospital.website,
  eyebrow: "병원 솔루션",
  name: "사피어 병원 홈페이지",
  message: "AI 검색에 강한 병원 홈페이지",
  problems: ["진단 점수가 낮은데 직접 고치기 어렵다", "예약·상담으로 이어지는 홈페이지가 필요하다"],
  features: [
    "기본형부터 AI 검색 최적화 기본 세팅 포함",
    "검색 등록, GA4, 네이버 예약·카카오 채널 연결",
    "진료항목별 페이지, 예약·상담 동선, 구조화데이터 (표준형)",
    "의료광고 문구 점검 (표준형)",
    "맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장 (프리미엄)",
    "납품 후 월 관리 구독",
  ],
  screens: ["제작 사례 화면"],
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
  faq: [],
  cta: { label: "제작 상담", href: routes.contactFor("hospital-website") },
  secondaryCta: { label: "기본형 결제", href: routes.order("web-basic") },
};
