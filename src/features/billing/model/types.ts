import type { PaymentKind } from "@/server/payments/toss";

export type InvoiceStatus = "unpaid" | "paid" | "canceled";

/** 포털 청구 1건. 모든 청구는 요금 페이지의 공개 상품(planId)과 연결합니다. */
export type Invoice = {
  id: string;
  kind: PaymentKind;
  planId: string;
  title: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
};
