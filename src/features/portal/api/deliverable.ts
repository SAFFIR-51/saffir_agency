"use server";

import { revalidatePath } from "next/cache";
import { requirePortal } from "@/server/portal";
import { decideDeliverable } from "@/server/projects";
import { routes } from "@/shared/config";

/** 고객이 산출물을 승인하거나 수정을 요청한다 (자기 고객사 프로젝트만) */
export async function decideDeliverableAction(
  projectId: string,
  deliverableId: string,
  form: FormData,
) {
  const { session, data } = await requirePortal(routes.portal.project(projectId));
  if (!data.projects.some((p) => p.id === projectId)) return;
  const approve = form.get("decision") === "approve";
  const feedback = String(form.get("feedback") ?? "")
    .trim()
    .slice(0, 1000);
  if (!approve && !feedback) return;
  decideDeliverable(projectId, deliverableId, { approve, who: session.name, feedback });
  revalidatePath("/dashboard", "layout");
  revalidatePath("/admin", "layout");
}
