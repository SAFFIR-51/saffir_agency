import type { Route } from "next";
import { routes } from "@/shared/config";

/**
 * 시안 5 메인 문구 (NHN Cloud 메인 구성을 따라 만든 화면).
 * 구성만 참고했고 문구·이미지는 모두 사피어 것이다. 숫자·후기는 지어내지 않는다.
 */
export const ncContent = {
  hero: {
    title: ["만들고 끝내지 않습니다.", "계속 돌아가게 책임집니다."],
    cta: { label: "도입 상담 바로가기", href: routes.contact as Route },
  },
  /** 첫 화면 아래 넘기는 큰 카드 */
  promos: [
    {
      key: "diagnosis",
      title: ["병원 무료 진단", "우리 병원, AI 검색에 나오나요?"],
      text: ["홈페이지 주소만 넣으면 로그인 없이", "총점과 우선 개선 항목을 보여 드립니다."],
      cta: { label: "무료 진단하기", href: `${routes.hospital.geo}#diagnosis` as Route },
      tone: "blue",
    },
    {
      key: "pricing",
      title: ["요금 공개", "상담 전에 비용부터 확인하세요"],
      text: ["병원 솔루션부터 맞춤 개발까지", "모든 상품의 요금을 공개합니다."],
      cta: { label: "요금 보기", href: routes.pricing as Route },
      tone: "violet",
    },
    {
      key: "development",
      title: ["맞춤 개발", "정찰가 패키지로 바로 시작"],
      text: ["범위가 정해진 개발은 정찰가 계약금으로", "견적 기다림 없이 시작합니다."],
      cta: { label: "견적 요청하기", href: routes.development.estimate as Route },
      tone: "teal",
    },
  ],
  news: {
    title: "포트폴리오",
    text: ["직접 만든 프로젝트를", "지금 바로 확인해 보세요."],
    href: routes.portfolio as Route,
  },
  quick: [
    { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` as Route, icon: "search" },
    { label: "요금 안내", href: routes.pricing as Route, icon: "price" },
    { label: "견적 요청", href: routes.development.estimate as Route, icon: "doc" },
    { label: "문의하기", href: routes.contact as Route, icon: "chat" },
  ],
  solutions: {
    title: "주요 솔루션",
    lead: "병원부터 커머스·업무 시스템, 새로운 서비스까지 분야에 맞춘 솔루션을 제공합니다.",
  },
  services: {
    title: "주요 서비스",
    lead: "반복해서 만들어 온 기능을 서비스로 다듬어 바로 쓸 수 있게 했습니다.",
    all: { label: "요금 한눈에 보기", href: routes.pricing as Route },
  },
  cases: {
    title: "포트폴리오",
    lead: "직접 설계하고 개발한 프로젝트를 확인해 보세요.",
    all: { label: "포트폴리오 전체 보기", href: routes.portfolio as Route },
  },
  info: {
    title: "처음이라면 여기서 시작하세요",
    lead: "지금 가장 필요한 정보부터 둘러보세요.",
    cards: [
      {
        title: "무료 진단",
        text: ["우리 병원 홈페이지가", "AI 검색에 강한지 바로 확인"],
        href: `${routes.hospital.geo}#diagnosis` as Route,
        tone: "#f6f4ff",
        icon: "search",
      },
      {
        title: "요금 안내",
        text: ["모든 상품의 요금을", "상담 전에 공개합니다"],
        href: routes.pricing as Route,
        tone: "#f4f8ff",
        icon: "price",
      },
      {
        title: "개발 프로세스",
        text: ["6단계 진행과", "포털에서 확인하는 방법"],
        href: routes.development.process as Route,
        tone: "#f2f9f2",
        icon: "steps",
      },
      {
        title: "자주 묻는 질문",
        text: ["도입 전에 많이 묻는", "질문을 모았습니다"],
        href: routes.faq as Route,
        tone: "#f3f4f6",
        icon: "question",
      },
    ],
  },
  closing: {
    label: "문의하기",
    title: "기획부터 운영까지, 사피어가 함께합니다.",
    cta: { label: "전문가에게 문의하기", href: routes.contact as Route },
  },
};
