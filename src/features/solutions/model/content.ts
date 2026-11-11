import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const solutionsOverviewContent = {
  title: "비즈니스 솔루션",
  lead: "외주에서 반복해서 만든 기능을 솔루션으로 올렸습니다. 개발이 아니라 세팅으로 도입합니다.",
};

export const connectContent: SolutionPageContent = {
  eyebrow: "비즈니스 솔루션",
  name: "사피어 커머스 연동",
  message: "여러 마켓 재고·주문을 한곳에서",
  problems: ["여러 마켓의 재고와 주문을 마켓마다 따로 관리하고 있습니다."],
  features: ["지원 마켓: 스마트스토어, 쿠팡, 카페24, 워드로브", "재고·주문 동기화"],
  demo: [],
  cases: [{ title: "카페24 어드민 (12만 상품)", href: routes.portfolioDetail("cafe24-admin") }],
  pricingNotes: ["마켓 추가 시 세팅비 별도"],
  process: ["도입 상담", "마켓 연결·세팅 (기본 2곳)", "전용 서버에서 운영 (월 이용료)"],
  faq: [],
  cta: { label: "도입 상담", href: routes.contact },
};

export const erpContent: SolutionPageContent = {
  eyebrow: "비즈니스 솔루션",
  name: "사피어 업무 통합 ERP",
  message: "흩어진 엑셀을 하나의 시스템으로",
  problems: ["재고·발주·정산 데이터가 여러 엑셀 파일에 흩어져 있습니다."],
  features: ["재고·발주·정산", "단계적 전환", "데이터 이관"],
  demo: [],
  cases: [
    { title: "엑셀 30개 통합" },
    { title: "병원 ERP", href: routes.portfolioDetail("hospital-erp-1") },
  ],
  pricingNotes: ["1단계 진단·설계 후 구축 견적을 드리고, 단계별로 계약합니다."],
  process: ["1단계 진단·설계", "구축 견적", "단계별 계약·단계적 전환", "데이터 이관"],
  faq: [],
  cta: { label: "1단계 진단 신청", href: routes.contact },
};

export const aiChatbotContent: SolutionPageContent = {
  eyebrow: "비즈니스 솔루션",
  name: "사피어 AI 챗봇",
  message: "사내 문서로 답하는 AI",
  problems: ["사내 문서에 있는 답을 찾는 데 시간이 걸립니다."],
  features: ["문서 기반 답변", "폐쇄망 설치 가능", "PoC 후 확장"],
  demo: [],
  cases: [
    { title: "감정 AI 코칭", href: routes.portfolioDetail("emotion-ai-coaching") },
    { title: "AI 예측 플랫폼", href: routes.portfolioDetail("sports-ai-prediction") },
  ],
  pricingNotes: ["AI API 사용량은 별도로 정산합니다."],
  process: ["PoC 신청", "PoC 진행", "확장 도입"],
  faq: [],
  cta: { label: "PoC 신청", href: routes.contact },
};
