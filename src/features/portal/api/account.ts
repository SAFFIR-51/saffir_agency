"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dataSource } from "@/server/api";
import { backendUpdateProfile } from "@/server/auth";
import { cancelInvite, sendInvite } from "@/server/invites";
import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";

/** 포털 계정: 회사·병원 정보 저장 (백엔드 모드만) */
export async function updateCompanyAction(form: FormData) {
  await requirePortal(routes.portal.account);
  if (dataSource() !== "api") return;
  const text = (key: string, max: number) =>
    String(form.get(key) ?? "")
      .trim()
      .slice(0, max);
  const result = await backendUpdateProfile({
    organization: text("organization", 200),
    businessNumber: text("businessNumber", 20),
    taxEmail: text("taxEmail", 200),
  });
  revalidatePath("/dashboard", "layout");
  redirect(
    (result.ok
      ? `${routes.portal.account}?saved=1`
      : `${routes.portal.account}?error=${encodeURIComponent(result.error)}`) as Route,
  );
}

/** 동료 초대 메일 보내기 (고객사에 연결된 계정만, 백엔드가 다시 확인) */
export async function inviteColleagueAction(form: FormData) {
  await requirePortal(routes.portal.account);
  if (dataSource() !== "api") return;
  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(
      `${routes.portal.account}?inviteError=${encodeURIComponent("이메일 형식을 확인해 주세요.")}#invite` as Route,
    );
  }
  const result = await sendInvite(email);
  revalidatePath("/dashboard", "layout");
  redirect(
    (result.ok
      ? `${routes.portal.account}?invited=${encodeURIComponent(email)}#invite`
      : `${routes.portal.account}?inviteError=${encodeURIComponent(result.error)}#invite`) as Route,
  );
}

export async function cancelInviteAction(id: string) {
  await requirePortal(routes.portal.account);
  if (dataSource() !== "api") return;
  await cancelInvite(id);
  revalidatePath("/dashboard", "layout");
}
