import type { Route } from "next";
import { routes } from "@/shared/config";

/** 메인 화면 문구 */
export const homeContent = {
  /** 히어로 버튼은 업종 구분 없이. 업종별 입구는 바로 아래 세 갈래에서 고른다 */
  hero: { primaryCta: "도입 상담 신청", secondaryCta: "만든 것 보기" },
  entry: {
    title: "어떤 일이 필요하세요?",
    /** 세 갈래를 같은 크기·같은 모양 버튼으로 둔다 (특정 업종이 앞서 보이지 않게) */
    lines: {
      hospital: {
        description: "병원 홈페이지 진단부터 환자 관리까지",
        start: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
      },
      business: {
        description: "재고·주문·업무 시스템을 세팅으로",
        start: { label: "도입 상담", href: routes.contact },
      },
      development: {
        description: "필요한 서비스를 만들고 운영까지",
        start: { label: "견적 요청", href: routes.development.estimate },
      },
    } satisfies Record<string, { description: string; start: { label: string; href: Route } }>,
    more: "자세히 보기",
  },
  models: {
    title: "이렇게 제공합니다",
    note: "구축형 솔루션의 데이터는 고객사 소유입니다.",
  },
  workflow: { title: "만들고, 운영하고, 보여드립니다" },
  modules: { title: "이미 갖춘 모듈", description: "처음부터 짜지 않아서 빠릅니다." },
  cases: { title: "이런 것을 만들었습니다" },
  /** 분야가 겹치지 않게 고른 대표 사례. tag는 카드에 보이는 분야 표시 */
  featured: [
    { slug: "hospital-erp-1", tag: "업무 시스템 (ERP)" },
    { slug: "cafe24-admin", tag: "커머스 연동" },
    { slug: "smart-planter-ble", tag: "IoT" },
  ],
  pricing: { title: "요금을 모두 공개합니다" },
  closing: {
    title: "어디서부터 시작할지 모르겠다면",
    description: "지금 상황을 들려주시면 맞는 방법을 안내해 드립니다.",
  },
};
