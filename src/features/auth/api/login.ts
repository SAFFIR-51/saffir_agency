"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { startSession, verifyDemoLogin } from "@/server/auth";
import { getClientKey, isRateLimited } from "@/server/inquiry";
import { routes, toInternalRoute } from "@/shared/config";
import type { ActionResult } from "@/shared/lib";
import { loginSchema } from "../model/schema";

export async function login(input: unknown): Promise<ActionResult<never>> {
  if (isRateLimited(`login:${await getClientKey()}`, { max: 10 })) {
    return {
      ok: false,
      error: "여러 번 틀렸습니다. 잠시 후 다시 시도하거나 비밀번호 찾기를 이용해 주세요.",
    };
  }
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "입력값을 확인해 주세요.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const account = verifyDemoLogin(parsed.data.email, parsed.data.password);
  if (!account) return { ok: false, error: "이메일 또는 비밀번호가 맞지 않습니다." };

  await startSession(account.id);
  redirect(toInternalRoute(parsed.data.next, routes.portal.home));
}
