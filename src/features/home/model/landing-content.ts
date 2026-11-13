import type { Route } from "next";
import { routes } from "@/shared/config";

/** 메인 첫 화면 문구. 제목·설명은 한글, 정사각형·원형 글자는 영문 장식. */
export const landingContent = {
  title: ["첫 견적부터 출시 후 운영까지,", "오래 쓰는 소프트웨어를 만듭니다"],
  description:
    "사피어는 병원, 기업, 맞춤 개발 프로젝트의 소프트웨어를 기획부터 개발, 운영까지 한 팀이 책임집니다. 모든 요금은 미리 공개하고, 만든 뒤에도 계속 잘 돌아가도록 함께합니다.",
  /** 가운데 정사각형에 한 줄씩 타이핑되는 서비스 이름 (8줄) */
  services: [
    "Hospital website",
    "AI search (GEO)",
    "Medical ad check",
    "Hospital CRM",
    "Commerce connect",
    "Business ERP",
    "AI chatbot",
    "Custom development",
  ],
  /** 오른쪽 원을 따라 도는 글자. 세 번 반복된다 */
  ring: "Saffir builds software to last",
};

/** 대표 포트폴리오 카드 8장 (4열 × 2줄). slug는 content/portfolio.ts와 같아야 한다 */
export const landingWorks: ReadonlyArray<{
  slug: string;
  label: string;
  /** 카드에 들어갈 이미지 설명 (빈 칸에 보인다) */
  slot: string;
}> = [
  {
    slug: "hospital-erp-1",
    label: "Medical",
    slot: "병원 ERP 대표 화면",
  },
  {
    slug: "derma-clinic-web",
    label: "Medical",
    slot: "피부과 홈페이지 대표 화면",
  },
  {
    slug: "cafe24-admin",
    label: "Commerce",
    slot: "카페24 어드민 대표 화면",
  },
  {
    slug: "cosmetics-shop-app",
    label: "Commerce",
    slot: "화장품 쇼핑몰 앱 대표 화면",
  },
  {
    slug: "sports-ai-prediction",
    label: "AI",
    slot: "스포츠 AI 예측 서비스 대표 화면",
  },
  {
    slug: "vivarium-ai-behavior",
    label: "AI",
    slot: "사육장 AI 행동 분석 대표 화면",
  },
  {
    slug: "smart-planter-ble",
    label: "IoT",
    slot: "스마트 화분 기기·앱 사진",
  },
  {
    slug: "mentoring-app",
    label: "App",
    slot: "멘토링 앱 대표 화면",
  },
];

/** 헤더 메뉴 왼쪽의 회사소개서 카드. 소개서 파일이 준비되면 다운로드로 바꾼다 */
export const brochure = {
  line: "개발부터 운영까지 함께하는 기술 파트너, 사피어입니다.",
  cta: "회사소개서 다운로드",
  pending: "회사소개서는 준비 중입니다.",
};

/** 상단 메뉴 (영문 표기). 기획서 본 메뉴 5개 + 문의·로그인. 홈은 로고로 간다 */
export const landingNav: ReadonlyArray<{ label: string; href: Route }> = [
  { label: "Hospital", href: routes.hospital.root },
  { label: "Business", href: routes.solutions.root },
  { label: "Development", href: routes.development.root },
  { label: "Portfolio", href: routes.portfolio },
  { label: "Pricing", href: routes.pricing },
  { label: "Contact", href: routes.contact },
  { label: "Login", href: routes.auth.login },
];
