import "server-only";

/**
 * 토스페이먼츠. 결제 유형 3가지 (기획서 "결제와 토스페이먼츠 심사")
 * - 단건 결제: 홈페이지 기본형, 외주 계약금, 솔루션 세팅비 → 결제창
 * - 정액 구독: GEO 등급, 솔루션 월 이용료 → 자동결제(빌링)
 * - 변동 청구: 서버 운영비, 메시지 발송료, 외주 잔금 → 결제창 또는 등록 카드 자동 승인
 */
export type PaymentKind = "one-time" | "subscription" | "invoice";

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

/** TODO: 결제 승인 API 연결 */
export async function confirmPayment(_args: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<{ ok: boolean }> {
  void TOSS_SECRET_KEY;
  return { ok: false };
}

/** TODO: 빌링키 자동결제 연결 (토스 자동결제 추가 신청 후) */
export async function chargeBilling(_args: {
  billingKey: string;
  customerKey: string;
  orderId: string;
  amount: number;
}): Promise<{ ok: boolean }> {
  return { ok: false };
}
