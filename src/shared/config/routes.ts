import type { Route } from "next";

/**
 * 모든 내부 경로는 여기서만 정의합니다. 화면 코드에 문자열 경로를 직접 쓰지 않습니다.
 * typedRoutes가 켜져 있어서 실제로 없는 경로를 적으면 타입 오류가 납니다.
 * 동적 경로는 함수로 만들고 반환 타입을 Route로 둡니다.
 */
export const routes = {
  home: "/",
  hospital: {
    root: "/hospital",
    website: "/hospital/website",
    geo: "/geo",
    adCheck: "/geo/ad-check",
    crm: "/crm",
  },
  solutions: {
    root: "/solutions",
    connect: "/connect",
    erp: "/erp",
    aiChatbot: "/ai-chatbot",
  },
  development: {
    root: "/development",
    process: "/process",
    estimate: "/estimate",
  },
  portfolio: "/portfolio",
  portfolioDetail: (slug: string) => `/portfolio/${slug}` as Route,
  pricing: "/pricing",
  contact: "/contact",
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
