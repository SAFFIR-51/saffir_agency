import type { Route } from "next";
import { routes } from "@/shared/config";

/** 메인 화면 문구 */
export const homeContent = {
  hero: {
    title: ["MAKE", "IT", "LAST"],
    description: [
      "견적은 투명하게,",
      "진행상황은 명확하게.",
      "개발부터 운영까지",
      "함께하는",
      "파트너, 사피어입니다.",
    ],
    learnMore: "View More",
  },
  entry: {
    lines: {
      hospital: {
        headline: ["HEALTHCARE", "SOLUTIONS"],
        image: "/images/home/service-healthcare.webp",
        description: "병원 홈페이지 진단부터 환자 관리까지 지원합니다.",
        start: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
      },
      business: {
        headline: ["BUSINESS", "SOLUTIONS"],
        image: "/images/home/service-business-orbits.webp",
        description: "재고·주문·업무를 관리하는 시스템을 구축합니다.",
        start: { label: "도입 상담", href: routes.contact },
      },
      development: {
        headline: ["CUSTOM", "DEVELOPMENT"],
        image: "/images/home/service-development-city-lights.webp",
        description: "필요한 서비스를 개발하고 운영까지 함께합니다.",
        start: { label: "견적 요청", href: routes.development.estimate },
      },
    } satisfies Record<
      string,
      {
        headline: [string, string];
        image: string;
        description: string;
        start: { label: string; href: Route };
      }
    >,
    more: "자세히 보기",
  },
  models: {
    title: "SERVICE",
    note: "구축형 솔루션의 데이터는 고객사 소유입니다.",
  },
  workflow: { title: "PROCESS", description: "만들고, 운영하고, 보여드립니다." },
  modules: { title: "MODULES", description: "보유 모듈을 활용해 구축 기간을 줄입니다." },
  cases: { title: "PORTFOLIO", all: "All About", detail: "View" },
  /** 분야가 겹치지 않게 고른 대표 사례. tag는 카드에 보이는 분야 표시 */
  featured: [
    { slug: "hospital-erp-1", tag: "업무 시스템 (ERP)" },
    { slug: "cafe24-admin", tag: "커머스 연동" },
    { slug: "smart-planter-ble", tag: "IoT" },
    { slug: "cosmetics-shop-app", tag: "커머스 앱" },
    { slug: "emotion-ai-coaching", tag: "AI 코칭 앱" },
  ],
  pricing: {
    title: "PRICING",
    description: "서비스별 시작가",
    taxNote: "금액은 VAT 포함입니다.",
    columns: ["서비스", "시작 가격", "기준"],
    onRequest: "별도 견적",
    link: "요금 안내 보기",
  },
  closing: {
    primaryCta: "도입 상담 신청",
    title: "CONTACT",
    question: "어디서부터 시작할지 모르겠다면",
    estimateCta: "맞춤 개발 견적",
    description: "지금 상황을 들려주시면 맞는 방법을 안내해 드립니다.",
  },
};
