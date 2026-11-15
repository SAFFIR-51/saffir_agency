/** 맞춤 개발 화면 문구 */
export const developmentContent = {
  title: "필요한 서비스를 만들고, 운영까지",
  lead: "웹·앱부터 AI, IoT까지 만들어 납품하고, 납품 후 유지보수까지 맡습니다.",
  /** 분야별 관련 포트폴리오 */
  areas: [
    { name: "웹·앱", slugs: ["derma-clinic-web", "hearing-health-app", "mentoring-app"] },
    {
      name: "쇼핑몰",
      slugs: [
        "cosmetics-shop-app",
        "side-dish-order",
        "group-buying-platform",
        "cosmetics-oem-web",
      ],
    },
    { name: "플랫폼 연동", slugs: ["cafe24-admin"] },
    { name: "AI", slugs: ["sports-ai-prediction", "sports-ai-web", "emotion-ai-coaching"] },
    { name: "IoT", slugs: ["vivarium-iot-camera", "smart-planter-ble", "reptile-care-app"] },
  ],
};

export const processContent = {
  title: "개발 프로세스",
  lead: "단계마다 포털에서 진행 상황을 확인하고 승인합니다.",
  contract: [
    { item: "결제", detail: "계약금 + 잔금" },
    { item: "납품 후", detail: "유지보수" },
  ],
};

/** 맞춤 개발 소개(/development) 세부 페이지 문구 (/hospital과 같은 구성) */
export const developmentLandingContent = {
  hero: {
    tagline: ["WEB, APP, AI AND IOT", "BUILT AND RUN FOR YOU"],
    title: "Custom Development",
    secondary: "개발 프로세스",
    primary: "견적 요청",
  },
  areas: {
    title: "What We Build",
    sub: [
      "웹·앱, 쇼핑몰, 플랫폼 연동, AI, IoT까지.",
      "분야마다 직접 만들고 납품한 프로젝트입니다.",
    ],
    columns: ["분야", "관련 프로젝트"],
  },
  modules: {
    title: "Ready Modules",
    sub: ["이미 갖춘 모듈", "처음부터 짜지 않아서 빠릅니다."],
  },
  process: {
    title: "Development Process",
    sub: ["단계마다 포털에서 진행 상황을 확인하고 승인합니다."],
    columns: ["단계", "이름", "하는 일"],
    more: "개발 프로세스 보기",
  },
  pricing: {
    title: "Fixed Price",
    sub: ["정찰가 패키지", "금액은 VAT 포함입니다."],
    columns: ["상품", "포함", "계약금", "신청"],
    order: "결제하기",
    contractColumns: ["항목", "내용"],
    /** 정찰가에 없는 개발: 견적 요청 또는 문의로 */
    custom: {
      name: "맞춤 개발",
      includes: "정찰가 패키지에 없는 기능·플랫폼",
      price: "견적 후 안내",
      estimate: "견적 요청",
      contact: "문의하기",
    },
  },
  closing: {
    title: "만들고 싶은 것을 알려주세요",
    description: "필요한 기능과 일정을 들려주시면 범위와 견적을 안내해 드립니다.",
  },
};
