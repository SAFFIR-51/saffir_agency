"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePortal } from "@/server/portal";
import { createRequest } from "@/server/projects";
import { routes } from "@/shared/config";

const kinds = ["수정 요청", "장애 신고", "문의"] as const;

/** 고객이 포털에서 보내는 요청 → 어드민 요청함으로 들어간다 */
export async function sendRequest(form: FormData) {
  const { session, data } = await requirePortal(routes.portal.requests);
  const target = data.requestTargets[Number(form.get("target") ?? 0)];
  const kind = kinds.find((k) => k === form.get("kind"));
  const title = String(form.get("title") ?? "")
    .trim()
    .slice(0, 120);
  const body = String(form.get("body") ?? "")
    .trim()
    .slice(0, 4000);
  if (!target || !kind || !title || !body) {
    redirect(`${routes.portal.requests}?error=1#new` as Route);
  }
  const id = createRequest({
    clientId: target.clientId,
    projectId: target.projectId,
    kind,
    title,
    body,
    from: session.name,
  });
  revalidatePath("/dashboard", "layout");
  revalidatePath("/admin", "layout");
  redirect(`${routes.portal.requests}?sent=${id}` as Route);
}
