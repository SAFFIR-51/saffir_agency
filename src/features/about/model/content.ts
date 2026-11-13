import type { Route } from "next";
import { routes } from "@/shared/config";

/**
 * 회사 소개 화면 문구. 영문은 대문자로 보이고, 한글 설명이 바로 아래 붙는다.
 * 이미지 칸(slot)은 이미지가 정해지기 전까지 빈 칸에 설명만 보인다.
 */
export const aboutContent = {
  hero: {
    title: ["Build it once,", "keep it running"],
    slot: "회사 소개 대표 영상 또는 이미지 (작업 공간·팀)",
  },
  who: {
    title: "Who we are",
    subtitle: "Built to last",
    en: "Saffir builds hospital, commerce and business systems fast, and keeps them running after launch. We do not stop at delivery. We stay with you from development to daily operation.",
    ko: "사피어는 병원·커머스·업무 시스템을 빠르게 만들고, 납품 뒤 운영까지 맡습니다. 만들고 끝내지 않습니다. 개발부터 운영까지 함께하는 기술 파트너입니다.",
  },
  values: {
    title: "Our core values",
    items: [
      {
        title: "Open",
        en: "Prices are open before we start. You know what you pay for, and why.",
        ko: "견적은 투명하게. 시작하기 전에 요금을 공개하고, 무엇에 얼마가 드는지 먼저 알려 드립니다.",
      },
      {
        title: "Clear",
        en: "You can see every step. Progress, server status and bills are always in your portal.",
        ko: "진행 상황은 명확하게. 진행 현황, 서버 상태, 청구를 언제든 포털에서 확인합니다.",
      },
      {
        title: "Lasting",
        en: "Launch is not the end. We keep your system running with dedicated servers and care.",
        ko: "개발부터 운영까지. 전용 서버와 유지보수로 납품한 시스템이 계속 돌아가게 합니다.",
      },
    ],
  },
  vision: {
    title: "Our vision",
    items: [
      {
        title: ["Build once, set up many", "What we build again becomes a solution"],
        en: "Features we build again and again, like stock sync or clinic booking and CRM, become ready solutions. The next client gets a setup, not a new build.",
        ko: "외주에서 반복해서 만드는 기능(재고 연동, 병원 예약·CRM)을 솔루션으로 올립니다. 그러면 다음 고객에게는 개발이 아니라 세팅으로 제공할 수 있습니다.",
      },
      {
        title: ["After launch", "Delivery is where care begins"],
        en: "When a project is delivered, we keep going with maintenance and server operation, so your service keeps working.",
        ko: "납품이 끝난 뒤에도 유지보수와 서버 운영으로 이어집니다. 만든 서비스가 계속 돌아가게 책임집니다.",
      },
    ],
    slot: "비전을 보여 주는 이미지",
  },
  what: {
    title: "What we do",
    subtitle: "Solutions, custom builds and care in one place",
    ko: "사피어는 병원 솔루션, 비즈니스 솔루션, 맞춤 개발을 하나의 회사 서비스로 제공합니다.",
    cards: [
      {
        title: "Hospital website",
        en: "Hospital websites that AI search can find",
        ko: "AI 검색에 강한 병원 홈페이지 제작",
        href: routes.hospital.website,
        slot: "병원 홈페이지 화면",
      },
      {
        title: "AI search (GEO)",
        en: "See if AI recommends your clinic",
        ko: "ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인",
        href: routes.hospital.geo,
        slot: "AI 검색 결과 화면",
      },
      {
        title: "Hospital CRM",
        en: "Bring patients back after the first visit",
        ko: "한 번 온 환자가 다시 오게",
        href: routes.hospital.crm,
        slot: "병원 CRM 화면",
      },
      {
        title: "Commerce connect",
        en: "Stock and orders from many markets in one place",
        ko: "여러 마켓 재고·주문을 한곳에서",
        href: routes.solutions.connect,
        slot: "커머스 연동 화면",
      },
      {
        title: "Business ERP",
        en: "Turn scattered spreadsheets into one system",
        ko: "흩어진 엑셀을 하나의 시스템으로",
        href: routes.solutions.erp,
        slot: "업무 통합 ERP 화면",
      },
      {
        title: "Custom development",
        en: "Web, apps, platforms, AI and IoT, built and run",
        ko: "웹·앱, 쇼핑몰, 플랫폼 연동, AI, IoT를 만들고 운영까지",
        href: routes.development.root,
        slot: "맞춤 개발 결과물 화면",
      },
    ] satisfies ReadonlyArray<{ title: string; en: string; ko: string; href: Route; slot: string }>,
  },
  identity: {
    title: "Identity",
    subtitle: "Saffir Technology",
    en: "One company, one name. Every service is offered as Saffir and its feature name, so you always know who builds it and who keeps it running.",
    ko: "별도 브랜드 없이 모든 서비스를 '사피어 + 기능명'으로 제공합니다. 누가 만들고 누가 운영하는지 늘 분명합니다.",
    slots: ["브랜드 이미지 (로고·사무실)", "서비스 화면 모음"],
  },
};
