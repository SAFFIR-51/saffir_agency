import "server-only";
import { apiFetch, dataSource } from "../api";

/**
 * 문의·견적 요청 (어드민 '문의' 화면).
 * 백엔드 모드면 /api/inquiries, 데모 모드면 서버 메모리 (예시 2건 + 이번 실행 중 들어온 것).
 */
export type InquiryKind = "contact" | "estimate";
export type InquiryStatus = "new" | "replied" | "closed";
export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "새 문의",
  replied: "연락함",
  closed: "종료",
};
export const INQUIRY_KIND_LABEL: Record<InquiryKind, string> = {
  contact: "문의",
  estimate: "견적 요청",
};

export type Inquiry = {
  id: string;
  kind: InquiryKind;
  name: string;
  company: string;
  phone: string;
  email: string;
  /** 문의 유형(문의하기) 또는 개발 분야(견적) */
  type: string;
  budget: string;
  schedule: string;
  platforms: string;
  readiness: string;
  reference: string;
  body: string;
  status: InquiryStatus;
  assignee: string;
  memo: string;
  /** YYYY-MM-DD HH:mm (한국 시간) */
  receivedAt: string;
};

/** 백엔드 inquiries 행 */
type ApiInquiry = {
  id: number;
  kind: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  projectType: string | null;
  budget: string | null;
  targetDate: string | null;
  platforms: string | null;
  readiness: string | null;
  reference: string | null;
  description: string | null;
  status: string;
  assignee: string | null;
  memo: string | null;
  receivedAt: string;
};

const stamp = (iso: string) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const statusOf = (v: string): InquiryStatus => (v === "replied" || v === "closed" ? v : "new");

function fromApi(r: ApiInquiry): Inquiry {
  return {
    id: String(r.id),
    kind: r.kind === "estimate" ? "estimate" : "contact",
    name: r.name,
    company: r.company ?? "",
    phone: r.phone ?? "",
    email: r.email ?? "",
    type: r.projectType ?? "",
    budget: r.budget ?? "",
    schedule: r.targetDate ?? "",
    platforms: r.platforms ?? "",
    readiness: r.readiness ?? "",
    reference: r.reference ?? "",
    body: r.description ?? "",
    status: statusOf(r.status),
    assignee: r.assignee ?? "",
    memo: r.memo ?? "",
    receivedAt: stamp(r.receivedAt),
  };
}

/** 화면 폼 값 → 백엔드 저장 모양 */
export function toApiInquiry(kind: InquiryKind, data: Record<string, unknown>) {
  const s = (key: string) => (typeof data[key] === "string" ? (data[key] as string) : "");
  const or = (v: string) => v || undefined;
  if (kind === "contact") {
    return {
      kind,
      name: s("contactName"),
      company: or(s("organization")),
      phone: or(s("phone")),
      projectType: or(s("type")),
      description: or(s("message")),
    };
  }
  return {
    kind,
    name: s("contactName"),
    company: or(s("company")),
    phone: or(s("phone")),
    email: or(s("email")),
    projectType: or(s("area")),
    budget: or(s("budget")),
    targetDate: or(s("schedule")),
    platforms: Array.isArray(data.platforms) ? or(data.platforms.join(", ")) : undefined,
    readiness: or(s("readiness")),
    reference: or(s("reference")),
    description: or(s("requirements")),
  };
}

/* ── 데모 모드: 메모리 ─────────────────────────── */

const holder = globalThis as typeof globalThis & { __saffirInquiries?: Inquiry[] };
const blank = {
  email: "",
  budget: "",
  schedule: "",
  platforms: "",
  readiness: "",
  reference: "",
  assignee: "",
  memo: "",
};
function memory() {
  holder.__saffirInquiries ??= [
    {
      ...blank,
      id: "2",
      kind: "estimate",
      name: "예시 담당자",
      company: "예시 커머스",
      phone: "010-0000-0000",
      email: "sample@example.com",
      type: "웹 서비스",
      budget: "3,000만~5,000만 원",
      schedule: "3월 오픈 희망",
      platforms: "웹, 관리자",
      readiness: "기획서 있음",
      body: "(예시) 자사몰 리뉴얼과 정기 구독 결제를 함께 하고 싶습니다.",
      status: "new",
      receivedAt: "2026-11-14 10:20",
    },
    {
      ...blank,
      id: "1",
      kind: "contact",
      name: "예시 실장",
      company: "예시 치과의원",
      phone: "010-0000-0000",
      type: "GEO 진단",
      body: "(예시) AI 검색에서 우리 병원이 어떻게 보이는지 상담 받고 싶습니다.",
      status: "replied",
      assignee: "데모 PM",
      memo: "11/13 전화 상담, 진단 리포트 보내기로 함",
      receivedAt: "2026-11-12 15:02",
    },
  ];
  return holder.__saffirInquiries;
}

export function rememberInquiry(kind: InquiryKind, data: Record<string, unknown>) {
  const list = memory();
  const row = toApiInquiry(kind, data);
  const id = String(Math.max(0, ...list.map((x) => Number(x.id))) + 1);
  list.unshift({
    ...blank,
    id,
    kind,
    name: row.name,
    company: row.company ?? "",
    phone: row.phone ?? "",
    email: ("email" in row && row.email) || "",
    type: row.projectType ?? "",
    budget: ("budget" in row && row.budget) || "",
    schedule: ("targetDate" in row && row.targetDate) || "",
    platforms: ("platforms" in row && row.platforms) || "",
    readiness: ("readiness" in row && row.readiness) || "",
    reference: ("reference" in row && row.reference) || "",
    body: row.description ?? "",
    status: "new",
    receivedAt: stamp(new Date().toISOString()),
  });
  return id;
}

/* ── 읽기·쓰기 (두 모드 공통) ─────────────────────── */

export async function listInquiries(filter: { status?: InquiryStatus; kind?: InquiryKind } = {}) {
  if (dataSource() === "api") {
    const q = new URLSearchParams({ limit: "100" });
    if (filter.status) q.set("status", filter.status);
    if (filter.kind) q.set("kind", filter.kind);
    const res = await apiFetch<{ data: ApiInquiry[] }>(`/inquiries?${q}`);
    return res.data.map(fromApi);
  }
  return memory().filter(
    (x) =>
      (!filter.status || x.status === filter.status) && (!filter.kind || x.kind === filter.kind),
  );
}

export async function inquiryCounts(): Promise<Record<InquiryStatus, number>> {
  const counts = { new: 0, replied: 0, closed: 0 };
  if (dataSource() === "api") {
    const res = await apiFetch<Record<string, number>>("/inquiries/counts");
    for (const [k, n] of Object.entries(res)) counts[statusOf(k)] += n;
    return counts;
  }
  for (const x of memory()) counts[x.status] += 1;
  return counts;
}

export async function updateInquiry(
  id: string,
  patch: Partial<Pick<Inquiry, "status" | "assignee" | "memo">>,
) {
  if (dataSource() === "api") {
    await apiFetch(`/inquiries/${Number(id)}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    return;
  }
  const row = memory().find((x) => x.id === id);
  if (row) Object.assign(row, patch);
}
