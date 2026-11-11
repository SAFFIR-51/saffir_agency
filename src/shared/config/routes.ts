/** 모든 내부 경로는 여기서만 정의합니다. 화면 코드에 문자열 경로를 직접 쓰지 않습니다. */
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
  portfolioDetail: (slug: string) => `/portfolio/${slug}`,
  pricing: "/pricing",
  contact: "/contact",
  faq: "/faq",
  legal: {
    terms: "/terms",
    privacy: "/privacy",
    refund: "/refund",
    security: "/security",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
  portal: {
    home: "/dashboard",
    projects: "/dashboard/projects",
    project: (id: string) => `/dashboard/projects/${id}`,
    reports: "/dashboard/reports",
    requests: "/dashboard/requests",
    solutions: "/dashboard/solutions",
    geo: "/dashboard/geo",
    billing: "/dashboard/billing",
    account: "/dashboard/account",
  },
} as const;
