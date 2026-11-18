import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";

export const hospitalWebsiteContent = {
  path: routes.hospital.website,
  name: "사피어 병원 홈페이지",
  message: "AI 검색에 강한 병원 홈페이지",
  process: [
    { step: "상담", detail: "병원 상황을 듣고 맞는 패키지를 정합니다." },
    { step: "계약", detail: "패키지를 고르고 계약합니다. 기본형은 바로 결제할 수 있습니다." },
    { step: "제작", detail: "패키지별 기간에 맞춰 만듭니다." },
    { step: "납품", detail: "완성된 홈페이지를 넘겨드립니다." },
    { step: "관리", detail: "GEO 관리형 또는 단순 유지보수를 고릅니다." },
  ],
  delivery: [
    {
      item: "제작 범위",
      detail: "선택한 패키지에 따라 페이지 수와 디자인·기능 범위가 달라집니다.",
    },
    {
      item: "제작 기간",
      detail: "기본형 3~4주, 표준형 5~6주, 프리미엄 8주부터입니다.",
    },
    {
      item: "예약·상담",
      detail: "홈페이지에서 병원의 네이버 예약과 카카오 채널로 연결합니다.",
    },
    {
      item: "공개 후 관리",
      detail: "GEO 관리형 또는 단순 유지보수를 선택할 수 있습니다.",
    },
  ],
  faq: faqForService("hospital-website"),
  cta: { label: "제작 상담", href: routes.contactFor("hospital-website") },
  secondaryCta: { label: "기본형 결제", href: routes.order("web-basic") },
  title: "Hospital Website",
  lead: "환자가 병원을 찾는 순간부터 진료 예약까지. 병원 홈페이지를 만들고 운영합니다.",
  why: [
    "환자는 예약하기 전에 자신에게 필요한 진료를 하는지, 언제 방문할 수 있는지 확인합니다. 병원 홈페이지는 진료 항목과 시간, 위치를 정확히 안내하고 예약이나 상담으로 이어주는 곳입니다.",
    "병원의 진료 내용과 운영 정보를 먼저 정리하고, 필요한 안내를 읽은 자리에서 예약할 수 있도록 화면을 구성합니다. 제작 과정에 SEO·AEO·GEO를 반영해 검색 결과와 AI 답변에서도 병원 정보를 찾기 쉽게 준비합니다.",
  ],
  comparison: [
    {
      before: "진료 내용이 한 페이지에 섞여 환자가 필요한 정보를 찾기 어렵습니다.",
      after: "진료 항목별로 페이지를 나눠 필요한 진료 안내를 바로 확인할 수 있게 합니다.",
    },
    {
      before: "검색 결과나 AI 답변에서 병원의 진료 시간과 위치를 확인하기 어렵습니다.",
      after:
        "페이지별 제목과 설명을 정리하고 진료 시간·위치와 자주 묻는 질문을 텍스트로 안내합니다. 표준형부터 구조화 데이터를 적용합니다.",
    },
    {
      before: "홈페이지를 둘러본 환자가 예약이나 상담 방법을 다시 찾아야 합니다.",
      after: "진료 페이지에서 네이버 예약과 카카오 상담으로 바로 이어집니다.",
    },
  ],
  features: [
    {
      title: "검색에서 찾기 쉽게",
      photo: "/images/hospital/feature-google-search.png",
      photoAlt: "어두운 배경의 Google 로고와 정형외과 검색어 자동완성 목록",
      photoClassName: "object-cover object-top md:max-lg:object-[18%_top]",
      description: "기본형부터 AI 검색 최적화 기본 세팅을 제공합니다.",
      points: [
        "홈페이지를 검색 서비스에 등록합니다.",
        "GA4를 설정해 홈페이지 방문 흐름을 확인할 수 있게 합니다.",
        "표준형은 진료 항목별 페이지를 만들고 구조화 데이터를 적용합니다.",
      ],
    },
    {
      title: "예약과 상담으로 이어지게",
      photo: "/images/hospital/feature-clinic-consultation.webp",
      photoAlt: "진료실에서 서류를 사이에 두고 상담하는 의료진과 환자",
      photoClassName: "object-cover object-[50%_48%]",
      photoFrameClassName: "md:before:block md:before:aspect-[407/239]",
      photoUnoptimized: true,
      description: "진료 안내, 문의 방법, 방문 정보를 한곳에서 보여줍니다.",
      points: [
        "환자가 진료 안내를 확인한 뒤 쉽게 예약하거나 상담할 수 있도록 동선을 설계합니다.",
        "예약은 네이버 예약으로, 상담은 병원 카카오 채널로 연결합니다.",
      ],
    },
    {
      title: "공개 후에도 관리할 수 있게",
      photo: "/images/hospital/feature-patient-analytics.png",
      photoUnoptimized: true,
      photoAlt: "병원 관리자 화면의 환자 분석 지표와 신환·재내원 추이 그래프",
      photoClassName:
        "origin-top-left scale-[1.625] object-cover object-left-top md:max-lg:scale-[1.125]",
      description: "납품 후에도 월 단위 관리 서비스를 이용할 수 있습니다.",
      points: [
        "GEO 관리로 AI 답변에서 병원이 어떻게 소개되는지 정기적으로 확인합니다.",
        "진단 결과를 바탕으로 진료·운영 정보를 보완하고 홈페이지에 반영합니다.",
        "홈페이지 유입 경로와 예약·상담 동선을 점검해 신환 유입을 관리합니다.",
      ],
    },
  ],
  premiumNote: "프리미엄은 맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장을 제공합니다.",
};
