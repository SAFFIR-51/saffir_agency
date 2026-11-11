/**
 * 전환 이벤트 기록 (frontend-guide 9번).
 * 분석 도구(GA4, GTM 등)를 붙이면 window.dataLayer로 그대로 전달된다. 개발 중에는 콘솔에도 찍힌다.
 * 속성에 개인정보(이름, 연락처, 이메일, 병원 주소)를 넣지 않는다.
 */
export type EventName =
  | "geo_diagnosis_started"
  | "geo_diagnosis_completed"
  | "geo_result_cta_clicked"
  | "consult_submitted"
  | "estimate_submitted"
  | "pricing_viewed"
  | "order_started"
  // 아래 3개는 기능 개발 때 연결 (이름만 미리 정함)
  | "ad_check_run"
  | "payment_completed"
  | "signup_completed";

export type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(name: EventName, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: name, ...props });
  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", name, props);
  }
}
