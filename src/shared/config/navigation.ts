import type { Route } from "next";
import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: Route;
  /** 메뉴에 덧붙이는 한 줄 설명 */
  description?: string;
  children?: NavItem[];
};

/** 기획서의 서비스 갈래와 공개 페이지 */
export const mainNav: NavItem[] = [
  {
    label: "병원 솔루션",
    href: routes.hospital.root,
    description: "AI 검색 진단부터 홈페이지, 환자 관리까지",
    children: [
      {
        label: "사피어 AI 검색 최적화",
        href: routes.hospital.geo,
        description: "ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인",
      },
      {
        label: "사피어 의료광고 검사기",
        href: routes.hospital.adCheck,
        description: "의료법 제56조 위험 표현을 미리 확인 (무료)",
      },
      {
        label: "사피어 병원 홈페이지",
        href: routes.hospital.website,
        description: "AI 검색에 강한 병원 홈페이지 제작",
      },
      {
        label: "사피어 병원 CRM",
        href: routes.hospital.crm,
        description: "한 번 온 환자가 다시 오게",
      },
    ],
  },
  {
    label: "비즈니스 솔루션",
    href: routes.solutions.root,
    description: "반복해 온 기능을 개발 대신 세팅으로 도입",
    children: [
      {
        label: "사피어 커머스 연동",
        href: routes.solutions.connect,
        description: "여러 마켓 재고·주문을 한곳에서",
      },
      {
        label: "사피어 업무 통합 ERP",
        href: routes.solutions.erp,
        description: "흩어진 엑셀을 하나의 시스템으로",
      },
      {
        label: "사피어 AI 챗봇",
        href: routes.solutions.aiChatbot,
        description: "사내 문서로 답하는 AI",
      },
    ],
  },
  {
    label: "맞춤 개발",
    href: routes.development.root,
    description: "웹·앱, 쇼핑몰, 플랫폼 연동, AI, IoT를 만들고 운영까지",
    children: [
      {
        label: "개발 프로세스",
        href: routes.development.process,
        description: "6단계 진행과 포털에서 확인하는 방법",
      },
      {
        label: "견적 요청",
        href: routes.development.estimate,
        description: "정찰가에 없는 개발은 견적으로 안내",
      },
    ],
  },
  {
    label: "포트폴리오",
    href: routes.portfolio,
    description: "분야별 프로젝트 사례와 관련 솔루션",
  },
  { label: "요금 안내", href: routes.pricing, description: "모든 서비스 요금 공개 (VAT 포함)" },
];

type HeaderQuickLink = { label: string; href: Route; description: string };

const headerQuickLinks: Partial<Record<Route, readonly HeaderQuickLink[]>> = {
  [routes.hospital.root]: [
    {
      label: "병원 솔루션 데모",
      href: routes.contactFor("crm-demo"),
      description: "환자 관리와 재방문 관리에 쓰이는 CRM 데모를 신청하세요.",
    },
    {
      label: "병원 홈페이지 요금제",
      href: `${routes.pricing}#hospital-website`,
      description: "병원 홈페이지 제작 패키지와 비용을 확인하세요.",
    },
  ],
  [routes.solutions.root]: [
    {
      label: "비즈니스 데모",
      href: routes.contactFor("business-demo"),
      description: "커머스 연동, ERP, AI 챗봇 중 필요한 솔루션의 데모를 신청하세요.",
    },
    {
      label: "비즈니스 솔루션 요금제",
      href: `${routes.pricing}#solutions`,
      description: "솔루션별 초기 세팅비와 월 이용료를 확인하세요.",
    },
  ],
  [routes.development.root]: [
    {
      label: "맞춤 개발 상담",
      href: routes.development.estimate,
      description: "필요한 기능과 개발 범위를 알려주세요.",
    },
    {
      label: "맞춤 개발 요금제",
      href: `${routes.pricing}#development`,
      description: "홈페이지 제작과 웹앱 개발의 계약금 기준을 확인하세요.",
    },
  ],
};

/** 기획서의 메뉴를 데스크톱과 모바일 헤더에서 함께 쓴다. */
export const headerNav = mainNav.map((item) => ({
  ...item,
  children: item.children
    ? [
        { label: `${item.label} 소개`, href: item.href },
        ...item.children.map((child) => ({ ...child, label: child.label.replace(/^사피어 /, "") })),
      ]
    : undefined,
  quickLinks: headerQuickLinks[item.href] ?? [],
}));

/** 하단 사이트맵에 서비스 갈래와 회사·정책 링크를 표시한다. */
export type FooterGroup = { title: string; href?: Route; items: NavItem[] };

const policyNav: NavItem[] = [
  { label: "이용약관", href: routes.legal.terms },
  { label: "개인정보처리방침", href: routes.legal.privacy },
  { label: "취소 및 환불 규정", href: routes.legal.refund },
  { label: "보안·데이터 정책", href: routes.legal.security },
];

export const footerGroups: FooterGroup[] = [
  ...mainNav
    .filter((item) => item.children)
    .map((item) => ({ title: item.label, href: item.href, items: item.children ?? [] })),
  {
    title: "회사",
    items: [
      { label: "회사 소개", href: routes.about },
      { label: "포트폴리오", href: routes.portfolio },
      { label: "요금 안내", href: routes.pricing },
      { label: "FAQ", href: routes.faq },
      { label: "문의", href: routes.contact },
    ],
  },
  { title: "정책", items: policyNav },
];

/** 하단(간단형): 주요 메뉴 한 줄 + 정책 링크 */
export const footerNav: NavItem[] = [
  ...mainNav.map(({ label, href }) => ({ label, href })),
  { label: "FAQ", href: routes.faq },
  { label: "문의", href: routes.contact },
];

export const footerPolicyNav: NavItem[] = policyNav;

/**
 * 포털 회원 종류 (기획서 "회원 유형"을 가입한 서비스 기준으로 나눔).
 * 한 고객사가 여러 개를 가질 수 있다 (예: 외주 + GEO 구독).
 */
export type MemberKind = "member" | "subscriber" | "project" | "solution";

export const memberKindLabels: Record<MemberKind, string> = {
  member: "일반 회원",
  subscriber: "GEO 구독",
  project: "외주 고객",
  solution: "솔루션 고객",
};

/** 포털 메뉴. audience가 없으면 모두에게, 있으면 그중 하나라도 가진 회원에게 보인다 */
export type PortalNavItem = NavItem & { audience?: MemberKind[] };

export const portalNav: PortalNavItem[] = [
  { label: "홈", href: routes.portal.home },
  { label: "프로젝트", href: routes.portal.projects, audience: ["project"] },
  { label: "작업 보고", href: routes.portal.reports, audience: ["project"] },
  { label: "요청·문의", href: routes.portal.requests, audience: ["project", "solution"] },
  { label: "내 솔루션", href: routes.portal.solutions, audience: ["solution"] },
  { label: "GEO", href: routes.portal.geo },
  {
    label: "청구·결제",
    href: routes.portal.billing,
    audience: ["subscriber", "project", "solution"],
  },
  { label: "계정", href: routes.portal.account },
];

export function isPortalMenuVisible(item: PortalNavItem, kinds: readonly MemberKind[]) {
  return !item.audience || item.audience.some((kind) => kinds.includes(kind));
}

/** 주소로 포털 메뉴를 찾아 이 회원에게 보이는지 확인한다 (메뉴에 없는 주소는 모두에게 보임) */
export function canSeePortalMenu(href: string, kinds: readonly MemberKind[]) {
  const item = portalNav.find((menu) => menu.href === href);
  return !item || isPortalMenuVisible(item, kinds);
}

/** 이 메뉴를 볼 수 있는 회원 종류 이름 (접근 안내 문구용) */
export function portalMenuAudienceLabel(href: string) {
  const item = portalNav.find((menu) => menu.href === href);
  return item?.audience?.map((kind) => memberKindLabels[kind]).join(", ") ?? "모든 회원";
}
