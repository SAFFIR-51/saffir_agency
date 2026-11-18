import "server-only";
import { apiFetch } from "../api";
import type { State } from "./store";
import type {
  Deliverable,
  PmClient,
  PmProject,
  PmRequest,
  PmStage,
  RequestPriority,
  RequestStatus,
  TaskStatus,
} from "./types";

/**
 * 백엔드(/api/pm) 응답 → 어드민 화면이 쓰는 모양(types.ts).
 * 백엔드 id는 숫자, 화면 id는 문자열. 요청 번호는 화면에서 REQ-001 꼴로 보인다.
 */

type ApiClient = {
  id: number;
  name: string;
  members: { userId: number; name: string; email: string }[];
};
type ApiProject = {
  id: number;
  name: string;
  clientOrgId: number | null;
  stage: string;
  pm: string | null;
  startDate: string | null;
  targetDate: string | null;
  archivedAt: string | null;
};
type ApiBoard = {
  project: ApiProject;
  /** 내부 계정으로 볼 때만 */
  payments?: {
    id: number;
    title: string;
    amount: number;
    date: string | null;
    paidAt: string | null;
    invoiceNumber: string | null;
  }[];
  milestones: {
    id: number;
    title: string;
    stage: string | null;
    date: string | null;
    shared: boolean;
    doneAt: string | null;
  }[];
  tasks: {
    id: number;
    title: string;
    stage: string | null;
    assignee: string | null;
    startDate: string | null;
    dueDate: string;
    status: string;
    shared: boolean;
    doneAt: string | null;
  }[];
  deliverables: {
    id: number;
    name: string;
    stage: string | null;
    version: string | null;
    url: string | null;
    note: string | null;
    status: string;
    milestoneId: number | null;
    requestedAt: string | null;
    decidedAt: string | null;
    decidedBy: string | null;
    feedback: string | null;
    date: string | null;
  }[];
  reports: {
    id: number;
    weekOf: string;
    done: string;
    next: string;
    issues: string;
    asks: string;
    author: string | null;
    sharedAt: string | null;
    updatedAt: string;
  }[];
  meetings: {
    id: number;
    date: string;
    title: string;
    attendees: string;
    decisions: string;
    actions: string;
    sharedAt: string | null;
  }[];
  activities?: { who: string; text: string; at: string }[];
};
type ApiRequest = {
  id: number;
  clientOrgId: number;
  projectId: number | null;
  kind: PmRequest["kind"];
  title: string;
  body: string;
  requestedBy: string;
  status: string;
  priority: string;
  assignee?: string;
  reply: string | null;
  repliedAt: string | null;
  memo?: string | null;
  createdAt: string;
};

const s = (n: number | null | undefined) => (n == null ? "" : String(n));
const day = (v: string | null | undefined) => (v ? v.slice(0, 10) : undefined);
/** "2026-11-16T05:03:00.000Z" → "2026-11-16 14:03" (한국 시간) */
const stamp = (iso: string) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(iso))
    .replace(",", "");

export const requestCode = (id: number | string) => `REQ-${String(id).padStart(3, "0")}`;
export const requestNumber = (code: string) => Number(code.replace(/^REQ-/, ""));

function toRequest(r: ApiRequest): PmRequest {
  return {
    id: requestCode(r.id),
    clientId: s(r.clientOrgId),
    projectId: r.projectId == null ? undefined : s(r.projectId),
    kind: r.kind,
    title: r.title,
    body: r.body,
    from: r.requestedBy,
    createdAt: day(r.createdAt) ?? "",
    status: r.status as RequestStatus,
    priority: r.priority as RequestPriority,
    assignee: r.assignee ?? "",
    reply: r.reply ?? undefined,
    repliedAt: r.repliedAt ?? undefined,
    memo: r.memo ?? undefined,
  };
}

function toProject(b: ApiBoard): PmProject {
  const p = b.project;
  return {
    id: s(p.id),
    clientId: s(p.clientOrgId),
    name: p.name,
    pm: p.pm ?? "",
    start: p.startDate ?? "",
    end: p.targetDate ?? "",
    stage: p.stage as PmStage,
    archivedAt: day(p.archivedAt),
    milestones: b.milestones.map((m) => ({
      id: s(m.id),
      title: m.title,
      stage: (m.stage ?? p.stage) as PmStage,
      due: m.date ?? "",
      doneAt: m.doneAt ?? undefined,
      shared: m.shared,
    })),
    tasks: b.tasks.map((t) => ({
      id: s(t.id),
      title: t.title,
      stage: (t.stage ?? p.stage) as PmStage,
      assignee: t.assignee ?? "",
      start: t.startDate ?? undefined,
      due: t.dueDate,
      status: t.status as TaskStatus,
      doneAt: t.doneAt ?? undefined,
      shared: t.shared,
    })),
    deliverables: b.deliverables.map((d) => ({
      id: s(d.id),
      stage: (d.stage ?? p.stage) as PmStage,
      name: d.name,
      version: d.version ?? "",
      link: d.url ?? "",
      note: d.note ?? "",
      status: d.status as Deliverable["status"],
      milestoneId: d.milestoneId == null ? undefined : s(d.milestoneId),
      requestedAt: d.requestedAt ?? undefined,
      decidedAt: d.decidedAt ?? undefined,
      decidedBy: d.decidedBy ?? undefined,
      feedback: d.feedback ?? undefined,
      updatedAt: d.date ?? "",
    })),
    reports: b.reports.map((r) => ({
      id: s(r.id),
      weekOf: r.weekOf,
      done: r.done,
      next: r.next,
      issues: r.issues,
      asks: r.asks,
      sharedAt: r.sharedAt ?? undefined,
      updatedAt: day(r.updatedAt) ?? "",
      author: r.author ?? "",
    })),
    meetings: b.meetings.map((m) => ({
      id: s(m.id),
      date: m.date,
      title: m.title,
      attendees: m.attendees,
      decisions: m.decisions,
      actions: m.actions,
      sharedAt: m.sharedAt ?? undefined,
    })),
    activity: (b.activities ?? []).map((a) => ({ at: stamp(a.at), who: a.who, text: a.text })),
    payments: (b.payments ?? []).map((x) => ({
      id: s(x.id),
      title: x.title,
      amount: x.amount,
      ...(x.date && { due: x.date }),
      ...(x.paidAt && { paidAt: stamp(x.paidAt).slice(0, 10) }),
      ...(x.invoiceNumber && { invoiceNumber: x.invoiceNumber }),
    })),
  };
}

/** 어드민 화면 한 번 그리는 데 필요한 데이터 전부 (내부 계정 쿠키로 호출) */
export async function loadRemoteState(): Promise<State> {
  const [clients, staff, list, requests] = await Promise.all([
    apiFetch<ApiClient[]>("/pm/clients"),
    apiFetch<{ name: string }[]>("/pm/staff"),
    apiFetch<ApiProject[]>("/pm/projects"),
    apiFetch<ApiRequest[]>("/pm/requests"),
  ]);
  const boards = await Promise.all(list.map((p) => apiFetch<ApiBoard>(`/pm/projects/${p.id}`)));
  return {
    clients: clients.map((c): PmClient => ({
      id: s(c.id),
      name: c.name,
      accountIds: c.members.map((m) => m.email),
      members: c.members,
    })),
    staff: staff.map((x) => x.name),
    projects: boards.map(toProject),
    requests: requests.map(toRequest),
    notifications: [],
    requestSeq: 0,
  };
}

type ApiPortal = {
  clients: { id: number; name: string }[];
  projects: ApiBoard[];
  requests: ApiRequest[];
  notifications: { clientOrgId: number; text: string; createdAt: string }[];
};

/**
 * 고객 포털용: 로그인한 고객 계정이 속한 고객사의 공개 항목만 (고객 쿠키로 호출).
 * 백엔드가 이미 공개 항목만 골라 주고, 화면은 같은 읽기 함수를 쓰도록 State 모양으로 맞춘다.
 */
export async function loadPortalState(accountId: string): Promise<State> {
  const portal = await apiFetch<ApiPortal>("/pm/portal");
  return {
    clients: portal.clients.map((c) => ({ id: s(c.id), name: c.name, accountIds: [accountId] })),
    staff: [],
    projects: portal.projects.map(toProject),
    requests: portal.requests.map(toRequest),
    notifications: portal.notifications.map((x) => ({
      clientId: s(x.clientOrgId),
      date: stamp(x.createdAt).slice(0, 10),
      text: x.text,
    })),
    requestSeq: 0,
  };
}

type ApiBilling = {
  payments: {
    id: number;
    projectName: string;
    title: string;
    amount: number;
    date: string | null;
    paidAt: string | null;
    invoiceNumber: string | null;
  }[];
  orders: {
    orderNo: string;
    productName: string;
    amount: number;
    paidAt: string | null;
    createdAt: string;
  }[];
};

/** 고객 포털 청구·결제 (프로젝트 청구 + 상품 결제). 날짜는 MM-DD */
export async function loadPortalBilling() {
  const b = await apiFetch<ApiBilling>("/pm/billing");
  const md = (v: string | null | undefined) => (v ? stamp(v).slice(5, 10) : "-");
  const kindOf = (title: string) =>
    /잔금/.test(title)
      ? ("외주 잔금" as const)
      : /계약금|착수금|선금/.test(title)
        ? ("외주 계약금" as const)
        : ("프로젝트 청구" as const);
  return [
    ...b.payments.map((p) => ({
      id: p.invoiceNumber ?? `PAY-${String(p.id).padStart(4, "0")}`,
      item: p.projectName ? `${p.projectName} · ${p.title}` : p.title,
      kind: kindOf(p.title),
      amount: p.amount,
      due: p.date ? p.date.slice(5, 10) : "-",
      status: p.paidAt ? ("결제 완료" as const) : ("미결제" as const),
      ...(p.paidAt && { paidAt: md(p.paidAt) }),
    })),
    ...b.orders.map((o) => ({
      id: o.orderNo,
      item: o.productName,
      kind: "상품 결제" as const,
      amount: o.amount,
      due: md(o.paidAt ?? o.createdAt),
      status: "결제 완료" as const,
      paidAt: md(o.paidAt ?? o.createdAt),
    })),
  ];
}
