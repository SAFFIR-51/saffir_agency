/** 병원 솔루션 허브. 큰 영문 제목(en) + 한글 제목. 본문은 읽기 쉽게 한글 위주 */
export const hospitalOverviewContent = {
  eyebrow: "Hospital solutions",
  title: ["진단부터 환자 관리까지,", "한 곳에서"],
  lead: "AI 검색 진단, 홈페이지, 월 관리, 환자 관리를 이어서 맡길 수 있습니다.",
  heroSlot: "병원 솔루션 대표 이미지 (진단 결과·홈페이지·CRM 화면)",
  primaryCta: "무료 진단하기",
  bundleCta: "패키지 상담",
  services: { en: "Services", title: "병원 솔루션 4가지", more: "자세히 보기" },
  /** 서비스 카드의 핵심 내용 (고객이 얻는 것). 서비스 id 순서와 무관하게 id로 찾는다 */
  servicePoints: {
    geo: ["로그인 없이 무료 진단", "8개 분야 50여 항목 점검", "구독하면 매달 재진단·AI 노출 측정"],
    "ad-check": ["회원 월 5회 무료", "위험 표현과 이유 표시", "검사 기록 저장"],
    "hospital-website": [
      "기본형부터 AI 검색 기본 세팅",
      "네이버 예약·카카오 채널 연결",
      "기본형은 바로 결제",
    ],
    crm: ["환자 분류·리콜 메시지", "재진율 대시보드", "병원별 전용 서버·데이터 분리"],
  } as Record<string, readonly string[]>,
  journey: { en: "How it flows", title: "이렇게 이어집니다" },
  why: { en: "Why one place" },
  bundle: {
    en: "Growth package",
    title: "병원 성장 패키지",
    separate: "따로 쓸 때",
    pricing: "요금 안내 보기",
    vat: "금액은 VAT 포함입니다.",
  },
};
