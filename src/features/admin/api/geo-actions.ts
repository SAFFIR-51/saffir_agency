"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GEO_AREAS, type GeoPlan, geoAdmin } from "@/server/geo";
import { requireStaff } from "@/server/projects";
import { routes } from "@/shared/config";

const text = (form: FormData, key: string, max = 300) =>
  String(form.get(key) ?? "")
    .trim()
    .slice(0, max);
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const score = (v: string) => {
  const x = Number(v);
  return Number.isInteger(x) && x >= 0 && x <= 100 ? x : null;
};
const plan = (v: string): GeoPlan => (v === "pro" ? "pro" : "free");
const at = (id: string, error?: string) =>
  `${routes.admin.geo}?id=${id}${error ? `&error=${error}` : ""}` as Route;

async function done(to: Route) {
  revalidatePath("/admin/geo");
  redirect(to);
}

/** 가입한 계정(이메일)에 사이트 연결. 이미 연결돼 있으면 주소·플랜만 바꾼다 */
export async function upsertGeoSiteAction(form: FormData) {
  await requireStaff(routes.admin.geo);
  const email = text(form, "email", 200).toLowerCase();
  const siteUrl = text(form, "siteUrl");
  if (!email || siteUrl.length < 4) redirect(`${routes.admin.geo}?error=site#new` as Route);
  const row = await geoAdmin
    .upsertSite({ email, siteUrl, plan: plan(text(form, "plan")) })
    .catch(() => null);
  if (!row?.id) redirect(`${routes.admin.geo}?error=nouser#new` as Route);
  await done(at(String(row.id)));
}

export async function updateGeoSiteAction(id: string, form: FormData) {
  await requireStaff(routes.admin.geo);
  const siteUrl = text(form, "siteUrl");
  await geoAdmin.updateSite(id, {
    ...(siteUrl.length >= 4 && { siteUrl }),
    plan: plan(text(form, "plan")),
  });
  await done(at(id));
}

export async function removeGeoSiteAction(id: string) {
  await requireStaff(routes.admin.geo);
  await geoAdmin.removeSite(id);
  await done(routes.admin.geo);
}

/**
 * 진단 결과 입력. 영역 점수 4개, 개선 우선순위(줄마다 하나),
 * AI 노출(구독 고객, 줄마다 "AI 이름, 나온 수, 질문 수")
 */
export async function addGeoDiagnosisAction(id: string, form: FormData) {
  await requireStaff(routes.admin.geo);
  const date = text(form, "date");
  const total = score(text(form, "score"));
  const areas = GEO_AREAS.map((name, i) => ({ name, score: score(text(form, `area${i}`)) }));
  if (!isDate(date) || total === null || areas.some((a) => a.score === null)) {
    redirect(`${at(id, "diagnosis")}#diagnosis` as Route);
  }
  const priorities = text(form, "priorities", 2000)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 10);
  const visibility = text(form, "visibility", 2000)
    .split("\n")
    .map((l) => l.split(",").map((x) => x.trim()))
    .filter((p) => p.length === 3 && p[0])
    .map(([ai = "", appeared = "", asked = ""]) => ({
      ai,
      appeared: Number(appeared),
      asked: Number(asked),
    }))
    .filter((v) => Number.isInteger(v.appeared) && Number.isInteger(v.asked) && v.asked > 0)
    .slice(0, 10);
  await geoAdmin.addDiagnosis(id, {
    date,
    score: total ?? 0,
    areas: areas.map((a) => ({ name: a.name, score: a.score ?? 0 })),
    priorities,
    ...(visibility.length > 0 && { visibility }),
  });
  await done(at(id));
}

export async function removeGeoDiagnosisAction(siteId: string, id: string) {
  await requireStaff(routes.admin.geo);
  await geoAdmin.removeDiagnosis(id);
  await done(at(siteId));
}

export async function addGeoAdCheckAction(id: string, form: FormData) {
  await requireStaff(routes.admin.geo);
  const date = text(form, "date");
  const summary = text(form, "summary");
  const risks = Number(text(form, "risks") || "0");
  if (!isDate(date) || !summary || !Number.isInteger(risks) || risks < 0 || risks > 100) {
    redirect(`${at(id, "adcheck")}#adcheck` as Route);
  }
  await geoAdmin.addAdCheck(id, { date, summary, risks });
  await done(at(id));
}

export async function removeGeoAdCheckAction(siteId: string, id: string) {
  await requireStaff(routes.admin.geo);
  await geoAdmin.removeAdCheck(id);
  await done(at(siteId));
}
