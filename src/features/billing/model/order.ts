import { geoPlans, hospitalWebsitePlans, outsourcingDeposits, type Plan } from "@/content/pricing";

export type OrderItem = Plan & { kind: "subscription" | "once" };

/** 주문서에서 받을 수 있는 상품. 월 요금이 있으면 정기 구독, 아니면 단건 결제 */
export function findOrderItem(planId: string | undefined): OrderItem | null {
  if (!planId) return null;
  // 요금표의 짧은 이름(예: 프로) 앞에 상품군을 붙여 주문서에서 헷갈리지 않게 한다
  const groups: { prefix: string; plans: Plan[] }[] = [
    { prefix: "AI 검색 최적화 ", plans: geoPlans },
    { prefix: "병원 홈페이지 ", plans: hospitalWebsitePlans },
    { prefix: "", plans: outsourcingDeposits },
  ];
  for (const group of groups) {
    const plan = group.plans.find((p) => p.id === planId && p.checkout);
    if (plan) {
      return {
        ...plan,
        name: group.prefix + plan.name,
        kind: plan.monthly ? "subscription" : "once",
      };
    }
  }
  return null;
}

export const orderResultContent = {
  complete: {
    title: "결제가 완료됐습니다",
    lead: "영수증은 주문서에 적은 이메일로 보내 드립니다.",
    rows: ["상품", "금액", "결제 수단", "승인 시각", "주문 번호"],
    nextSubscription:
      "구독은 포털 GEO에서 바로 쓸 수 있고, 다음 결제일과 해지는 청구·결제에서 관리합니다.",
    nextOnce: "결제 내역과 영수증은 포털 청구·결제에서 다시 볼 수 있습니다.",
  },
  fail: {
    title: "결제가 완료되지 않았습니다",
    lead: "아래 사유를 확인하고 다시 결제해 주세요.",
    reasons: [
      { state: "결제창을 닫음", screen: "결제를 취소했다는 안내", next: "다시 결제하기" },
      {
        state: "카드 한도·잔액 부족",
        screen: "토스가 보낸 사유 문구",
        next: "다른 카드로 다시 결제",
      },
      {
        state: "카드사 승인 거절",
        screen: "토스가 보낸 사유 문구",
        next: "카드사 확인 후 다시 결제 / 문의",
      },
      {
        state: "일시적 오류",
        screen: "잠시 후 다시 시도하라는 안내",
        next: "다시 결제하기 / 문의",
      },
    ],
  },
};

export const orderContent = {
  title: "주문서",
  lead: "상품과 금액을 확인하고 결제하세요. 금액은 VAT 포함입니다.",
  notFound: "주문할 상품을 찾을 수 없습니다. 요금 안내에서 다시 골라 주세요.",
  subscriptionNote:
    "구독 상품은 로그인한 뒤 결제합니다. 매달 같은 날 등록한 카드로 결제되고, 포털 청구·결제에서 해지할 수 있습니다.",
  paymentMethods: {
    subscription: "카드 자동결제 등록 (토스페이먼츠)",
    once: "카드 · 계좌이체 · 가상계좌 (토스페이먼츠 결제창)",
  },
};
