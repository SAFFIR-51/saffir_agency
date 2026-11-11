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
    { name: "AI", slugs: ["sports-ai-prediction", "vivarium-ai-behavior", "emotion-ai-coaching"] },
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
