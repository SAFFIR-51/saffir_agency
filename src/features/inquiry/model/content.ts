import { routes } from "@/shared/config";

export const estimateContent = {
  title: "견적 요청",
  lead: "정찰가 패키지에 없는 맞춤형 개발은 견적 요청으로 받습니다.",
  /** 입력 항목 (안) — 폼은 react-hook-form으로 구현 예정 */
  fields: [
    "회사명",
    "담당자 이름",
    "연락처",
    "개발 분야 (웹·앱 / 쇼핑몰 / 플랫폼 연동 / AI / IoT)",
    "예산 범위",
    "희망 일정",
    "요구사항",
    "개인정보 수집·이용 동의",
  ],
};

export const contactContent = {
  title: "문의",
  lead: "어떤 상담이 필요한지 골라 주세요.",
  /** 문의 유형 (안) — 각 서비스 페이지의 다음 행동 버튼과 같다 */
  types: [
    { label: "병원 무료 진단 후 개선 상담", href: routes.hospital.geo },
    { label: "병원 홈페이지 제작 상담", href: routes.hospital.website },
    { label: "병원 CRM 데모 신청", href: routes.hospital.crm },
    { label: "커머스 연동 도입 상담", href: routes.solutions.connect },
    { label: "업무 통합 ERP 1단계 진단 신청", href: routes.solutions.erp },
    { label: "AI 챗봇 PoC 신청", href: routes.solutions.aiChatbot },
    { label: "맞춤 개발 견적 요청", href: routes.development.estimate },
  ],
  fields: [
    "병원명 또는 회사명",
    "담당자 이름",
    "연락처",
    "문의 유형",
    "문의 내용",
    "개인정보 수집·이용 동의",
  ],
};
