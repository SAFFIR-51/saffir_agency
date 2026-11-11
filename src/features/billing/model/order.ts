import {
  geoPlans,
  hospitalWebsitePlans,
  orderablePlanIds,
  outsourcingDeposits,
  type Plan,
} from "@/content/pricing";

export type OrderItem = Plan & { kind: "subscription" | "once" };

/** 주문서에서 받을 수 있는 상품. 월 요금이 있으면 정기 구독, 아니면 단건 결제 */
export function findOrderItem(planId: string | undefined): OrderItem | null {
  if (!planId || !(orderablePlanIds as readonly string[]).includes(planId)) return null;
  // 요금표의 짧은 이름(예: 프로) 앞에 상품군을 붙여 주문서에서 헷갈리지 않게 한다
  const groups: { prefix: string; plans: Plan[] }[] = [
    { prefix: "AI 검색 최적화 ", plans: geoPlans },
    { prefix: "병원 홈페이지 ", plans: hospitalWebsitePlans },
    { prefix: "", plans: outsourcingDeposits },
  ];
  for (const group of groups) {
    const plan = group.plans.find((p) => p.id === planId);
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
