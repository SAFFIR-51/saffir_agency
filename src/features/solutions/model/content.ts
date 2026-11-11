import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const connectContent: SolutionPageContent = {
  name: "사피어 커머스 연동",
  message: "여러 마켓 재고·주문을 한곳에서",
  cta: { label: "도입 상담", href: routes.contact },
};

export const erpContent: SolutionPageContent = {
  name: "사피어 업무 통합 ERP",
  message: "흩어진 엑셀을 하나의 시스템으로",
  cta: { label: "1단계 진단 신청", href: routes.contact },
};

export const aiChatbotContent: SolutionPageContent = {
  name: "사피어 AI 챗봇",
  message: "사내 문서로 답하는 AI",
  cta: { label: "PoC 신청", href: routes.contact },
};
