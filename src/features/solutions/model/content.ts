import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const solutionsOverviewContent = {
  closing: {
    title: "어떤 솔루션이 맞을지 모르겠다면",
    description: "지금 일하는 방식을 들려주시면 맞는 솔루션이나 개발 범위를 안내해 드립니다.",
  },
  title: "비즈니스 솔루션",
  lead: "반복해서 만들어 온 기능을 솔루션으로 갖췄습니다. 개발 대신 세팅으로 도입합니다.",
};

export const connectContent: SolutionPageContent = {
  path: routes.solutions.connect,
  eyebrow: "비즈니스 솔루션",
  name: "사피어 커머스 연동",
  message: "여러 마켓 재고·주문을 한곳에서",
  problems: ["마켓마다 재고와 주문을 따로 확인한다"],
  features: ["지원 마켓: 스마트스토어, 쿠팡, 카페24, 워드로브", "재고·주문 동기화"],
  screens: ["통합 재고·주문 화면"],
  cases: [{ title: "카페24 어드민 (12만 상품)", href: routes.portfolioDetail("cafe24-admin") }],
  process: [
    { step: "상담", detail: "쓰는 마켓과 상품 수를 확인합니다." },
    { step: "세팅", detail: "마켓 2곳을 연결합니다. 마켓 추가는 별도입니다." },
    { step: "운영", detail: "전용 서버에서 재고와 주문을 동기화합니다." },
  ],
  faq: faqForService("connect"),
  cta: { label: "도입 상담", href: routes.contactFor("connect") },
};

export const erpContent: SolutionPageContent = {
  path: routes.solutions.erp,
  eyebrow: "비즈니스 솔루션",
  name: "사피어 업무 통합 ERP",
  message: "흩어진 엑셀을 하나의 시스템으로",
  problems: ["재고·발주·정산이 여러 엑셀에 흩어져 있다"],
  features: ["재고·발주·정산 통합", "한 번에 바꾸지 않고 단계적으로 전환", "기존 엑셀 데이터 이관"],
  screens: ["ERP 화면"],
  cases: [
    { title: "엑셀 30개 통합" },
    { title: "병원 ERP", href: routes.portfolioDetail("hospital-erp-1") },
  ],
  process: [
    { step: "1단계 진단·설계", detail: "지금 쓰는 엑셀과 업무를 정리합니다." },
    { step: "구축 견적", detail: "진단 결과로 범위와 금액을 정합니다." },
    { step: "단계적 전환", detail: "업무 단위로 나눠 옮깁니다." },
    { step: "데이터 이관", detail: "기존 엑셀 데이터를 옮깁니다." },
  ],
  faq: faqForService("erp"),
  cta: { label: "1단계 진단 신청", href: routes.contactFor("erp") },
};

export const aiChatbotContent: SolutionPageContent = {
  path: routes.solutions.aiChatbot,
  eyebrow: "비즈니스 솔루션",
  name: "사피어 AI 챗봇",
  message: "사내 문서로 답하는 AI",
  problems: ["사내 문서에 있는 답을 찾는 데 시간이 걸린다"],
  features: ["사내 문서로 답변", "폐쇄망 설치 가능", "PoC로 확인한 뒤 확장"],
  screens: ["챗봇 대화 화면"],
  cases: [
    { title: "감정 AI 코칭", href: routes.portfolioDetail("emotion-ai-coaching") },
    { title: "AI 예측 플랫폼", href: routes.portfolioDetail("sports-ai-prediction") },
  ],
  process: [
    { step: "PoC 신청", detail: "대상 문서와 질문 범위를 정합니다." },
    { step: "PoC", detail: "작은 범위로 먼저 만들어 확인합니다." },
    { step: "확장", detail: "범위를 넓혀 도입합니다." },
  ],
  faq: faqForService("ai-chatbot"),
  cta: { label: "PoC 신청", href: routes.contactFor("ai-chatbot") },
};

/** 요금표 아래 한 줄 */
export const pricingCaptions = {
  erp: "구축은 1단계 진단 후 견적을 드리고, 단계별로 계약합니다.",
  aiChatbot: "AI API 사용량은 별도로 정산합니다.",
};
