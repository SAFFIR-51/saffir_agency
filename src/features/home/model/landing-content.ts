import type { Route } from "next";
import { businessModels, developmentAreas, modules, workflow } from "@/content/company";
import { portfolioGroups, portfolioItems, type Tech } from "@/content/portfolio";
import { listServices, serviceLines, services } from "@/content/services";
import { routes, site } from "@/shared/config";
import { homeContent } from "./content";

/**
 * 메인 시안 문구. 사실은 content/ 와 shared/config 값에서만 가져온다.
 * 이미지 자리는 단색(color)으로 둔다. 실제 이미지가 생기면 color 대신 이미지를 넣는다.
 */

const techLabels: Record<Tech, string> = {
  web: "WEB",
  app: "APP",
  ai: "AI",
  iot: "IoT",
  erp: "ERP",
};

/** 분야가 겹치지 않게 고른 8건. color는 이미지 대신 넣는 단색 */
const featured: Array<{ slug: string; color: string; dark?: boolean }> = [
  { slug: "hospital-erp-1", color: "#0b0b0f", dark: true },
  { slug: "cafe24-admin", color: "#bfe3ee" },
  { slug: "emotion-ai-coaching", color: "#1c1c1c", dark: true },
  { slug: "smart-planter-ble", color: "#a6c94a" },
  { slug: "derma-clinic-web", color: "#f07a3d" },
  { slug: "sports-ai-prediction", color: "#1b1137", dark: true },
  { slug: "side-dish-order", color: "#e9e4da" },
  { slug: "mentoring-app", color: "#6c5ce7", dark: true },
];

const groupCount = Object.keys(portfolioGroups).length;

export const landing = {
  hero: {
    small: "WE",
    word: "SAFFIR",
    side: "BUILD · RUN · SHOW",
    metaTitle: site.tagline
      .split(". ")
      .map((line, i, all) => (i < all.length - 1 ? `${line}.` : line)),
    metaText: site.description,
    color: "#a9a9a9",
    image: "대표 작업 장면 (자동 재생, 소리 없음)",
  },
  about: {
    label: "ABOUT",
    first: {
      text: "외주에서 반복해서 만드는 기능을 솔루션으로 올립니다. 그래서 다음 고객에게는 개발이 아니라 세팅으로 드립니다.",
      color: "#0d1220",
      image: "솔루션 모듈을 표현한 3D 그래픽",
    },
    second: {
      text: "납품이 끝난 뒤에도 전용 서버와 유지보수로 계속 돌아가게 하고, 진행 현황과 청구는 포털에서 보여드립니다.",
      color: "#cfe7ee",
      image: "포털 대시보드 화면 (진행 현황·서버 상태)",
    },
    link: { label: "회사 소개", href: routes.about as Route },
  },
  portfolio: {
    label: "PORTFOLIO",
    title: homeContent.cases.title,
    text: `포트폴리오 ${portfolioItems.length}건, ${groupCount}개 분야. ${Object.values(portfolioGroups).join(", ")}까지 요구사항대로 만들고 납품 뒤 유지보수를 이어갑니다.`,
    color: "#b9b2a8",
    image: "작업 중인 노트북 화면 사진",
    items: featured.flatMap((f) => {
      const item = portfolioItems.find((p) => p.slug === f.slug);
      if (!item) return [];
      return [
        {
          ...f,
          title: item.title,
          group: portfolioGroups[item.group],
          tech: item.tech.map((t) => techLabels[t]),
          href: routes.portfolioDetail(item.slug),
        },
      ];
    }),
    more: { label: "포트폴리오 전체 보기", href: routes.portfolio as Route },
  },
  /** 주황 띠: 일하는 순서 4단계 */
  process: {
    label: "PROCESS",
    text: "만들고, 운영하고, 보여드립니다. 진단·견적부터 구축, 운영, 포털 확인까지 한 팀이 이어서 맡습니다.",
    steps: workflow,
  },
  service: {
    label: "SERVICE",
    title: homeContent.entry.title,
    text: `${homeContent.models.note} ${homeContent.modules.description}`,
    color: "#cfe86a",
    image: "세 갈래(병원·비즈니스·맞춤 개발) 그래픽",
    items: [
      {
        title: serviceLines.hospital.name,
        description: homeContent.entry.lines.hospital.description,
        links: listServices("hospital").map((s) => ({
          label: s.name,
          note: s.message,
          href: s.href,
        })),
        cta: homeContent.entry.lines.hospital.start,
      },
      {
        title: serviceLines.business.name,
        description: homeContent.entry.lines.business.description,
        links: listServices("business").map((s) => ({
          label: s.name,
          note: s.message,
          href: s.href,
        })),
        cta: homeContent.entry.lines.business.start,
      },
      {
        title: "맞춤 개발",
        description: homeContent.entry.lines.development.description,
        links: [],
        tags: developmentAreas,
        cta: homeContent.entry.lines.development.start,
      },
      {
        title: "운영·유지보수",
        description: `${businessModels[0]?.delivery ?? ""}. ${businessModels[0]?.revenue ?? ""}.`,
        links: [],
        tags: ["유지보수", "전용 서버 운영", "포털 조회"],
        cta: { label: "요금 안내", href: routes.pricing as Route },
      },
    ],
  },
  team: {
    titleLines: ["SAFFIR IS READY", "Build ✱ Run", "Let's Go."],
    sub: "기획부터 운영까지 한 팀이 끝까지 맡습니다.",
    archColor: "#5b4b3f",
    archImage: "팀 작업 사진",
    cards: [
      {
        icon: "plan",
        title: ["Careful", "Planning"],
        text: "지금 상황과 필요한 것을 확인하고, 범위와 일정, 화면과 기능을 정합니다.",
        list: ["진단·견적", "착수 · 범위와 일정", "기획 · 화면과 기능"],
      },
      {
        icon: "design",
        title: ["Clear", "Design"],
        text: "정한 기능을 화면으로 디자인하고, 고객이 확인하고 승인합니다.",
        list: ["화면 디자인", "고객 확인·승인"],
      },
      {
        icon: "build",
        title: ["Fast", "Build"],
        text: "처음부터 짜지 않고, 이미 갖춘 모듈로 빠르게 만듭니다.",
        list: modules,
      },
      {
        icon: "run",
        title: ["Steady", "Operation"],
        text: "전용 서버와 유지보수로 계속 돌아가게 합니다.",
        list: ["유지보수", "서버 상태 확인", "포털에서 진행 현황·청구 확인"],
      },
    ],
  },
  solutions: {
    label: "SOLUTIONS",
    title: "사피어 솔루션",
    colors: ["#d8d2c6", "#2b2b2b", "#e4e9ec", "#c9b8a6", "#1f2a37", "#ede6d6", "#b7c4cf"],
    items: services.map((s) => ({
      title: s.name,
      note: s.message,
      line: serviceLines[s.line].name,
      href: s.href,
    })),
    more: { label: "요금 전체 보기", href: routes.pricing as Route },
  },
  message: { label: "MESSAGE", top: "Build & Run", bottom: "Saffir" },
  contact: {
    title: homeContent.closing.title,
    description: homeContent.closing.description,
    href: routes.contact as Route,
    cta: homeContent.hero.primaryCta,
  },
};
