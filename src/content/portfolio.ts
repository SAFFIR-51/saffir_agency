import type { Route } from "next";

/** 포트폴리오 20건, 5개 묶음 (기획서 "맞춤 개발과 포트폴리오") */
export type PortfolioGroup = "medical" | "commerce" | "ai" | "iot" | "app";
export type Tech = "web" | "app" | "ai" | "iot" | "erp";

export type PortfolioItem = {
  slug: string;
  title: string;
  group: PortfolioGroup;
  tech: Tech[];
  /** 이 사례와 연결되는 솔루션 페이지 경로 ("이 기능을 솔루션으로 도입하기") */
  relatedSolution?: Route;
};

export const portfolioGroups: Record<PortfolioGroup, string> = {
  medical: "의료·헬스케어",
  commerce: "커머스",
  ai: "AI 서비스",
  iot: "IoT·하드웨어",
  app: "앱·게임·콘텐츠",
};

/** TODO: 실제 프로젝트명·이미지·성과로 채우기. 우선 기획서 목록만 옮겼습니다. */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "hospital-erp-1",
    title: "병원 ERP 1",
    group: "medical",
    tech: ["erp", "web"],
    relatedSolution: "/crm",
  },
  {
    slug: "hospital-erp-2",
    title: "병원 ERP 2",
    group: "medical",
    tech: ["erp", "web"],
    relatedSolution: "/crm",
  },
  {
    slug: "derma-clinic-web",
    title: "피부과 웹",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  {
    slug: "internal-clinic-web",
    title: "내과 웹",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  {
    slug: "hospital-consulting-web",
    title: "병원 컨설팅 웹",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  { slug: "tinnitus-mental-app", title: "이명·멘탈 앱", group: "medical", tech: ["app", "ai"] },
  { slug: "hearing-health-app", title: "청각 건강 앱", group: "medical", tech: ["app"] },
  {
    slug: "emotion-ai-coaching",
    title: "감정 AI 코칭 앱",
    group: "medical",
    tech: ["app", "ai"],
    relatedSolution: "/ai-chatbot",
  },
  {
    slug: "cafe24-admin",
    title: "카페24 어드민 (12만 상품)",
    group: "commerce",
    tech: ["web"],
    relatedSolution: "/connect",
  },
  { slug: "cosmetics-shop-app", title: "화장품 쇼핑몰 앱", group: "commerce", tech: ["app"] },
  { slug: "side-dish-order", title: "반찬 주문", group: "commerce", tech: ["web", "app"] },
  { slug: "group-buying-platform", title: "공동소비 플랫폼", group: "commerce", tech: ["web"] },
  { slug: "cosmetics-oem-web", title: "화장품 OEM 웹", group: "commerce", tech: ["web"] },
  {
    slug: "sports-ai-prediction",
    title: "스포츠 AI 예측 (구독형)",
    group: "ai",
    tech: ["web", "ai"],
    relatedSolution: "/ai-chatbot",
  },
  { slug: "vivarium-ai-behavior", title: "사육장 AI 행동 분석", group: "ai", tech: ["ai", "iot"] },
  { slug: "vivarium-iot-camera", title: "사육장 IoT 카메라", group: "iot", tech: ["iot"] },
  { slug: "smart-planter-ble", title: "스마트 화분 BLE", group: "iot", tech: ["iot", "app"] },
  { slug: "reptile-care-app", title: "파충류 관리 앱", group: "iot", tech: ["app"] },
  { slug: "pixel-rpg", title: "픽셀 RPG", group: "app", tech: ["app"] },
  { slug: "mentoring-app", title: "멘토링 앱", group: "app", tech: ["app"] },
];

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export const techLabels: Record<Tech, string> = {
  web: "웹",
  app: "앱",
  ai: "AI",
  iot: "IoT",
  erp: "ERP",
};

/** 업종 필터 (기획서: 의료, 커머스, 라이프스타일 등) */
export const industryFilters = ["의료", "커머스", "라이프스타일"];
