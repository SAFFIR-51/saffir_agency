"use server";

import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  PM_STAGES,
  REQUEST_PRIORITIES,
  REQUEST_STATUSES,
  TASK_STATUSES,
  addDeliverable,
  addStaff,
  archiveProject,
  createClient,
  createRequest,
  deleteProject,
  editMeeting,
  editRequest,
  linkAccount,
  removeClient,
  removeReport,
  removeRequest,
  removeStaff,
  renameClient,
  renameStaff,
  unlinkAccount,
  addMeeting,
  addMilestone,
  addTask,
  createProject,
  editDeliverable,
  editTask,
  getProject,
  listRequests,
  logActivity,
  removeDeliverable,
  removeMeeting,
  removeMilestone,
  removeTask,
  replyRequest,
  requestApproval,
  requireStaff,
  saveReport,
  setStage,
  shareMeeting,
  shareReport,
  toggleMilestone,
  toggleMilestoneShared,
  updateMilestone,
  updateProjectInfo,
  updateRequest,
  updateTask,
  weekLabel,
  withdrawApproval,
  type PmStage,
  type TaskStatus,
} from "@/server/projects";
import { demoAccounts } from "@/server/auth";
import { routes } from "@/shared/config";

/**
 * 어드민 저장 동작. 모두 내부 계정만 쓸 수 있고, 바뀐 내용은 어드민과 고객 포털에 바로 보인다.
 * 바꾼 사람과 내용은 프로젝트 '기록'에 남긴다.
 */

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const date = (form: FormData, key: string) => {
  const v = text(form, key);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
};
const pick = <T extends string>(list: readonly T[], value: string) =>
  list.includes(value as T) ? (value as T) : undefined;

function refresh() {
  revalidatePath("/admin", "layout");
  revalidatePath("/dashboard", "layout");
}

async function staff() {
  return requireStaff(routes.admin.home);
}

/** 바꾸고, 기록하고, 화면을 새로 그린다 */
async function act(projectId: string, change: () => string | void) {
  const session = await staff();
  const note = change();
  if (note) logActivity(projectId, session.name, note);
  refresh();
}

const titleOf = (projectId: string, kind: "milestones" | "tasks", id: string) =>
  getProject(projectId)?.[kind].find((x) => x.id === id)?.title ?? "";

/* 프로젝트 */

export async function createProjectAction(form: FormData) {
  const session = await staff();
  const name = text(form, "name");
  const start = date(form, "start");
  const end = date(form, "end");
  if (!name || !start || !end || end < start) {
    redirect(`${routes.admin.newProject}?error=1` as Route);
  }
  const stages = PM_STAGES.filter((s) => form.get(`stage-${s}`) === "on");
  const project = createProject({
    clientId: text(form, "clientId") || undefined,
    clientName: text(form, "clientName"),
    name,
    pm: text(form, "pm") || session.name,
    start,
    end,
    stages: stages.length > 0 ? stages : [...PM_STAGES],
  });
  logActivity(project.id, session.name, "프로젝트를 만들었습니다.");
  refresh();
  redirect(routes.admin.project(project.id));
}

export async function updateProjectAction(projectId: string, form: FormData) {
  await act(projectId, () => {
    const start = date(form, "start");
    const end = date(form, "end");
    updateProjectInfo(projectId, {
      ...(text(form, "name") && { name: text(form, "name") }),
      ...(text(form, "pm") && { pm: text(form, "pm") }),
      ...(start && { start }),
      ...(end && end >= (start || "") && { end }),
    });
    return "프로젝트 정보를 바꿨습니다.";
  });
}

export async function setStageAction(projectId: string, form: FormData) {
  const stage = pick(PM_STAGES, text(form, "stage"));
  await act(projectId, () => {
    if (!stage) return;
    setStage(projectId, stage);
    return `단계를 '${stage}'(으)로 바꿨습니다.`;
  });
}

/* 마일스톤 */

export async function addMilestoneAction(projectId: string, form: FormData) {
  const title = text(form, "title");
  const due = date(form, "due");
  const stage = pick(PM_STAGES, text(form, "stage"));
  await act(projectId, () => {
    if (!title || !due || !stage) return;
    addMilestone(projectId, { title, due, stage, shared: form.get("shared") === "on" });
    return `마일스톤 '${title}'(${due.slice(5)})을 추가했습니다.`;
  });
}

export async function editMilestoneAction(projectId: string, milestoneId: string, form: FormData) {
  const title = text(form, "title");
  const due = date(form, "due");
  const stage = pick(PM_STAGES, text(form, "stage"));
  await act(projectId, () => {
    const before = updateMilestone(projectId, milestoneId, {
      ...(title && { title }),
      ...(due && { due }),
      ...(stage && { stage }),
    });
    if (!before) return;
    return before.due !== due && due
      ? `마일스톤 '${title || before.title}' 일정을 ${before.due.slice(5)} → ${due.slice(5)}로 바꿨습니다.`
      : `마일스톤 '${title || before.title}'을 고쳤습니다.`;
  });
  redirect(routes.admin.project(projectId));
}

export async function toggleMilestoneAction(projectId: string, milestoneId: string) {
  await act(projectId, () => {
    toggleMilestone(projectId, milestoneId);
    const m = getProject(projectId)?.milestones.find((x) => x.id === milestoneId);
    return m ? `마일스톤 '${m.title}'을 ${m.doneAt ? "완료했습니다" : "완료 취소했습니다"}.` : "";
  });
}

export async function toggleMilestoneSharedAction(projectId: string, milestoneId: string) {
  await act(projectId, () => {
    toggleMilestoneShared(projectId, milestoneId);
  });
}

export async function removeMilestoneAction(projectId: string, milestoneId: string) {
  const title = titleOf(projectId, "milestones", milestoneId);
  await act(projectId, () => {
    removeMilestone(projectId, milestoneId);
    return `마일스톤 '${title}'을 지웠습니다.`;
  });
}

/* 작업 */

export async function addTaskAction(projectId: string, form: FormData) {
  const title = text(form, "title");
  const due = date(form, "due");
  const start = date(form, "start");
  const stage = pick(PM_STAGES, text(form, "stage"));
  await act(projectId, () => {
    if (!title || !due || !stage) return;
    addTask(projectId, {
      title,
      due,
      ...(start && start <= due && { start }),
      stage,
      assignee: text(form, "assignee"),
      shared: form.get("shared") === "on",
    });
    return `작업 '${title}'을 추가했습니다.`;
  });
}

export async function updateTaskAction(projectId: string, taskId: string, form: FormData) {
  const status = pick(TASK_STATUSES, text(form, "status"));
  const assignee = form.has("assignee") ? text(form, "assignee") : undefined;
  await act(projectId, () => {
    updateTask(projectId, taskId, {
      ...(status && { status }),
      ...(assignee !== undefined && { assignee }),
    });
    const title = titleOf(projectId, "tasks", taskId);
    if (status) return `작업 '${title}' → ${status}`;
    if (assignee !== undefined) return `작업 '${title}' 담당 → ${assignee || "미지정"}`;
  });
}

/** 보드에서 끌어다 놓을 때 */
export async function moveTaskAction(projectId: string, taskId: string, status: TaskStatus) {
  if (!TASK_STATUSES.includes(status)) return;
  await act(projectId, () => {
    updateTask(projectId, taskId, { status });
    return `작업 '${titleOf(projectId, "tasks", taskId)}' → ${status}`;
  });
}

export async function editTaskAction(projectId: string, taskId: string, form: FormData) {
  const title = text(form, "title");
  const due = date(form, "due");
  const start = date(form, "start");
  const stage = pick(PM_STAGES, text(form, "stage"));
  await act(projectId, () => {
    editTask(projectId, taskId, {
      ...(title && { title }),
      ...(due && { due }),
      start: start && (!due || start <= due) ? start : undefined,
      ...(stage && { stage }),
    });
    return `작업 '${title}'을 고쳤습니다.`;
  });
  redirect(`${routes.admin.project(projectId)}?view=${text(form, "view") || "table"}` as Route);
}

export async function toggleTaskSharedAction(projectId: string, taskId: string, shared: boolean) {
  await act(projectId, () => {
    updateTask(projectId, taskId, { shared: !shared });
  });
}

export async function removeTaskAction(projectId: string, taskId: string) {
  const title = titleOf(projectId, "tasks", taskId);
  await act(projectId, () => {
    removeTask(projectId, taskId);
    return `작업 '${title}'을 지웠습니다.`;
  });
}

/* 산출물 */

export async function addDeliverableAction(projectId: string, form: FormData) {
  const name = text(form, "name");
  const stage = pick(PM_STAGES, text(form, "stage")) as PmStage | undefined;
  let created = "";
  await act(projectId, () => {
    if (!name || !stage) return;
    const d = addDeliverable(projectId, {
      name,
      stage,
      version: text(form, "version") || "v1",
      link: text(form, "link"),
      note: text(form, "note"),
      milestoneId: text(form, "milestoneId") || undefined,
    });
    created = d.id;
    if (form.get("intent") === "request") {
      requestApproval(projectId, d.id);
      return `산출물 '${d.name} ${d.version}'을 올리고 승인을 요청했습니다.`;
    }
    return `산출물 '${d.name} ${d.version}'을 올렸습니다.`;
  });
  if (!created) redirect(`${routes.admin.projectDeliverables(projectId)}?error=1` as Route);
}

export async function editDeliverableAction(
  projectId: string,
  deliverableId: string,
  form: FormData,
) {
  await act(projectId, () => {
    editDeliverable(projectId, deliverableId, {
      ...(text(form, "name") && { name: text(form, "name") }),
      ...(text(form, "version") && { version: text(form, "version") }),
      link: text(form, "link"),
      note: text(form, "note"),
      milestoneId: text(form, "milestoneId") || undefined,
    });
    return `산출물 '${text(form, "name")}'을 고쳤습니다.`;
  });
  redirect(routes.admin.projectDeliverables(projectId));
}

export async function requestApprovalAction(projectId: string, deliverableId: string) {
  await act(projectId, () => {
    const d = requestApproval(projectId, deliverableId);
    return d ? `산출물 '${d.name} ${d.version}' 승인을 요청했습니다.` : "";
  });
}

export async function withdrawApprovalAction(projectId: string, deliverableId: string) {
  await act(projectId, () => {
    withdrawApproval(projectId, deliverableId);
    return "승인 요청을 거뒀습니다.";
  });
}

/** 수정 요청을 받은 산출물에 새 버전을 올린다 */
export async function newVersionAction(projectId: string, deliverableId: string, form: FormData) {
  const version = text(form, "version");
  await act(projectId, () => {
    if (!version) return;
    editDeliverable(projectId, deliverableId, {
      version,
      ...(text(form, "link") && { link: text(form, "link") }),
      ...(text(form, "note") && { note: text(form, "note") }),
    });
    const d = requestApproval(projectId, deliverableId);
    return d ? `산출물 '${d.name}' ${version}을 올리고 다시 승인을 요청했습니다.` : "";
  });
}

export async function removeDeliverableAction(projectId: string, deliverableId: string) {
  await act(projectId, () => {
    const d = getProject(projectId)?.deliverables.find((x) => x.id === deliverableId);
    removeDeliverable(projectId, deliverableId);
    return d ? `산출물 '${d.name} ${d.version}'을 지웠습니다.` : "";
  });
}

/* 보고·회의록 */

export async function saveReportAction(projectId: string, weekOf: string, form: FormData) {
  const { name: author } = await staff();
  await act(projectId, () => {
    saveReport(
      projectId,
      weekOf,
      {
        done: text(form, "done"),
        next: text(form, "next"),
        issues: text(form, "issues"),
        asks: text(form, "asks"),
      },
      author,
    );
    if (form.get("intent") === "share") {
      const report = getProject(projectId)?.reports.find((r) => r.weekOf === weekOf);
      if (report) shareReport(projectId, report.id, true);
      return `${weekLabel(weekOf)} 보고를 저장하고 고객에게 공유했습니다.`;
    }
    return `${weekLabel(weekOf)} 보고를 저장했습니다.`;
  });
}

export async function shareReportAction(projectId: string, reportId: string, share: boolean) {
  await act(projectId, () => {
    shareReport(projectId, reportId, share);
    const r = getProject(projectId)?.reports.find((x) => x.id === reportId);
    return r ? `${weekLabel(r.weekOf)} 보고 ${share ? "공유" : "공유 취소"}` : "";
  });
}

export async function addMeetingAction(projectId: string, form: FormData) {
  const title = text(form, "title");
  const meetingDate = date(form, "date");
  await act(projectId, () => {
    if (!title || !meetingDate) return;
    addMeeting(projectId, {
      title,
      date: meetingDate,
      attendees: text(form, "attendees"),
      decisions: text(form, "decisions"),
      actions: text(form, "actions"),
    });
    return `회의록 '${title}'을 남겼습니다.`;
  });
}

export async function shareMeetingAction(projectId: string, meetingId: string, share: boolean) {
  await act(projectId, () => {
    shareMeeting(projectId, meetingId, share);
    const m = getProject(projectId)?.meetings.find((x) => x.id === meetingId);
    return m ? `회의록 '${m.title}' ${share ? "공유" : "공유 취소"}` : "";
  });
}

export async function removeMeetingAction(projectId: string, meetingId: string) {
  await act(projectId, () => {
    removeMeeting(projectId, meetingId);
    return "회의록을 지웠습니다.";
  });
}

/* 요청 */

const projectOfRequest = (requestId: string) =>
  listRequests().find((r) => r.id === requestId)?.projectId;

export async function updateRequestAction(requestId: string, form: FormData) {
  const session = await staff();
  const status = pick(REQUEST_STATUSES, text(form, "status"));
  const priority = pick(REQUEST_PRIORITIES, text(form, "priority"));
  updateRequest(requestId, {
    ...(status && { status }),
    ...(priority && { priority }),
    ...(form.has("assignee") && { assignee: text(form, "assignee") }),
    ...(form.has("memo") && { memo: text(form, "memo") }),
  });
  const projectId = projectOfRequest(requestId);
  if (projectId && status) logActivity(projectId, session.name, `요청 ${requestId} → ${status}`);
  refresh();
}

export async function replyRequestAction(requestId: string, form: FormData) {
  const session = await staff();
  const reply = text(form, "reply");
  if (reply) replyRequest(requestId, reply);
  const projectId = projectOfRequest(requestId);
  if (projectId && reply) logActivity(projectId, session.name, `요청 ${requestId}에 답변했습니다.`);
  refresh();
}

export async function createRequestAction(form: FormData) {
  const session = await staff();
  const [clientId = "", projectPart = ""] = text(form, "target").split("|");
  const title = text(form, "title");
  const kind = (["수정 요청", "장애 신고", "문의"] as const).find((k) => k === text(form, "kind"));
  if (!clientId || !title || !kind) redirect(`${routes.admin.requests}?error=1#new` as Route);
  const projectId = projectPart || undefined;
  const id = createRequest({
    clientId,
    projectId,
    kind,
    title,
    body: text(form, "body"),
    from: text(form, "from") || `${session.name} (대신 등록)`,
    priority: pick(REQUEST_PRIORITIES, text(form, "priority")),
    assignee: text(form, "assignee"),
  });
  if (projectId) logActivity(projectId, session.name, `요청 ${id} '${title}'을 등록했습니다.`);
  refresh();
  redirect(`${routes.admin.requests}?status=${encodeURIComponent("전체")}#${id}` as Route);
}

export async function editRequestAction(requestId: string, form: FormData) {
  await staff();
  const kind = (["수정 요청", "장애 신고", "문의"] as const).find((k) => k === text(form, "kind"));
  editRequest(requestId, {
    ...(text(form, "title") && { title: text(form, "title") }),
    body: text(form, "body"),
    ...(kind && { kind }),
  });
  refresh();
}

export async function removeRequestAction(requestId: string) {
  await staff();
  removeRequest(requestId);
  refresh();
}

/* 회의록·보고 고치기 */

export async function editMeetingAction(projectId: string, meetingId: string, form: FormData) {
  const title = text(form, "title");
  const meetingDate = date(form, "date");
  await act(projectId, () => {
    editMeeting(projectId, meetingId, {
      ...(title && { title }),
      ...(meetingDate && { date: meetingDate }),
      attendees: text(form, "attendees"),
      decisions: text(form, "decisions"),
      actions: text(form, "actions"),
    });
    return `회의록 '${title}'을 고쳤습니다.`;
  });
  redirect(`${routes.admin.projectReports(projectId)}#meetings` as Route);
}

export async function removeReportAction(projectId: string, reportId: string) {
  await act(projectId, () => {
    const r = getProject(projectId)?.reports.find((x) => x.id === reportId);
    removeReport(projectId, reportId);
    return r ? `${weekLabel(r.weekOf)} 보고를 지웠습니다.` : "";
  });
}

/* 프로젝트 보관·삭제 */

export async function archiveProjectAction(projectId: string, archive: boolean) {
  await act(projectId, () => {
    archiveProject(projectId, archive);
    return archive ? "프로젝트를 보관했습니다." : "프로젝트를 다시 진행 중으로 돌렸습니다.";
  });
}

/** 이름을 그대로 입력해야 지운다 */
export async function deleteProjectAction(projectId: string, form: FormData) {
  await staff();
  const project = getProject(projectId);
  if (!project || text(form, "confirm") !== project.name) {
    redirect(`${routes.admin.projectSettings(projectId)}?error=delete#danger` as Route);
  }
  deleteProject(projectId);
  refresh();
  redirect(routes.admin.projects);
}

/* 고객사 */

export async function createClientAction(form: FormData) {
  await staff();
  const name = text(form, "name");
  if (name) createClient(name);
  refresh();
}

export async function renameClientAction(clientId: string, form: FormData) {
  await staff();
  const name = text(form, "name");
  if (name) renameClient(clientId, name);
  refresh();
  redirect(routes.admin.clients);
}

/** 포털 계정 연결: 가입한 이메일(지금은 데모 계정)로 찾는다. 없으면 이메일을 초대 대기로 남긴다 */
export async function linkAccountAction(clientId: string, form: FormData) {
  await staff();
  const email = text(form, "email").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`${routes.admin.clients}?error=email#${clientId}` as Route);
  }
  const account = demoAccounts.find((a) => a.email === email);
  linkAccount(clientId, account ? account.id : email);
  refresh();
}

export async function unlinkAccountAction(clientId: string, accountId: string) {
  await staff();
  unlinkAccount(clientId, accountId);
  refresh();
}

export async function removeClientAction(clientId: string) {
  await staff();
  if (!removeClient(clientId)) redirect(`${routes.admin.clients}?error=inuse#${clientId}` as Route);
  refresh();
}

/* 팀 */

export async function addStaffAction(form: FormData) {
  await staff();
  const name = text(form, "name");
  if (name) addStaff(name);
  refresh();
}

export async function renameStaffAction(from: string, form: FormData) {
  await staff();
  const to = text(form, "name");
  if (to && to !== from) renameStaff(from, to);
  refresh();
  redirect(routes.admin.team);
}

export async function removeStaffAction(name: string) {
  await staff();
  removeStaff(name);
  refresh();
}
