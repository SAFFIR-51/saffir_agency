import type { Route } from "next";
import { routes } from "@/shared/config";

/** 메인 화면 문구 */
export const homeContent = {
  /** 히어로 버튼은 업종 구분 없이. 업종별 입구는 바로 아래 세 갈래에서 고른다 */
  hero: {
    primaryCta: "도입 상담 신청",
    secondaryCta: "만든 것 보기",
    /** 첫 화면 제목은 두 줄 (site.tagline을 문장마다 나눔) */
    title: ["만들고 끝내지 않습니다.", "계속 돌아가게 책임집니다."],
  },
  /** 스크롤하면 글자가 차례로 밝아지는 큰 문장 (숫자 위) */
  statement:
    "사피어는 병원과 기업, 새로운 서비스를 만드는 팀을 위해 기획부터 개발, 납품 뒤 운영까지 한 팀으로 책임집니다. 요금은 처음부터 공개합니다.",
  /** 왜 사피어인가: 크기가 다른 칸을 모은 격자 (애플 "자세히 살펴보기" 격자) */
  bento: {
    title: "왜 사피어인가요?",
    prices: { title: "요금을 먼저 공개합니다", text: "상담 전에 비용부터 확인하세요." },
    ownership: {
      title: "데이터는 고객사 소유",
      text: "구축형 솔루션은 고객사 전용 서버에 세팅합니다.",
    },
    modules: { title: "이미 갖춘 모듈", text: "처음부터 짜지 않아서 빠릅니다." },
    portal: { title: "포털에서 한눈에", text: "진행 현황, 서버 상태, 청구를 한 곳에서 봅니다." },
    operate: { title: "납품 뒤에도 운영", text: "전용 서버와 유지보수로 계속 돌아가게 합니다." },
    models: { title: "세 가지 제공 방식" },
  },
  /** 세 갈래 타일 부제 (타일 제목 아래 큰 글씨) */
  tiles: {
    hospital: { headline: "환자가 먼저 찾는 병원으로.", image: "병원 홈페이지·AI 검색 결과 화면" },
    business: { headline: "흩어진 업무를 한 화면에.", image: "커머스 연동·ERP 대시보드" },
    development: { headline: "필요한 서비스를, 처음부터 끝까지.", image: "웹·앱 개발 결과물" },
  },
  /** 첫 화면 아래 숫자 줄. 모두 콘텐츠 데이터에서 센다 (지어낸 숫자 없음) */
  stats: {
    portfolio: "만든 프로젝트",
    groups: "분야",
    prices: "요금 공개 상품",
    lines: "사업 갈래",
  },
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
  workflow: { title: "만들고, 운영하고, 보여드립니다" },
  cases: { title: "이런 것을 만들었습니다", all: "포트폴리오 전체 보기" },
  /** 분야가 겹치지 않게 고른 대표 사례. tag는 카드에 보이는 분야 표시 */
  featured: [
    { slug: "hospital-erp-1", tag: "업무 시스템 (ERP)" },
    { slug: "derma-clinic-web", tag: "병원 홈페이지" },
    { slug: "cafe24-admin", tag: "커머스 연동" },
    { slug: "sports-ai-prediction", tag: "AI 서비스" },
    { slug: "smart-planter-ble", tag: "IoT" },
    { slug: "mentoring-app", tag: "앱" },
  ],
  pricing: {
    title: "요금을 모두 공개합니다",
    note: "금액은 VAT 포함입니다.",
    all: "요금 안내 보기",
  },
  closing: {
    title: "어디서부터 시작할지 모르겠다면",
    estimate: "맞춤 개발 견적",
    description: "지금 상황을 들려주시면 맞는 방법을 안내해 드립니다.",
  },
};
