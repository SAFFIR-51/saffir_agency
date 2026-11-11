import type { Route } from "next";
import { routes } from "@/shared/config";

export const contactTypes = [
  { label: "병원 무료 진단 후 개선 상담", href: routes.hospital.geo },
  { label: "병원 홈페이지 제작 상담", href: routes.hospital.website },
  { label: "병원 CRM 데모·도입 신청", href: routes.hospital.crm },
  { label: "커머스 연동 도입 상담", href: routes.solutions.connect },
  { label: "업무 통합 ERP 1단계 진단 신청", href: routes.solutions.erp },
  { label: "AI 챗봇 PoC 신청", href: routes.solutions.aiChatbot },
  { label: "맞춤 개발 견적 요청", href: routes.development.estimate },
] satisfies { label: string; href: Route }[];

export const contactTypeLabels = contactTypes.map((t) => t.label);

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

export const contactContent = {
  title: "문의",
  lead: "필요한 상담을 고르고 내용을 남겨 주세요.",
  done: "문의가 접수됐습니다. 남겨 주신 연락처로 회신드리겠습니다.",
};

export const estimateContent = {
  title: "견적 요청",
  lead: "정찰가 패키지에 없는 개발은 견적으로 안내해 드립니다.",
  done: "견적 요청이 접수됐습니다. 내용을 검토한 뒤 연락드리겠습니다.",
};
