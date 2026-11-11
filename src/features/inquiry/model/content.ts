import type { Route } from "next";
import { routes, type ContactTopic } from "@/shared/config";

/** 문의 유형. topic이 있으면 다른 페이지 버튼에서 미리 골라 보낼 수 있다 (/contact?type=topic) */
export const contactTypes: { topic?: ContactTopic; label: string; href: Route }[] = [
  { topic: "geo-fix", label: "병원 무료 진단 후 개선 상담", href: routes.hospital.geo },
  { topic: "hospital-website", label: "병원 홈페이지 제작 상담", href: routes.hospital.website },
  { topic: "crm-demo", label: "병원 CRM 데모 신청", href: routes.hospital.crm },
  { topic: "crm-adopt", label: "병원 CRM 도입 신청", href: routes.hospital.crm },
  { topic: "hospital-bundle", label: "병원 성장 패키지 상담", href: `${routes.pricing}#bundle` },
  { topic: "connect", label: "커머스 연동 도입 상담", href: routes.solutions.connect },
  { topic: "erp", label: "업무 통합 ERP 1단계 진단 신청", href: routes.solutions.erp },
  { topic: "ai-chatbot", label: "AI 챗봇 PoC 신청", href: routes.solutions.aiChatbot },
  { label: "맞춤 개발 견적 요청", href: routes.development.estimate },
  { label: "기타 문의", href: routes.contact },
];

export const contactTypeLabels = contactTypes.map((t) => t.label);

/** ?type= 값 → 미리 고를 문의 유형 이름. 모르는 값이면 빈 값 */
export function contactTypeLabelFor(topic: string | null) {
  return contactTypes.find((t) => t.topic && t.topic === topic)?.label ?? "";
}

/** 접수 후 회신 예상 시간 (안) */
const replyTime = "영업일 1일 이내";

export const developmentAreaOptions = ["웹·앱", "쇼핑몰", "플랫폼 연동", "AI", "IoT", "기타"];

/** 예산 범위 선택지 (안) */
export const budgetOptions = [
  "1,000만 원 미만",
  "1,000만~3,000만 원",
  "3,000만~5,000만 원",
  "5,000만 원 이상",
  "아직 모르겠어요",
];

/** 개인정보 수집·이용 동의 문구. 보관 기간은 개인정보처리방침과 함께 확정 */
export const consentText =
  "개인정보 수집·이용에 동의합니다. 수집 항목: 이름, 연락처, 문의 내용 · 목적: 상담 회신 · 보관 기간: [ 보관 기간 ]";

export type DoneContent = {
  title: string;
  description: string;
  steps: { step: string; detail: string }[];
};

export const contactContent = {
  title: "문의",
  lead: "필요한 상담을 고르고 내용을 남겨 주세요.",
  done: {
    title: "문의가 접수됐습니다",
    description: `${replyTime}에 남겨 주신 연락처로 연락드립니다.`,
    steps: [
      { step: "상담", detail: "지금 상황과 필요한 것을 확인합니다." },
      { step: "제안·견적", detail: "맞는 솔루션이나 개발 범위와 금액을 안내합니다." },
      { step: "계약·결제", detail: "계약 후 세팅비나 계약금을 결제합니다." },
      { step: "포털 계정", detail: "진행 현황과 청구를 포털에서 확인합니다." },
    ],
  } satisfies DoneContent,
};

export const estimateContent = {
  title: "견적 요청",
  lead: "정찰가 패키지에 없는 개발은 견적으로 안내해 드립니다.",
  done: {
    title: "견적 요청이 접수됐습니다",
    description: `내용을 검토한 뒤 ${replyTime}에 연락드립니다.`,
    steps: [
      { step: "검토", detail: "요구사항을 보고 필요하면 추가로 여쭙습니다." },
      { step: "견적서", detail: "범위, 일정, 금액을 정리해 보내 드립니다." },
      { step: "계약·계약금", detail: "계약 후 계약금을 결제하면 착수합니다." },
      { step: "포털 계정", detail: "주간 보고와 진행 현황을 포털에서 봅니다." },
    ],
  } satisfies DoneContent,
};
