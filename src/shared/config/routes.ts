import type { Route } from "next";

/** 문의 유형을 미리 골라 두고 문의 페이지로 보낼 때 쓰는 값 (/contact?type=...) */
export type ContactTopic =
  | "geo-fix"
  | "hospital-website"
  | "crm-demo"
  | "crm-adopt"
  | "hospital-bundle"
  | "connect"
  | "erp"
  | "ai-chatbot";

const contactTopicValues: readonly string[] = [
  "geo-fix",
  "hospital-website",
  "crm-demo",
  "crm-adopt",
  "hospital-bundle",
  "connect",
  "erp",
  "ai-chatbot",
] satisfies ContactTopic[];

export function isContactTopic(value: string | undefined): value is ContactTopic {
  return value !== undefined && contactTopicValues.includes(value);
}

/**
 * 모든 내부 경로는 여기서만 정의합니다. 화면 코드에 문자열 경로를 직접 쓰지 않습니다.
 * typedRoutes가 켜져 있어서 실제로 없는 경로를 적으면 타입 오류가 납니다.
 * 동적 경로는 함수로 만들고 반환 타입을 Route로 둡니다.
 * 주소는 메뉴 구조를 따른다 (상위 메뉴/페이지). 예외: /geo는 기존 saffirgeo 주소를 옮겨 온 것이라 최상위에 둔다.
 */
export const routes = {
  home: "/",
  hospital: {
    root: "/hospital",
    website: "/hospital/website",
    geo: "/geo",
    adCheck: "/geo/ad-check",
    crm: "/hospital/crm",
  },
  solutions: {
    root: "/solutions",
    connect: "/solutions/connect",
    erp: "/solutions/erp",
    aiChatbot: "/solutions/ai-chatbot",
  },
  development: {
    root: "/development",
    process: "/development/process",
    estimate: "/development/estimate",
  },
  about: "/about",
  portfolio: "/portfolio",
  portfolioDetail: (slug: string) => `/portfolio/${slug}` as Route,
  pricing: "/pricing",
  contact: "/contact",
  /** 문의 유형을 미리 선택한 문의 페이지 */
  contactFor: (topic: ContactTopic) => `/contact?type=${topic}` as Route,
  /** 주문서 (요금표의 결제 버튼) */
  order: (planId: string) => `/order?plan=${planId}` as Route,
  /** 토스 결제창이 돌아오는 주소 (successUrl, failUrl) */
  orderComplete: "/order/complete",
  orderFail: "/order/fail",
  faq: "/faq",
  legal: {
    terms: "/terms",
    privacy: "/privacy",
    refund: "/refund",
    security: "/security",
  },
  /** 내부 검토용 (운영 환경에서는 404) */
  internal: {
    plan: "/internal/plan",
  },
  auth: {
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    /** 계약 고객 포털 초대 수락 */
    invite: "/invite",
    resetPassword: "/reset-password",
    /** 가입 후 next로 돌아간다 (예: 방금 본 진단 결과) */
    signupFrom: (next: string) => `/signup?next=${encodeURIComponent(next)}` as Route,
    /** 로그인 후 next로 돌아간다 */
    loginFrom: (next: string) => `/login?next=${encodeURIComponent(next)}` as Route,
  },
  portal: {
    home: "/dashboard",
    projects: "/dashboard/projects",
    project: (id: string) => `/dashboard/projects/${id}` as Route,
    reports: "/dashboard/reports",
    requests: "/dashboard/requests",
    solutions: "/dashboard/solutions",
    geo: "/dashboard/geo",
    billing: "/dashboard/billing",
    account: "/dashboard/account",
  },
} as const;

/**
 * 로그인 후 돌아갈 주소처럼 바깥에서 받은 경로를 사이트 안 경로로만 허용한다.
 * "//다른사이트" 같은 주소는 fallback으로 바꾼다.
 */
export function toInternalRoute(path: string | undefined, fallback: Route): Route {
  return path && path.startsWith("/") && !path.startsWith("//") && !path.includes("\\")
    ? (path as Route)
    : fallback;
}
