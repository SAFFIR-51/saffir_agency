"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { acceptInviteToken } from "@/server/invites";
import { routes } from "@/shared/config";

/** 로그인한 계정으로 초대 수락 → 포털로 */
export async function acceptInviteAction(token: string) {
  const back = `/invite?token=${token}`;
  if (!(await getSession())) redirect(routes.auth.loginFrom(back));
  const result = await acceptInviteToken(token);
  if (!result.ok) redirect(`${back}&error=${encodeURIComponent(result.error)}` as Route);
  redirect(routes.portal.home);
}
