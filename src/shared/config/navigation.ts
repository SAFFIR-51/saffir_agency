import type { Route } from "next";
import { routes } from "./routes";

export type NavItem = { label: string; href: Route; children?: NavItem[] };

/** 상단 메뉴 5개 (기획서: 병원 솔루션, 비즈니스 솔루션, 맞춤 개발, 포트폴리오, 요금 안내) */
export const mainNav: NavItem[] = [
  {
    label: "병원 솔루션",
    href: routes.hospital.root,
    children: [
      { label: "사피어 AI 검색 최적화", href: routes.hospital.geo },
      { label: "사피어 의료광고 검사기", href: routes.hospital.adCheck },
      { label: "사피어 병원 홈페이지", href: routes.hospital.website },
      { label: "사피어 병원 CRM", href: routes.hospital.crm },
    ],
  },
  {
    label: "비즈니스 솔루션",
    href: routes.solutions.root,
    children: [
      { label: "사피어 커머스 연동", href: routes.solutions.connect },
      { label: "사피어 업무 통합 ERP", href: routes.solutions.erp },
      { label: "사피어 AI 챗봇", href: routes.solutions.aiChatbot },
    ],
  },
  {
    label: "맞춤 개발",
    href: routes.development.root,
    children: [
      { label: "개발 프로세스", href: routes.development.process },
      { label: "견적 요청", href: routes.development.estimate },
    ],
  },
  { label: "포트폴리오", href: routes.portfolio },
  { label: "요금 안내", href: routes.pricing },
];

export const utilityNav: NavItem[] = [
  { label: "문의", href: routes.contact },
  { label: "로그인", href: routes.auth.login },
];

export const footerNav: NavItem[] = [
  { label: "이용약관", href: routes.legal.terms },
  { label: "개인정보처리방침", href: routes.legal.privacy },
  { label: "취소 및 환불 규정", href: routes.legal.refund },
  { label: "보안·데이터 정책", href: routes.legal.security },
  { label: "FAQ", href: routes.faq },
];

/** 포털 메뉴. requires 값으로 가입한 서비스에 따라 보이거나 숨깁니다. */
export type PortalNavItem = NavItem & {
  requires?: "client" | "subscriber" | "solution";
};

export const portalNav: PortalNavItem[] = [
  { label: "홈", href: routes.portal.home },
  { label: "프로젝트", href: routes.portal.projects, requires: "client" },
  { label: "작업 보고", href: routes.portal.reports, requires: "client" },
  { label: "요청·문의", href: routes.portal.requests, requires: "client" },
  { label: "내 솔루션", href: routes.portal.solutions, requires: "solution" },
  { label: "GEO", href: routes.portal.geo },
  { label: "청구·결제", href: routes.portal.billing },
  { label: "계정", href: routes.portal.account },
];
