import { additionalCaseStudies } from "./additional-case-studies";

export type PortfolioCaseStudy = {
  title: string;
  introduction: string;
  cover: { src: string; width: number; height: number; alt: string };
  facts: { label: string; value: string }[];
  background: { title: string; paragraphs: string[] };
  features: {
    title: string;
    description: string;
    points: string[];
    image: { src: string; width: number; height: number; alt: string };
    caption: string;
    additionalImages?: { src: string; width: number; height: number; alt: string }[];
    presentation?: "screens" | "page";
  }[];
  imageNote?: string;
  scopeTitle?: string;
  scope: { item: string; detail: string }[];
  relatedSlugs: string[];
  closing: { title: string; description: string; label: string };
};

export const portfolioCaseStudies: Readonly<Record<string, PortfolioCaseStudy | undefined>> = {
  ...additionalCaseStudies,
  "hospital-erp-2": {
    imageNote: "화면의 수치는 예시입니다.",
    title: "병원 ERP 관리 시스템",
    introduction:
      "매출·환자·치료·재고·CRM·마케팅까지, 병원 운영에 필요한 정보를 하나의 웹 시스템으로 연결했습니다.",
    cover: {
      src: "/images/home/portfolio-hospital-erp.webp",
      width: 1448,
      height: 1086,
      alt: "병원 ERP의 매출 분석 화면과 운영 메뉴",
    },
    facts: [
      { label: "분야", value: "의료·헬스케어" },
      { label: "유형", value: "웹 기반 ERP · 리뉴얼" },
      { label: "수행 범위", value: "기획 · 디자인 · 개발" },
    ],
    background: {
      title: "병원 운영을 함께 볼 수 있도록",
      paragraphs: [
        "병원의 운영 현황을 파악하려면 매출과 환자 수, 치료와 재고 정보를 함께 살펴봐야 합니다. 이 프로젝트는 여러 업무를 하나의 ERP 안에 모으고, 운영자가 필요한 화면을 찾아갈 수 있도록 구성했습니다.",
        "대시보드에는 주요 지표와 추이를 배치하고, 업무별 메뉴에서 상세 내용을 확인하도록 설계했습니다. 숫자로 현황을 읽고, 그래프에서 흐름을 보고, 목록에서 세부 기록을 확인하는 구조입니다.",
      ],
    },
    features: [
      {
        title: "매출의 현황과 흐름을 한눈에",
        description:
          "총매출과 목표 달성률, 일평균 매출을 상단에 모았습니다. 기간을 바꾸며 매출 추이를 확인하고, 아래 목록에서 날짜별 급여·비급여와 환자 수를 함께 살펴볼 수 있습니다.",
        points: [
          "일별·주별·월별 기간 조회",
          "실적·목표·전년 매출 비교",
          "상세 내역 확인과 Excel·PDF 내보내기",
        ],
        image: {
          src: "/images/portfolio/hospital-erp-sales.webp",
          width: 1920,
          height: 1200,
          alt: "총매출, 목표 달성률, 매출 추이 그래프와 날짜별 상세 내역을 보여주는 병원 ERP",
        },
        caption: "매출 분석 화면",
      },
      {
        title: "환자의 방문 흐름까지 연결해서",
        description:
          "신환과 재내원 환자 수, 재내원율을 같은 화면에 배치했습니다. 월별 변화와 유입 경로, 환자 유형을 그래프로 확인하고 상세 내역으로 이어집니다.",
        points: [
          "신환·재내원 추이와 재내원율 확인",
          "신환 유입 경로와 환자 유형 분포",
          "월별 상세 내역 조회",
        ],
        image: {
          src: "/images/hospital/feature-patient-analytics.png",
          width: 1920,
          height: 1200,
          alt: "신환과 재내원 환자 수, 재내원율, 유입 경로와 환자 유형을 보여주는 분석 화면",
        },
        caption: "환자 분석 화면",
      },
    ],
    scope: [
      {
        item: "기획·설계",
        detail: "대시보드와 업무별 운영 모듈의 정보 구조, 화면 흐름을 설계했습니다.",
      },
      {
        item: "UI 디자인",
        detail: "지표 카드, 추이 그래프, 상세 목록으로 이어지는 관리자 화면을 구성했습니다.",
      },
      {
        item: "웹 개발",
        detail: "매출·환자·치료·재고·CRM·마케팅 모듈을 통합한 웹 기반 ERP를 구현했습니다.",
      },
    ],
    relatedSlugs: ["business-erp-admin", "internal-clinic-web"],
    closing: {
      title: "우리 업무에 맞는 시스템이 필요하신가요?",
      description:
        "지금 관리하는 업무와 필요한 기능을 알려주세요. 구축 범위와 진행 방법을 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
};
