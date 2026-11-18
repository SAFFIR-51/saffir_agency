import "server-only";
import { apiFetch, dataSource } from "../api";
import { isProduction } from "../env";
import { type InquiryKind, rememberInquiry, toApiInquiry } from "./store";

export type SaveResult =
  { ok: true; id: string } | { ok: false; reason: "not-configured" | "delivery-failed" };

/**
 * 문의·견적 접수.
 * - 백엔드 모드(API_URL): DB(inquiries)에 저장하고 백엔드가 담당자 메일을 보낸다. 어드민 '문의'에서 관리.
 * - 데모 모드: INQUIRY_WEBHOOK_URL이 있으면 그 주소(슬랙, 메일 자동화 등)로 보내고, 어드민 확인용으로 메모리에도 남긴다.
 * - 개발 환경에서 주소가 없으면 서버 로그에만 남기고 성공으로 처리한다.
 * - 운영 환경에서 주소가 없으면 실패로 돌려준다. 문의가 아무 데도 저장되지 않은 채 "접수됨"으로 보이지 않게 하기 위해서다.
 */
export async function saveInquiry(
  kind: InquiryKind,
  data: Record<string, unknown>,
): Promise<SaveResult> {
  if (dataSource() === "api") {
    try {
      const row = await apiFetch<{ id: number }>("/inquiries", {
        method: "POST",
        body: JSON.stringify(toApiInquiry(kind, data)),
      });
      return { ok: true, id: String(row.id) };
    } catch {
      return { ok: false, reason: "delivery-failed" };
    }
  }

  const id = rememberInquiry(kind, data);
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhook) {
    if (isProduction) return { ok: false, reason: "not-configured" };
    console.info(`[inquiry:${kind}]`, id, data);
    return { ok: true, id };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, receivedAt: new Date().toISOString(), data }),
      signal: AbortSignal.timeout(5000),
    });
    return response.ok ? { ok: true, id } : { ok: false, reason: "delivery-failed" };
  } catch {
    return { ok: false, reason: "delivery-failed" };
  }
}
