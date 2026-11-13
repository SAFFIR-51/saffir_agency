import type { Route } from "next";
import { routes } from "@/shared/config";

/**
 * 메인 화면 아래쪽 섹션 문구. 큰 영문 제목(title) + 기존 한글 문구(subtitle).
 * 한글 문구는 원래 메인에 있던 것을 그대로 쓴다.
 */
export const homeContent = {
  entry: {
    title: "Where to start",
    subtitle: "어떤 일이 필요하세요?",
    /** 세 갈래를 같은 크기·같은 모양으로 둔다 (특정 업종이 앞서 보이지 않게) */
    lines: {
      hospital: {
        en: "Hospital",
        description: "병원 홈페이지 진단부터 환자 관리까지",
        start: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
        slot: "병원 솔루션 대표 화면",
      },
      business: {
        en: "Business",
        description: "재고·주문·업무 시스템을 세팅으로",
        start: { label: "도입 상담", href: routes.contact },
        slot: "비즈니스 솔루션 대표 화면",
      },
      development: {
        en: "Development",
        description: "필요한 서비스를 만들고 운영까지",
        start: { label: "견적 요청", href: routes.development.estimate },
        slot: "맞춤 개발 대표 화면",
      },
    } satisfies Record<
      string,
      { en: string; description: string; start: { label: string; href: Route }; slot: string }
    >,
    more: "자세히 보기",
  },
  cases: { title: "Our work", subtitle: "이런 것을 만들었습니다", all: "포트폴리오 전체 보기" },
  models: {
    title: "How we deliver",
    subtitle: "이렇게 제공합니다",
    /** 제공 방식 3가지의 영문 표기 (content/company.ts businessModels 순서와 같다) */
    en: ["Subscription", "Installed solution", "Custom build"],
  },
  workflow: { title: "How we work", subtitle: "만들고, 운영하고, 보여드립니다" },
  modules: {
    title: "Ready modules",
    subtitle: "이미 갖춘 모듈",
    description: "처음부터 짜지 않아서 빠릅니다.",
    /** 모듈을 조합한 결과물 자리 (이미지가 정해지면 교체) */
    result: {
      label: "Result",
      caption: "갖춘 모듈을 조합해 완성한 서비스",
      slot: "완성본 화면 (예: 예약·결제가 들어간 앱 화면)",
    },
    steps: [
      { en: "Pick", ko: "필요한 모듈을 고르고" },
      { en: "Combine", ko: "서비스에 맞게 조합해" },
      { en: "Launch", ko: "완성본으로 오픈합니다" },
    ],
  },
  pricing: {
    title: "Open prices",
    subtitle: "요금을 모두 공개합니다",
    note: "금액은 VAT 포함입니다.",
    all: "요금 안내 보기",
    devNote: "정찰가에 없는 개발은 견적으로 안내합니다.",
  },
};
