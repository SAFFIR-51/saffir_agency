/** 요금 페이지 문구. 금액은 content/pricing에서 가져온다 */
export const pricingContent = {
  eyebrow: "Open prices",
  lead: "상담 전에 대략의 비용을 먼저 확인하세요. 표시된 금액은 모두 VAT 포함입니다.",
  jump: [
    { id: "pr-hospital", label: "병원 솔루션" },
    { id: "pr-business", label: "비즈니스 솔루션" },
    { id: "pr-development", label: "맞춤 개발" },
    { id: "pr-payment", label: "결제 방식" },
  ],
  hospital: {
    title: "Hospital",
    subtitle: "병원 솔루션",
    groups: {
      geo: "AI 검색 최적화 · 월 구독",
      website: "병원 홈페이지 · 제작",
      crm: "병원 CRM · 세팅 + 월 이용료",
      message: "메시지 발송 · 건당",
      bundle: "패키지",
    },
    bundleCta: "패키지 상담",
  },
  business: {
    title: "Business",
    subtitle: "비즈니스 솔루션",
    groups: { solutions: "솔루션 · 세팅 + 월 이용료", server: "서버 운영비 · 월" },
  },
  development: {
    title: "Development",
    subtitle: "맞춤 개발",
    groups: { packages: "정찰가 패키지 · 계약금" },
    estimate: "맞춤 개발 견적 요청",
  },
  payment: {
    title: "Payment",
    subtitle: "결제 방식",
    columns: ["결제 유형", "대상 상품", "결제 위치", "결제 수단"],
    refund: "취소 및 환불 규정",
  },
};
