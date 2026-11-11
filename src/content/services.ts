import type { Route } from "next";

/** 서비스 목록 (기획서 "서비스별 페이지 구성"). 모든 서비스는 "사피어 + 기능명"으로 부른다. */
export type ServiceLine = "hospital" | "business";

export type Service = {
  id: "geo" | "ad-check" | "hospital-website" | "crm" | "connect" | "erp" | "ai-chatbot";
  line: ServiceLine;
  name: string;
  href: Route;
  message: string;
  highlights: string[];
  nextAction: string;
  evidence: string[];
};

export const serviceLines: Record<ServiceLine, { name: string; description: string }> = {
  hospital: {
    name: "병원 솔루션",
    description: "AI 검색 최적화, 병원 홈페이지, 병원 CRM을 대표 라인으로 세웁니다.",
  },
  business: {
    name: "비즈니스 솔루션",
    description: "커머스 연동, 업무 통합 ERP, AI 챗봇을 두 번째 라인으로 둡니다.",
  },
};

export const services: Service[] = [
  {
    id: "geo",
    line: "hospital",
    name: "사피어 AI 검색 최적화",
    href: "/geo",
    message: "ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인",
    highlights: ["주소 입력창", "8개 분야 50여 항목", "샘플 리포트", "등급별 요금"],
    nextAction: "무료 진단하기",
    evidence: ["자체 서비스"],
  },
  {
    id: "ad-check",
    line: "hospital",
    name: "사피어 의료광고 검사기",
    href: "/geo/ad-check",
    message: "의료법 제56조 위험 표현을 미리 찾아드립니다",
    highlights: ["문구 입력창", "결과", "법률 자문 아님 고지"],
    nextAction: "무료 검사하기",
    evidence: ["자체 서비스"],
  },
  {
    id: "hospital-website",
    line: "hospital",
    name: "사피어 병원 홈페이지",
    href: "/hospital/website",
    message: "AI 검색에 강한 병원 홈페이지",
    highlights: ["기본형·표준형·프리미엄 패키지", "제작 사례", "관리 구독"],
    nextAction: "제작 상담 / 기본형 결제",
    evidence: ["피부과·내과 웹", "병원 컨설팅 웹"],
  },
  {
    id: "crm",
    line: "hospital",
    name: "사피어 병원 CRM",
    href: "/hospital/crm",
    message: "한 번 온 환자가 다시 오게",
    highlights: [
      "환자 분류",
      "리콜·사후관리 메시지",
      "재진율 대시보드",
      "병원별 전용 서버·데이터 분리",
    ],
    nextAction: "데모 신청",
    evidence: ["병원 ERP 2건"],
  },
  {
    id: "connect",
    line: "business",
    name: "사피어 커머스 연동",
    href: "/solutions/connect",
    message: "여러 마켓 재고·주문을 한곳에서",
    highlights: ["지원 마켓(스마트스토어·쿠팡·카페24·워드로브)", "동기화 방식"],
    nextAction: "도입 상담",
    evidence: ["카페24 어드민(12만 상품)"],
  },
  {
    id: "erp",
    line: "business",
    name: "사피어 업무 통합 ERP",
    href: "/solutions/erp",
    message: "흩어진 엑셀을 하나의 시스템으로",
    highlights: ["재고·발주·정산", "단계적 전환", "데이터 이관"],
    nextAction: "1단계 진단 신청",
    evidence: ["엑셀 30개 통합", "병원 ERP"],
  },
  {
    id: "ai-chatbot",
    line: "business",
    name: "사피어 AI 챗봇",
    href: "/solutions/ai-chatbot",
    message: "사내 문서로 답하는 AI",
    highlights: ["문서 기반 답변", "폐쇄망 설치 가능", "PoC 후 확장"],
    nextAction: "PoC 신청",
    evidence: ["감정 AI 코칭", "AI 예측 플랫폼"],
  },
];

export function listServices(line?: ServiceLine) {
  return line ? services.filter((s) => s.line === line) : services;
}
