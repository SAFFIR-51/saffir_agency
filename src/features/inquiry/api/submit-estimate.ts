"use server";

import { z } from "zod";
import { getClientKey, isRateLimited, saveInquiry } from "@/server/inquiry";
import type { ActionResult } from "@/shared/lib";
import { estimateSchema } from "../model/schema";
import { failureMessages } from "./messages";

/**
 * 공개 폼이라 로그인 확인은 없다. 누구나 호출할 수 있는 주소이므로
 * 반복 제출을 막고, 같은 스키마로 다시 검증하고, 화면에 필요한 값만 돌려준다 (frontend-guide 8·10번).
 */
export async function submitEstimate(input: unknown): Promise<ActionResult<{ id: string }>> {
  if (isRateLimited(`estimate:${await getClientKey()}`)) {
    return { ok: false, error: failureMessages.rateLimited };
  }

  const parsed = estimateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: failureMessages.invalid,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { agree: _agree, ...data } = parsed.data;
  const saved = await saveInquiry("estimate", data);
  if (!saved.ok) return { ok: false, error: failureMessages.unavailable };
  return { ok: true, data: { id: saved.id } };
}
