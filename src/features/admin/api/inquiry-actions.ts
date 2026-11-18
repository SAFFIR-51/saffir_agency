"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type InquiryStatus, updateInquiry } from "@/server/inquiry";
import { requireStaff } from "@/server/projects";
import { routes } from "@/shared/config";

const STATUSES: InquiryStatus[] = ["new", "replied", "closed"];

/** 문의 처리: 상태·담당·내부 메모 저장 */
export async function updateInquiryAction(id: string, back: string, form: FormData) {
  await requireStaff(routes.admin.inquiries);
  const status = STATUSES.find((s) => s === form.get("status"));
  const text = (key: string, max: number) =>
    String(form.get(key) ?? "")
      .trim()
      .slice(0, max);
  await updateInquiry(id, {
    ...(status && { status }),
    ...(form.has("assignee") && { assignee: text("assignee", 100) }),
    ...(form.has("memo") && { memo: text("memo", 4000) }),
  });
  revalidatePath("/admin", "layout");
  redirect(back.startsWith("/admin/inquiries") ? (back as Route) : routes.admin.inquiries);
}
