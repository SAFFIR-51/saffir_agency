import type { Route } from "next";

/** 포트폴리오 분야 (기획서 "맞춤 개발과 포트폴리오") */
export type PortfolioGroup = "medical" | "commerce" | "ai" | "iot" | "app";
export type Tech = "web" | "app" | "ai" | "iot" | "erp";
export type PortfolioCardType =
  "WEB" | "APP" | "WEB APP" | "WEB/APP" | "ERP" | "IoT" | "GAME" | "AI";

export type PortfolioItem = {
  slug: string;
  title: string;
  group: PortfolioGroup;
  tech: Tech[];
  cardType?: PortfolioCardType;
  hideFromGallery?: boolean;
  /** 한 줄 소개 (saffir.co.kr/portfolio 문구) */
  summary?: string;
  /** 대표 이미지 (public/portfolio/[slug].webp) */
  image?: string;
  detailImage?: { src: string; width: number; height: number };
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

export const hospitalWebsiteCases = [
  { title: "피부과 의원 홈페이지", slug: "derma-clinic-web" },
  { title: "내과·인공신장실 홈페이지", slug: "internal-clinic-web" },
  { title: "병원 컨설팅 홈페이지", slug: "hospital-consulting-web" },
  { title: "병원 ERP 관리 시스템", slug: "hospital-erp-2" },
];

export const portfolioCoverImages = {
  "side-dish-order": "/images/home/portfolio-chanchan.webp",
  "derma-clinic-web": "/images/home/portfolio-derma-clinic.webp",
  "internal-clinic-web": "/images/home/portfolio-internal-clinic-laptop.webp",
  "hospital-erp-2": "/images/home/portfolio-hospital-erp.webp",
  "cosmetics-shop-app": "/images/home/portfolio-epure.webp",
  "mentoring-app": "/images/home/portfolio-chur-calendar.webp",
  "wardrobe-app": "/images/home/portfolio-wardrobe-gray.webp",
  "pixel-rpg": "/images/home/portfolio-direpx.webp",
  "smart-planter-ble": "/images/home/portfolio-smart-planter-cuber.webp",
  "hearing-health-app": "/images/home/portfolio-earguard-centered.webp",
  "vivarium-iot-camera": "/images/home/portfolio-lizard-cam.webp",
  "sports-ai-web": "/images/home/portfolio-ggyp-web-app.webp",
  "emotion-ai-coaching": "/images/portfolio/talkbetter.webp",
  "cafe24-admin": "/images/portfolio/cafe24-link-slate.webp",
  "tinnitus-mental-app": "/images/portfolio/mindtone.webp",
  "hospital-consulting-web": "/images/portfolio/hospital-consulting.webp",
  "group-buying-platform": "/images/portfolio/group-buying-logo.webp",
  "cosmetics-oem-web": "/images/portfolio/onview-website.webp",
  "business-erp-admin": "/images/portfolio/business-erp-admin-laptop.webp",
  "commerce-inventory-erp": "/images/portfolio/commerce-inventory-erp-dashboard-monitor.webp",
};

/** 프로젝트명·한 줄 소개·이미지는 saffir.co.kr/portfolio 기준. TODO: 고객 문제·구현 내용·결과 채우기 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "hospital-erp-1",
    title: "병원 ERP 관리 시스템 v1",
    group: "medical",
    tech: ["erp", "web"],
    hideFromGallery: true,
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
  {
    slug: "hearing-health-app",
    title: "Earguard 도시 소음 케어",
    group: "medical",
    tech: ["app"],
  },
  {
    slug: "emotion-ai-coaching",
    title: "감정 기록 & AI 코칭 앱",
    group: "medical",
    tech: ["app", "ai"],
  },
  {
    slug: "cafe24-admin",
    title: "카페24 연동 커머스 어드민",
    group: "commerce",
    tech: ["web"],
    relatedSolution: "/solutions/connect",
  },
  { slug: "cosmetics-shop-app", title: "이퓨어 뷰티 커머스", group: "commerce", tech: ["app"] },
  {
    slug: "wardrobe-app",
    title: "워드로브 패션 쇼핑",
    group: "commerce",
    tech: ["app"],
    image: portfolioCoverImages["wardrobe-app"],
  },
  {
    slug: "commerce-inventory-erp",
    title: "커머스 재고 관리 ERP",
    group: "commerce",
    tech: ["web", "erp"],
    image: portfolioCoverImages["commerce-inventory-erp"],
    detailImage: {
      src: "/images/portfolio/commerce-inventory-erp-dashboard.webp",
      width: 2530,
      height: 1264,
    },
    relatedSolution: "/solutions/erp",
  },
  {
    slug: "side-dish-order",
    title: "찬찬 반찬가게 주문·예약",
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
    slug: "business-erp-admin",
    title: "제조·운영 통합 ERP",
    group: "commerce",
    tech: ["erp", "web"],
    image: portfolioCoverImages["business-erp-admin"],
    detailImage: { src: "/images/portfolio/business-erp-admin.webp", width: 2533, height: 1262 },
    relatedSolution: "/solutions/erp",
  },
  {
    slug: "sports-ai-prediction",
    title: "스포츠 · 로또 AI 예측 플랫폼",
    group: "ai",
    tech: ["web", "ai"],
    hideFromGallery: true,
  },
  {
    slug: "sports-ai-web",
    title: "GGYP 스포츠·로또 분석",
    group: "ai",
    tech: ["web"],
    cardType: "WEB/APP",
  },
  {
    slug: "vivarium-iot-camera",
    title: "파충류 사육장 IoT 카메라",
    group: "iot",
    tech: ["iot", "ai"],
  },
  { slug: "smart-planter-ble", title: "CUBER 스마트 화분", group: "iot", tech: ["iot", "app"] },
  {
    slug: "reptile-care-app",
    title: "파충류 반려동물 관리 앱",
    group: "iot",
    tech: ["app"],
    hideFromGallery: true,
  },
  { slug: "pixel-rpg", title: "DirepX 픽셀 RPG", group: "app", tech: ["app"], cardType: "GAME" },
  { slug: "mentoring-app", title: "츄 캘린더", group: "app", tech: ["app"] },
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
  "wardrobe-app":
    "국내·해외 배송 상품부터 중고·자체 제작 상품까지 한곳에서 둘러보는 패션 쇼핑 앱입니다.",
  "commerce-inventory-erp":
    "상품별 재고 현황, 입출고 이력과 채널 동기화 상태를 한곳에서 확인하는 커머스 ERP입니다.",
  "side-dish-order":
    "주문 · 입금 · 배송 · 완료 파이프라인으로 운영을 한 흐름으로 묶은 로컬 반찬 커머스입니다.",
  "group-buying-platform":
    "동네 이웃 간 배달 · 공동구매 · 나눔 · 중고거래를 잇는 GPS 위치 기반 플랫폼입니다.",
  "cosmetics-oem-web": "제조 공정 · R&D · 인증을 보여주는 화장품 제조 기업의 B2B 랜딩입니다.",
  "business-erp-admin":
    "재고·생산·품질과 결재 업무를 관리하고, 주요 지표와 오늘 할 일을 한 화면에서 확인하는 ERP입니다.",
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
  item.image ??= `/portfolio/${item.slug}.webp`;
}

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getPortfolioCoverImage({ slug, image }: Pick<PortfolioItem, "slug" | "image">) {
  const covers: Readonly<Record<string, string | undefined>> = portfolioCoverImages;
  return covers[slug] ?? image;
}

export function getPortfolioCardType({
  cardType,
  tech,
}: PortfolioItem): PortfolioCardType | undefined {
  if (cardType) return cardType;
  if (tech.includes("erp")) return "ERP";
  if (tech.includes("iot")) return "IoT";
  if (tech.includes("web")) return tech.includes("app") ? "WEB APP" : "WEB";
  if (tech.includes("app")) return "APP";
  return tech.includes("ai") ? "AI" : undefined;
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
export function withCaseImages<T extends { href?: string }>(
  cases: T[],
  { preferCover = false } = {},
) {
  return cases.map((item) => {
    const project = portfolioItems.find((p) => item.href === `/portfolio/${p.slug}`);
    return {
      ...item,
      image: project && (preferCover ? getPortfolioCoverImage(project) : project.image),
    };
  });
}
