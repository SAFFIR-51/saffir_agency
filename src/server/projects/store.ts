import "server-only";
import { randomUUID } from "node:crypto";
import { cache } from "react";
import { addDays, daysBetween, mondayOf, nowKST, todayKST, weekLabel } from "./dates";
import { seedClients, seedNotifications, seedProjects, seedRequests, seedStaff } from "./seed";
import { PM_STAGES } from "./types";
import type {
  Deliverable,
  Meeting,
  Milestone,
  PmClient,
  PmNotification,
  PmProject,
  PmRequest,
  PmStage,
  ProjectHealth,
  Report,
  RequestPriority,
  RequestStatus,
  Task,
  TaskStatus,
} from "./types";

/**
 * 프로젝트 관리 저장소. 지금은 서버 메모리(데모)라 서버를 다시 켜면 시드로 돌아간다.
 * 사이트 DB를 붙이면 이 파일의 함수 안쪽만 DB 조회·저장으로 바꾼다 (함수 모양은 유지).
 */
export type State = {
  clients: PmClient[];
  projects: PmProject[];
  requests: PmRequest[];
  notifications: PmNotification[];
  staff: string[];
  requestSeq: number;
};

/**
 * 데이터 모양이 바뀌면 이 숫자를 올린다. 개발 서버가 켜진 채로 코드를 바꿔도
 * 예전 모양의 메모리 데이터를 버리고 시드로 다시 시작한다 (예전 데이터로 화면이 깨지는 것 방지).
 */
const STORE_VERSION = 5;

const holder = globalThis as typeof globalThis & {
  __saffirPm?: State;
  __saffirPmVersion?: number;
};

function state(): State {
  if (holder.__saffirPmVersion !== STORE_VERSION) {
    holder.__saffirPm = undefined;
    holder.__saffirPmVersion = STORE_VERSION;
  }
  holder.__saffirPm ??= {
    clients: structuredClone(seedClients),
    projects: structuredClone(seedProjects),
    requests: structuredClone(seedRequests),
    notifications: structuredClone(seedNotifications),
    staff: [...seedStaff],
    requestSeq: 45,
  };
  return holder.__saffirPm;
}

const newId = () => randomUUID().slice(0, 8);

/**
 * 요청 하나 동안 쓸 데이터 사진. 백엔드 모드에서는 화면을 그리기 전에 loadPm()이 백엔드 데이터를
 * 여기에 넣고, 아래 읽기 함수들은 이걸 읽는다. 데모 모드에서는 비어 있어 메모리 저장소를 그대로 읽는다.
 */
const snapshotRef = cache((): { current: State | null } => ({ current: null }));

export function setSnapshot(snapshot: State) {
  snapshotRef().current = snapshot;
}

/** 지금 읽을 데이터 (렌더 중 백엔드 사진이 있으면 그것, 없으면 메모리 저장소) */
export function readState(): State {
  return snapshotRef().current ?? state();
}

/* ───────── 읽기 ───────── */

export const listStaff = () => readState().staff;
export const listClients = () => readState().clients;
export const getClient = (id: string) => readState().clients.find((c) => c.id === id) ?? null;
export const listProjects = () => readState().projects;
export const getProject = (id: string) => readState().projects.find((p) => p.id === id) ?? null;

export function listRequests(filter: { projectId?: string; clientId?: string } = {}) {
  return readState()
    .requests.filter(
      (r) =>
        (!filter.projectId || r.projectId === filter.projectId) &&
        (!filter.clientId || r.clientId === filter.clientId),
    )
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** 포털 계정이 속한 고객사 */
/* ───────── 계산 ───────── */

/** 진행률: 전체 마일스톤 중 완료 비율 (단계 전체 일정을 기준으로 한다) */
export function progressOf(project: PmProject) {
  const total = project.milestones.length;
  if (total === 0) return 0;
  return Math.round((project.milestones.filter((m) => m.doneAt).length / total) * 100);
}

export function nextMilestone(project: PmProject) {
  return project.milestones
    .filter((m) => !m.doneAt)
    .toSorted((a, b) => a.due.localeCompare(b.due))[0];
}

/** 상태: 마일스톤이 밀리면 지연, 작업이 밀리거나 보류가 있으면 주의 */
export function healthOf(
  project: PmProject,
  today = todayKST(),
): {
  health: ProjectHealth;
  reasons: string[];
} {
  const lateMilestones = project.milestones.filter((m) => !m.doneAt && m.due < today);
  const lateTasks = project.tasks.filter(
    (t) => t.status !== "완료" && t.status !== "보류" && t.due < today,
  );
  const held = project.tasks.filter((t) => t.status === "보류");
  const reasons = [
    ...lateMilestones.map((m) => `마일스톤 지연: ${m.title}`),
    ...lateTasks.map((t) => `작업 마감 지남: ${t.title}`),
    ...held.map((t) => `보류: ${t.title}`),
  ];
  const health: ProjectHealth =
    lateMilestones.length > 0 ? "지연" : lateTasks.length + held.length > 0 ? "주의" : "정상";
  return { health, reasons };
}

export function reportOfWeek(project: PmProject, weekOf: string) {
  return project.reports.find((r) => r.weekOf === weekOf) ?? null;
}

/**
 * 주간 보고 초안: 이번 주 끝낸 작업·마일스톤 → 한 일, 다음 주까지 마감인 작업 → 다음 할 일,
 * 보류·마감 지난 작업 → 이슈, 고객 답을 기다리는 요청 → 확인 요청. 고객 공개 작업만 쓴다.
 */
export function draftReport(project: PmProject, weekOf: string) {
  const end = addDays(weekOf, 6);
  const nextEnd = addDays(weekOf, 13);
  const shared = project.tasks.filter((t) => t.shared);
  const inWeek = (d?: string) => !!d && d >= weekOf && d <= end;
  const lines = (items: string[]) => items.join("\n");

  const done = [
    ...shared.filter((t) => t.status === "완료" && inWeek(t.doneAt)).map((t) => t.title),
    ...project.milestones
      .filter((m) => m.shared && inWeek(m.doneAt))
      .map((m) => `${m.title} (마일스톤)`),
  ];
  const next = shared
    .filter((t) => t.status !== "완료" && t.status !== "보류" && t.due <= nextEnd)
    .toSorted((a, b) => a.due.localeCompare(b.due))
    .map((t) => `${t.title} (~${t.due.slice(5)})`);
  const today = todayKST();
  const issues = [
    ...shared.filter((t) => t.status === "보류").map((t) => `${t.title}: 보류 중`),
    ...shared
      .filter((t) => t.status !== "완료" && t.status !== "보류" && t.due < today)
      .map((t) => `${t.title}: 마감(${t.due.slice(5)}) 지남`),
  ];
  const asks = project.deliverables
    .filter((d) => d.status === "승인 요청")
    .map((d) => `${d.name} ${d.version} 확인·승인 부탁드립니다.`);

  return { done: lines(done), next: lines(next), issues: lines(issues), asks: lines(asks) };
}

/* ───────── 쓰기 ───────── */

function mustProject(id: string) {
  const project = getProject(id);
  if (!project) throw new Error("프로젝트가 없습니다.");
  return project;
}

function notify(clientId: string, text: string) {
  state().notifications.unshift({ clientId, date: todayKST(), text });
}

export function setStage(projectId: string, stage: PmStage) {
  mustProject(projectId).stage = stage;
}

export function addMilestone(projectId: string, input: Omit<Milestone, "id" | "doneAt">) {
  mustProject(projectId).milestones.push({ id: newId(), ...input });
  mustProject(projectId).milestones.sort((a, b) => a.due.localeCompare(b.due));
}

export function toggleMilestone(projectId: string, milestoneId: string) {
  const project = mustProject(projectId);
  const m = project.milestones.find((x) => x.id === milestoneId);
  if (!m) return;
  m.doneAt = m.doneAt ? undefined : todayKST();
  if (m.doneAt && m.shared) notify(project.clientId, `마일스톤 완료: ${m.title}`);
}

export function toggleMilestoneShared(projectId: string, milestoneId: string) {
  const m = mustProject(projectId).milestones.find((x) => x.id === milestoneId);
  if (m) m.shared = !m.shared;
}

export function removeMilestone(projectId: string, milestoneId: string) {
  const project = mustProject(projectId);
  project.milestones = project.milestones.filter((m) => m.id !== milestoneId);
}

export function addTask(projectId: string, input: Omit<Task, "id" | "status" | "doneAt">) {
  mustProject(projectId).tasks.push({ id: newId(), status: "할 일", ...input });
}

export function updateTask(
  projectId: string,
  taskId: string,
  patch: Partial<Pick<Task, "status" | "assignee" | "due" | "shared">>,
) {
  const t = mustProject(projectId).tasks.find((x) => x.id === taskId);
  if (!t) return;
  Object.assign(t, patch);
  if (patch.status) t.doneAt = patch.status === "완료" ? (t.doneAt ?? todayKST()) : undefined;
}

export function removeTask(projectId: string, taskId: string) {
  const project = mustProject(projectId);
  project.tasks = project.tasks.filter((t) => t.id !== taskId);
}

export function saveReport(
  projectId: string,
  weekOf: string,
  input: Pick<Report, "done" | "next" | "issues" | "asks">,
  author: string,
) {
  const project = mustProject(projectId);
  const monday = mondayOf(weekOf);
  const existing = reportOfWeek(project, monday);
  if (existing) Object.assign(existing, input, { updatedAt: todayKST(), author });
  else {
    project.reports.push({ id: newId(), weekOf: monday, ...input, updatedAt: todayKST(), author });
    project.reports.sort((a, b) => b.weekOf.localeCompare(a.weekOf));
  }
}

export function shareReport(projectId: string, reportId: string, share: boolean) {
  const project = mustProject(projectId);
  const r = project.reports.find((x) => x.id === reportId);
  if (!r) return;
  r.sharedAt = share ? todayKST() : undefined;
  if (share) notify(project.clientId, `${weekLabel(r.weekOf)} 작업 보고가 올라왔습니다.`);
}

export function addMeeting(projectId: string, input: Omit<Meeting, "id" | "sharedAt">) {
  const project = mustProject(projectId);
  project.meetings.push({ id: newId(), ...input });
  project.meetings.sort((a, b) => b.date.localeCompare(a.date));
}

export function shareMeeting(projectId: string, meetingId: string, share: boolean) {
  const project = mustProject(projectId);
  const m = project.meetings.find((x) => x.id === meetingId);
  if (!m) return;
  m.sharedAt = share ? todayKST() : undefined;
  if (share) notify(project.clientId, `회의록이 올라왔습니다: ${m.title} (${m.date.slice(5)})`);
}

export function removeMeeting(projectId: string, meetingId: string) {
  const project = mustProject(projectId);
  project.meetings = project.meetings.filter((m) => m.id !== meetingId);
}

/** 고객이 포털에서 보내는 요청 */
export function createRequest(
  input: Pick<PmRequest, "clientId" | "projectId" | "kind" | "title" | "body" | "from"> &
    Partial<Pick<PmRequest, "priority" | "assignee">>,
) {
  const s = state();
  const id = `REQ-${String(s.requestSeq++).padStart(3, "0")}`;
  s.requests.push({
    id,
    ...input,
    createdAt: todayKST(),
    status: "접수",
    priority: input.priority ?? (input.kind === "장애 신고" ? "긴급" : "보통"),
    assignee: input.assignee ?? "",
  });
  return id;
}

export function editRequest(
  requestId: string,
  patch: Partial<Pick<PmRequest, "title" | "body" | "kind" | "projectId">>,
) {
  const r = state().requests.find((x) => x.id === requestId);
  if (r) Object.assign(r, patch);
}

export function removeRequest(requestId: string) {
  const s = state();
  s.requests = s.requests.filter((r) => r.id !== requestId);
}

export function updateRequest(
  requestId: string,
  patch: Partial<{
    status: RequestStatus;
    priority: RequestPriority;
    assignee: string;
    memo: string;
  }>,
) {
  const r = state().requests.find((x) => x.id === requestId);
  if (!r) return;
  const before = r.status;
  Object.assign(r, patch);
  if (patch.status && patch.status !== before)
    notify(r.clientId, `${r.id} ${r.title}: ${patch.status}`);
}

export function replyRequest(requestId: string, reply: string) {
  const r = state().requests.find((x) => x.id === requestId);
  if (!r) return;
  r.reply = reply;
  r.repliedAt = todayKST();
  if (r.status === "접수") r.status = "확인";
  notify(r.clientId, `${r.id}에 답변이 달렸습니다.`);
}

/* ───────── 기록 ───────── */

export function logActivity(projectId: string, who: string, text: string) {
  const project = getProject(projectId);
  if (!project) return;
  project.activity.unshift({ at: nowKST(), who, text });
  project.activity.length = Math.min(project.activity.length, 300);
}

/* ───────── 고치기 ───────── */

export function updateMilestone(
  projectId: string,
  milestoneId: string,
  patch: Partial<Pick<Milestone, "title" | "due" | "stage">>,
) {
  const project = mustProject(projectId);
  const m = project.milestones.find((x) => x.id === milestoneId);
  if (!m) return null;
  const before = { ...m };
  Object.assign(m, patch);
  project.milestones.sort((a, b) => a.due.localeCompare(b.due));
  if (patch.due && patch.due !== before.due && m.shared)
    notify(
      project.clientId,
      `일정 변경: ${m.title} ${before.due.slice(5)} → ${patch.due.slice(5)}`,
    );
  return before;
}

export function editTask(
  projectId: string,
  taskId: string,
  patch: Partial<Pick<Task, "title" | "due" | "start" | "stage">>,
) {
  const t = mustProject(projectId).tasks.find((x) => x.id === taskId);
  if (t) Object.assign(t, patch);
}

export function updateProjectInfo(
  projectId: string,
  patch: Partial<Pick<PmProject, "name" | "pm" | "start" | "end">>,
) {
  Object.assign(mustProject(projectId), patch);
}

/* ───────── 산출물 ───────── */

export function addDeliverable(
  projectId: string,
  input: Pick<Deliverable, "stage" | "name" | "version" | "link" | "note" | "milestoneId">,
) {
  const d: Deliverable = { id: newId(), ...input, status: "작성 중", updatedAt: todayKST() };
  mustProject(projectId).deliverables.push(d);
  return d;
}

export function editDeliverable(
  projectId: string,
  deliverableId: string,
  patch: Partial<Pick<Deliverable, "name" | "version" | "link" | "note" | "stage" | "milestoneId">>,
) {
  const d = mustProject(projectId).deliverables.find((x) => x.id === deliverableId);
  if (!d) return;
  Object.assign(d, patch, { updatedAt: todayKST() });
}

/** 고객에게 승인 요청 (다시 요청하면 이전 결과를 지운다) */
export function requestApproval(projectId: string, deliverableId: string) {
  const project = mustProject(projectId);
  const d = project.deliverables.find((x) => x.id === deliverableId);
  if (!d) return null;
  Object.assign(d, {
    status: "승인 요청",
    requestedAt: todayKST(),
    decidedAt: undefined,
    decidedBy: undefined,
    updatedAt: todayKST(),
  });
  notify(project.clientId, `${d.name} ${d.version}을(를) 확인하고 승인해 주세요.`);
  return d;
}

export function withdrawApproval(projectId: string, deliverableId: string) {
  const d = mustProject(projectId).deliverables.find((x) => x.id === deliverableId);
  if (d && d.status === "승인 요청")
    Object.assign(d, { status: "작성 중", requestedAt: undefined });
}

/** 고객이 포털에서 승인하거나 수정을 요청한다. 승인되면 연결된 마일스톤도 완료 */
export function decideDeliverable(
  projectId: string,
  deliverableId: string,
  decision: { approve: boolean; who: string; feedback?: string },
) {
  const project = mustProject(projectId);
  const d = project.deliverables.find((x) => x.id === deliverableId);
  if (!d || d.status !== "승인 요청") return null;
  Object.assign(d, {
    status: decision.approve ? "승인 완료" : "수정 요청",
    decidedAt: todayKST(),
    decidedBy: decision.who,
    feedback: decision.feedback || undefined,
    updatedAt: todayKST(),
  });
  if (decision.approve && d.milestoneId) {
    const m = project.milestones.find((x) => x.id === d.milestoneId);
    if (m && !m.doneAt) m.doneAt = todayKST();
  }
  logActivity(
    projectId,
    decision.who,
    decision.approve
      ? `산출물 '${d.name} ${d.version}'을(를) 승인했습니다.`
      : `산출물 '${d.name} ${d.version}' 수정을 요청했습니다: ${decision.feedback ?? ""}`,
  );
  return d;
}

export function removeDeliverable(projectId: string, deliverableId: string) {
  const project = mustProject(projectId);
  project.deliverables = project.deliverables.filter((d) => d.id !== deliverableId);
}

/* ───────── 청구 ───────── */

export function addPayment(
  projectId: string,
  input: { title: string; amount: number; due?: string },
) {
  const project = mustProject(projectId);
  const payment = { id: newId(), ...input };
  (project.payments ??= []).push(payment);
  const won = `${input.amount.toLocaleString("ko-KR")}원`;
  notify(
    project.clientId,
    `새 청구: ${input.title} ${won}${input.due ? ` (기한 ${input.due.slice(5)})` : ""}`,
  );
  return { payment, won };
}

export function markPaymentPaid(projectId: string, paymentId: string) {
  const payment = mustProject(projectId).payments?.find((x) => x.id === paymentId && !x.paidAt);
  if (payment) payment.paidAt = todayKST();
  return payment;
}

export function removePayment(projectId: string, paymentId: string) {
  const project = mustProject(projectId);
  const payment = project.payments?.find((x) => x.id === paymentId && !x.paidAt);
  if (payment) project.payments = project.payments?.filter((x) => x !== payment);
  return payment;
}

/* ───────── 새 프로젝트 ───────── */

const templateTitles: Record<PmStage, string> = {
  착수: "착수 미팅",
  기획: "기획 확정",
  디자인: "디자인 확정",
  개발: "개발 완료",
  검수: "검수 완료",
  운영: "오픈",
};

/** 단계 비율 (기간 대비 각 단계가 끝나는 지점) */
const templateRatio: Record<PmStage, number> = {
  착수: 0,
  기획: 0.15,
  디자인: 0.35,
  개발: 0.75,
  검수: 0.92,
  운영: 1,
};

export function createProject(input: {
  clientId?: string;
  clientName?: string;
  name: string;
  pm: string;
  start: string;
  end: string;
  stages: PmStage[];
}) {
  const s = state();
  let clientId = input.clientId;
  if (!clientId || !getClient(clientId)) {
    clientId = `c-${newId()}`;
    s.clients.push({ id: clientId, name: input.clientName || "새 고객사", accountIds: [] });
  }
  const span = Math.max(daysBetween(input.start, input.end), 1);
  const project: PmProject = {
    id: `p-${newId()}`,
    clientId,
    name: input.name,
    pm: input.pm,
    start: input.start,
    end: input.end,
    stage: input.stages[0] ?? "착수",
    milestones: PM_STAGES.filter((st) => input.stages.includes(st)).map((st) => ({
      id: newId(),
      title: templateTitles[st],
      stage: st,
      due: addDays(input.start, Math.round(span * templateRatio[st])),
      shared: true,
    })),
    tasks: [],
    reports: [],
    meetings: [],
    deliverables: [],
    activity: [],
  };
  s.projects.push(project);
  return project;
}

/* ───────── 보고·회의록 고치기 ───────── */

export function editMeeting(
  projectId: string,
  meetingId: string,
  patch: Partial<Omit<Meeting, "id" | "sharedAt">>,
) {
  const project = mustProject(projectId);
  const m = project.meetings.find((x) => x.id === meetingId);
  if (!m) return;
  Object.assign(m, patch);
  project.meetings.sort((a, b) => b.date.localeCompare(a.date));
}

export function removeReport(projectId: string, reportId: string) {
  const project = mustProject(projectId);
  project.reports = project.reports.filter((r) => r.id !== reportId);
}

/* ───────── 프로젝트 보관·삭제 ───────── */

export function archiveProject(projectId: string, archive: boolean) {
  mustProject(projectId).archivedAt = archive ? todayKST() : undefined;
}

export function deleteProject(projectId: string) {
  const s = state();
  s.projects = s.projects.filter((p) => p.id !== projectId);
  s.requests = s.requests.map((r) =>
    r.projectId === projectId ? { ...r, projectId: undefined } : r,
  );
}

/* ───────── 고객사 ───────── */

export function createClient(name: string) {
  const client: PmClient = { id: `c-${newId()}`, name, accountIds: [] };
  state().clients.push(client);
  return client;
}

export function renameClient(clientId: string, name: string) {
  const c = getClient(clientId);
  if (c) c.name = name;
}

/** 포털 계정 연결: 이 계정으로 로그인하면 이 고객사의 공개 항목을 본다 */
export function linkAccount(clientId: string, accountId: string) {
  const c = getClient(clientId);
  if (c && !c.accountIds.includes(accountId)) c.accountIds.push(accountId);
}

export function unlinkAccount(clientId: string, accountId: string) {
  const c = getClient(clientId);
  if (c) c.accountIds = c.accountIds.filter((a) => a !== accountId);
}

/** 프로젝트·요청이 없는 고객사만 지운다 */
export function removeClient(clientId: string) {
  const s = state();
  if (s.projects.some((p) => p.clientId === clientId)) return false;
  if (s.requests.some((r) => r.clientId === clientId)) return false;
  s.clients = s.clients.filter((c) => c.id !== clientId);
  return true;
}

/* ───────── 팀 ───────── */

export function addStaff(name: string) {
  const s = state();
  if (!s.staff.includes(name)) s.staff.push(name);
}

/** 이름을 바꾸면 담당·PM 표시도 같이 바뀐다 */
export function renameStaff(from: string, to: string) {
  const s = state();
  if (!s.staff.includes(from) || s.staff.includes(to)) return;
  s.staff = s.staff.map((n) => (n === from ? to : n));
  for (const p of s.projects) {
    if (p.pm === from) p.pm = to;
    for (const t of p.tasks) if (t.assignee === from) t.assignee = to;
  }
  for (const r of s.requests) if (r.assignee === from) r.assignee = to;
}

/** 빼면 맡던 작업·요청은 '미지정'이 된다 */
export function removeStaff(name: string) {
  const s = state();
  s.staff = s.staff.filter((n) => n !== name);
  for (const p of s.projects) for (const t of p.tasks) if (t.assignee === name) t.assignee = "";
  for (const r of s.requests) if (r.assignee === name) r.assignee = "";
}

/** 담당 수 (팀 화면) */
export function workloadOf(name: string) {
  const s = readState();
  return {
    pm: s.projects.filter((p) => p.pm === name && !p.archivedAt).length,
    tasks: s.projects
      .filter((p) => !p.archivedAt)
      .flatMap((p) => p.tasks)
      .filter((t) => t.assignee === name && t.status !== "완료").length,
    requests: s.requests.filter((r) => r.assignee === name && r.status !== "완료").length,
  };
}

export type { TaskStatus };
