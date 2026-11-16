import "server-only";
import { apiFetch } from "../api";
import type { GeoData } from "../portal/types";

/**
 * GEO 진단 기록 (백엔드 /api/geo). 진단은 사피어가 하고 결과를 어드민에서 입력한다.
 * 고객 포털은 loadMyGeo(), 어드민은 나머지.
 */
export const GEO_AREAS = [
  "검색 노출 기본",
  "구조화데이터",
  "진료 정보 콘텐츠",
  "신뢰 신호",
] as const;
export type GeoPlan = "free" | "pro";
export const GEO_PLAN_LABEL: Record<GeoPlan, string> = { free: "무료 진단", pro: "GEO 구독" };

type ApiDiagnosis = {
  id: number;
  date: string;
  score: number;
  areas: { name: string; score: number }[];
  priorities: string[];
  visibility: { ai: string; appeared: number; asked: number }[] | null;
};
type ApiAdCheck = { id: number; date: string; summary: string; risks: number };
type ApiSite = { id: number; siteUrl: string; plan: string };

const planOf = (v: string): GeoPlan => (v === "pro" ? "pro" : "free");

/** 고객 포털 GEO 화면 데이터. 사이트가 연결되지 않았거나 진단이 없으면 null */
export async function loadMyGeo(): Promise<GeoData | null> {
  const me = await apiFetch<{
    site: ApiSite | null;
    diagnoses: ApiDiagnosis[];
    adChecks: ApiAdCheck[];
    adCheckFreeLeft: number | null;
  }>("/geo/me");
  const latest = me.diagnoses.at(-1);
  if (!me.site || !latest) return null;
  return {
    site: me.site.siteUrl,
    latest: {
      date: latest.date,
      score: latest.score,
      areas: latest.areas,
      priorities: latest.priorities,
    },
    history: me.diagnoses.map((d) => ({ date: d.date, score: d.score })),
    ...(latest.visibility?.length && { visibility: latest.visibility }),
    adChecks: me.adChecks.map((c) => ({ date: c.date, summary: c.summary, risks: c.risks })),
    ...(me.adCheckFreeLeft !== null && { adCheckFreeLeft: me.adCheckFreeLeft }),
  };
}

/* ───── 어드민 ───── */

export type GeoSiteRow = {
  id: string;
  siteUrl: string;
  plan: GeoPlan;
  name: string;
  email: string;
  organization: string;
  diagnosisCount: number;
  latest: { date: string; score: number } | null;
  adCheckCount: number;
};

export type GeoSiteDetail = {
  id: string;
  siteUrl: string;
  plan: GeoPlan;
  name: string;
  email: string;
  organization: string;
  diagnoses: (Omit<ApiDiagnosis, "id"> & { id: string })[];
  adChecks: (Omit<ApiAdCheck, "id"> & { id: string })[];
};

type ApiSiteRow = ApiSite & {
  name: string;
  email: string;
  organization: string | null;
  diagnosisCount: number;
  latest: { date: string; score: number } | null;
  adCheckCount: number;
};

export async function listGeoSites(): Promise<GeoSiteRow[]> {
  const rows = await apiFetch<ApiSiteRow[]>("/geo/sites");
  return rows.map((r) => ({
    ...r,
    id: String(r.id),
    plan: planOf(r.plan),
    organization: r.organization ?? "",
  }));
}

export async function getGeoSite(id: string): Promise<GeoSiteDetail | null> {
  const n = Number(id);
  if (!Number.isInteger(n)) return null;
  const r = await apiFetch<{
    site: ApiSite & { name: string; email: string; organization: string | null };
    diagnoses: ApiDiagnosis[];
    adChecks: ApiAdCheck[];
  }>(`/geo/sites/${n}`).catch(() => null);
  if (!r) return null;
  return {
    ...r.site,
    id: String(r.site.id),
    plan: planOf(r.site.plan),
    organization: r.site.organization ?? "",
    diagnoses: r.diagnoses.map((d) => ({ ...d, id: String(d.id) })).toReversed(),
    adChecks: r.adChecks.map((c) => ({ ...c, id: String(c.id) })),
  };
}

const send = (path: `/${string}`, method: string, body?: unknown) =>
  apiFetch<{ id?: number }>(path, {
    method,
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
const n = (id: string) => Number(id);

export const geoAdmin = {
  upsertSite: (body: { email: string; siteUrl: string; plan: GeoPlan }) =>
    send("/geo/sites", "POST", body),
  updateSite: (id: string, body: { siteUrl?: string; plan?: GeoPlan }) =>
    send(`/geo/sites/${n(id)}`, "PATCH", body),
  removeSite: (id: string) => send(`/geo/sites/${n(id)}`, "DELETE"),
  addDiagnosis: (
    id: string,
    body: {
      date: string;
      score: number;
      areas: { name: string; score: number }[];
      priorities: string[];
      visibility?: { ai: string; appeared: number; asked: number }[];
    },
  ) => send(`/geo/sites/${n(id)}/diagnoses`, "POST", body),
  removeDiagnosis: (id: string) => send(`/geo/diagnoses/${n(id)}`, "DELETE"),
  addAdCheck: (id: string, body: { date: string; summary: string; risks: number }) =>
    send(`/geo/sites/${n(id)}/ad-checks`, "POST", body),
  removeAdCheck: (id: string) => send(`/geo/ad-checks/${n(id)}`, "DELETE"),
};
