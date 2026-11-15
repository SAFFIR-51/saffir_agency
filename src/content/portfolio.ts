import type { Route } from "next";

/** 포트폴리오 20건, 5개 묶음 (기획서 "맞춤 개발과 포트폴리오") */
export type PortfolioGroup = "medical" | "commerce" | "ai" | "iot" | "app";
export type Tech = "web" | "app" | "ai" | "iot" | "erp";

export type PortfolioItem = {
  slug: string;
  title: string;
  group: PortfolioGroup;
  tech: Tech[];
  /** 한 줄 소개 (saffir.co.kr/portfolio 문구) */
  summary?: string;
  /** 대표 이미지 (public/portfolio/[slug].webp) */
  image?: string;
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

/** 프로젝트명·한 줄 소개·이미지는 saffir.co.kr/portfolio 기준. TODO: 고객 문제·구현 내용·결과 채우기 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "hospital-erp-1",
    title: "병원 ERP 관리 시스템 v1",
    group: "medical",
    tech: ["erp", "web"],
    relatedSolution: "/hospital/crm",
  },
  {
    slug: "hospital-erp-2",
    title: "병원 ERP 관리 시스템 (리뉴얼)",
    group: "medical",
    tech: ["erp", "web"],
    relatedSolution: "/hospital/crm",
  },
  {
    slug: "derma-clinic-web",
    title: "피부과 의원 웹사이트",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  {
    slug: "internal-clinic-web",
    title: "내과 · 인공신장실 웹사이트",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  {
    slug: "hospital-consulting-web",
    title: "병원 컨설팅 B2B 웹사이트",
    group: "medical",
    tech: ["web"],
    relatedSolution: "/hospital/website",
  },
  {
    slug: "tinnitus-mental-app",
    title: "이명 · 멘탈헬스 케어 앱",
    group: "medical",
    tech: ["app", "ai"],
  },
  { slug: "hearing-health-app", title: "도시 소음 청각 건강 앱", group: "medical", tech: ["app"] },
  {
    slug: "emotion-ai-coaching",
    title: "감정 기록 & AI 코칭 앱",
    group: "medical",
    tech: ["app", "ai"],
    relatedSolution: "/solutions/ai-chatbot",
  },
  {
    slug: "cafe24-admin",
    title: "카페24 연동 커머스 어드민",
    group: "commerce",
    tech: ["web"],
    relatedSolution: "/solutions/connect",
  },
  { slug: "cosmetics-shop-app", title: "화장품 쇼핑몰 앱", group: "commerce", tech: ["app"] },
  {
    slug: "side-dish-order",
    title: "반찬 주문 · 예약 플랫폼",
    group: "commerce",
    tech: ["web", "app"],
  },
  {
    slug: "group-buying-platform",
    title: "지역 기반 공동소비 플랫폼",
    group: "commerce",
    tech: ["web"],
  },
  {
    slug: "cosmetics-oem-web",
    title: "화장품 OEM · ODM B2B 웹사이트",
    group: "commerce",
    tech: ["web"],
  },
  {
    slug: "sports-ai-prediction",
    title: "스포츠 · 로또 AI 예측 플랫폼",
    group: "ai",
    tech: ["web", "ai"],
    relatedSolution: "/solutions/ai-chatbot",
  },
  { slug: "sports-ai-web", title: "스포츠 · 로또 분석 서비스 랜딩", group: "ai", tech: ["web"] },
  {
    slug: "vivarium-iot-camera",
    title: "파충류 사육장 IoT 카메라",
    group: "iot",
    tech: ["iot", "ai"],
  },
  { slug: "smart-planter-ble", title: "IoT 화분 식물 케어 앱", group: "iot", tech: ["iot", "app"] },
  { slug: "reptile-care-app", title: "파충류 반려동물 관리 앱", group: "iot", tech: ["app"] },
  { slug: "pixel-rpg", title: "파충류 IP 픽셀 RPG 게임", group: "app", tech: ["app"] },
  { slug: "mentoring-app", title: "멘토 · 멘티 일정 케어 앱", group: "app", tech: ["app"] },
];

/** 사례별 한 줄 소개 (saffir.co.kr/portfolio 문구 그대로) */
const portfolioSummaries: Record<string, string> = {
  "hospital-erp-1":
    "매출 · 환자 · 치료 · 재고 · CRM · 마케팅 모듈을 통합한 첫 번째 병원 풀스택 ERP입니다.",
  "hospital-erp-2":
    "매출 · 환자 · 치료 · 재고 · CRM · 마케팅까지, 병원 운영 모듈 전체를 통합한 풀스택 ERP입니다.",
  "derma-clinic-web":
    "매거진 무드의 반응형 랜딩 — Hero · 시술 · 의료진 · 위치가 한 흐름으로 이어집니다.",
  "internal-clinic-web":
    "신장내과 · 인공신장실 중심의 진료 안내와 예약 상담 동선을 담은 의원 웹사이트입니다.",
  "hospital-consulting-web":
    "병원 개원 · 운영 · 성장 컨설팅 기업의 B2B 랜딩 — 소개 · 서비스 · 실적 · 문의 한 흐름입니다.",
  "tinnitus-mental-app": "이명과 멘탈 케어, 두 분야를 한 앱에 담은 디지털 헬스케어 서비스입니다.",
  "hearing-health-app":
    "도시의 소음을 다섯 가지 결로 나눠 지도에 담고, 청각 건강 습관을 만들어주는 앱입니다.",
  "emotion-ai-coaching":
    "비폭력 대화(NVC)의 관찰 · 감정 · 욕구 · 부탁 네 칸으로 기록하고, AI가 코칭하는 감정 일기 앱입니다.",
  "cafe24-admin":
    "12만+ 상품 카탈로그를 카페24 API로 조회 · 동기화하고, 자체 카테고리로 매핑 · 관리하는 어드민 도구입니다.",
  "cosmetics-shop-app":
    "5개 카테고리 큐레이션 중심의 뷰티 커머스 — 유저 앱과 관리자 웹을 함께 구축했습니다.",
  "side-dish-order":
    "주문 · 입금 · 배송 · 완료 파이프라인으로 운영을 한 흐름으로 묶은 로컬 반찬 커머스입니다.",
  "group-buying-platform":
    "동네 이웃 간 배달 · 공동구매 · 나눔 · 중고거래를 잇는 GPS 위치 기반 플랫폼입니다.",
  "cosmetics-oem-web": "제조 공정 · R&D · 인증을 보여주는 화장품 제조 기업의 B2B 랜딩입니다.",
  "sports-ai-prediction":
    "5대 리그 경기 데이터를 AI로 분석해 예측 · 통계 · 팁을 제공하는 구독형 플랫폼입니다.",
  "sports-ai-web":
    "Hero → 서비스 → 구독으로 이어지는 반응형 랜딩. 한 · 영 i18n까지 1개월에 완성했습니다.",
  "vivarium-iot-camera":
    "사육장에 부착하는 관찰 카메라와 AI 행동 분석까지, 하드웨어부터 소프트웨어 전 과정을 자체 개발한 제품입니다.",
  "smart-planter-ble":
    "스마트 화분과 BLE로 동기화해 4종 센서 데이터를 보고, 케어를 경험치로 쌓는 식물 케어 앱입니다.",
  "reptile-care-app":
    "등록 · 기록 · 도감 · 보상 루프로 매일 쓰게 만드는 특수 반려동물 케어 앱입니다.",
  "pixel-rpg":
    "모든 화면이 게임기 — 사육장 관리에 4종 미니게임과 온라인 광장을 더한 픽셀 RPG입니다.",
  "mentoring-app":
    "3가지 모드 매칭과 '매일 1칭찬'으로 멘토링 관계를 지속시키는 일정 케어 앱입니다.",
};

for (const item of portfolioItems) {
  item.summary = portfolioSummaries[item.slug];
  item.image = `/portfolio/${item.slug}.webp`;
}

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

/** 서비스 페이지 "도입 사례" 카드에 대표 이미지를 붙인다 (href가 /portfolio/[slug]인 사례만) */
export function withCaseImages<T extends { href?: string }>(cases: T[]) {
  return cases.map((item) => ({
    ...item,
    image: portfolioItems.find((p) => item.href === `/portfolio/${p.slug}`)?.image,
  }));
}
