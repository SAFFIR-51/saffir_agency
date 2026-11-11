import type { Route } from "next";
import { routes } from "@/shared/config";

type Field = {
  label: string;
  kind?: "text" | "textarea" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
};

export const estimateContent = {
  title: "견적 요청",
  lead: "정찰가 패키지에 없는 개발은 견적으로 안내해 드립니다.",
  fields: [
    { label: "회사명", required: true },
    { label: "담당자 이름", required: true },
    { label: "연락처", required: true, placeholder: "010-0000-0000" },
    { label: "개발 분야", kind: "select", placeholder: "웹·앱 / 쇼핑몰 / 플랫폼 연동 / AI / IoT" },
    { label: "예산 범위", kind: "select" },
    { label: "희망 일정" },
    { label: "요구사항", kind: "textarea", required: true },
    { label: "개인정보 수집·이용 동의", kind: "checkbox", required: true },
  ] satisfies Field[],
};

export const contactContent = {
  title: "문의",
  lead: "필요한 상담을 고르고 내용을 남겨 주세요.",
  types: [
    { label: "병원 무료 진단 후 개선 상담", href: routes.hospital.geo },
    { label: "병원 홈페이지 제작 상담", href: routes.hospital.website },
    { label: "병원 CRM 데모·도입 신청", href: routes.hospital.crm },
    { label: "커머스 연동 도입 상담", href: routes.solutions.connect },
    { label: "업무 통합 ERP 1단계 진단 신청", href: routes.solutions.erp },
    { label: "AI 챗봇 PoC 신청", href: routes.solutions.aiChatbot },
    { label: "맞춤 개발 견적 요청", href: routes.development.estimate },
  ] satisfies { label: string; href: Route }[],
  fields: [
    { label: "병원명 또는 회사명", required: true },
    { label: "담당자 이름", required: true },
    { label: "연락처", required: true, placeholder: "010-0000-0000" },
    { label: "문의 유형", kind: "select", required: true },
    { label: "문의 내용", kind: "textarea", required: true },
    { label: "개인정보 수집·이용 동의", kind: "checkbox", required: true },
  ] satisfies Field[],
};
