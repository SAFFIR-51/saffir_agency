import "server-only";
import { cookies } from "next/headers";
import { apiFetch, visitorIp } from "../api";
import { requestNumber } from "./remote";

/**
 * 어드민 저장 동작의 백엔드 버전 (/api/pm). 화면 id(문자열)를 백엔드 id(숫자)로 바꿔 부른다.
 * 기록(activities)·고객 알림(notifications)은 백엔드가 알아서 남긴다.
 */
const n = (id: string) => Number(id);
const send = <T = unknown>(path: `/${string}`, method: string, body?: unknown) =>
  apiFetch<T>(path, { method, ...(body !== undefined && { body: JSON.stringify(body) }) });

/**
 * 파일 올리기 (백엔드 /api/upload, 내부 계정만, 50MB). multipart라 apiFetch(JSON)를 쓰지 않는다.
 * 올린 파일은 /uploads/<무작위 이름>으로 열린다.
 */
async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file, file.name);
  const [cookieHeader, ip] = [(await cookies()).toString(), await visitorIp()];
  const res = await fetch(`${process.env.API_URL}/api/upload`, {
    method: "POST",
    body,
    headers: {
      ...(cookieHeader && { cookie: cookieHeader }),
      ...(ip && { "x-forwarded-for": ip }),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upload ${res.status}`);
  return (await res.json()) as { url: string; name: string; size: string };
}

export const remote = {
  uploadFile,

  /* 프로젝트 */
  createProject: (body: {
    name: string;
    clientOrgId?: number;
    clientName?: string;
    pm?: string;
    startDate: string;
    targetDate: string;
    stages: string[];
  }) => send<{ id: number }>("/pm/projects", "POST", body),
  updateProject: (id: string, body: Record<string, unknown>) =>
    send(`/pm/projects/${n(id)}`, "PATCH", body),
  deleteProject: (id: string) => send(`/pm/projects/${n(id)}`, "DELETE"),

  /* 마일스톤 */
  addMilestone: (
    projectId: string,
    body: { title: string; date: string; stage: string; shared: boolean },
  ) => send(`/pm/projects/${n(projectId)}/milestones`, "POST", body),
  updateMilestone: (id: string, body: Record<string, unknown>) =>
    send(`/pm/milestones/${n(id)}`, "PATCH", body),
  removeMilestone: (id: string) => send(`/pm/milestones/${n(id)}`, "DELETE"),

  /* 작업 */
  addTask: (projectId: string, body: Record<string, unknown>) =>
    send(`/pm/projects/${n(projectId)}/tasks`, "POST", body),
  updateTask: (id: string, body: Record<string, unknown>) =>
    send(`/pm/tasks/${n(id)}`, "PATCH", body),
  removeTask: (id: string) => send(`/pm/tasks/${n(id)}`, "DELETE"),

  /* 산출물 */
  addDeliverable: (projectId: string, body: Record<string, unknown>, request: boolean) =>
    send(`/pm/projects/${n(projectId)}/deliverables${request ? "?request=1" : ""}`, "POST", body),
  updateDeliverable: (id: string, body: Record<string, unknown>) =>
    send(`/pm/deliverables/${n(id)}`, "PATCH", body),
  requestApproval: (id: string) => send(`/pm/deliverables/${n(id)}/request`, "POST"),
  withdrawApproval: (id: string) => send(`/pm/deliverables/${n(id)}/withdraw`, "POST"),
  removeDeliverable: (id: string) => send(`/pm/deliverables/${n(id)}`, "DELETE"),
  decide: (id: string, body: { approve: boolean; feedback?: string }) =>
    send(`/pm/deliverables/${n(id)}/decision`, "POST", body),

  /* 청구 */
  addPayment: (projectId: string, body: { title: string; amount: number; date?: string }) =>
    send(`/pm/projects/${n(projectId)}/payments`, "POST", body),
  markPaymentPaid: (id: string) => send(`/pm/payments/${n(id)}/paid`, "POST"),
  removePayment: (id: string) => send(`/pm/payments/${n(id)}`, "DELETE"),

  /* 보고·회의록 */
  saveReport: (projectId: string, body: Record<string, unknown>) =>
    send(`/pm/projects/${n(projectId)}/reports`, "POST", body),
  shareReport: (id: string, share: boolean) =>
    send(`/pm/reports/${n(id)}/share`, "PATCH", { share }),
  removeReport: (id: string) => send(`/pm/reports/${n(id)}`, "DELETE"),
  addMeeting: (projectId: string, body: Record<string, unknown>) =>
    send(`/pm/projects/${n(projectId)}/meetings`, "POST", body),
  updateMeeting: (id: string, body: Record<string, unknown>) =>
    send(`/pm/meetings/${n(id)}`, "PATCH", body),
  shareMeeting: (id: string, share: boolean) =>
    send(`/pm/meetings/${n(id)}/share`, "PATCH", { share }),
  removeMeeting: (id: string) => send(`/pm/meetings/${n(id)}`, "DELETE"),

  /* 요청 (화면 번호 REQ-001 → 1) */
  createRequest: (body: Record<string, unknown>) =>
    send<{ id: number }>("/pm/requests", "POST", body),
  updateRequest: (code: string, body: Record<string, unknown>) =>
    send(`/pm/requests/${requestNumber(code)}`, "PATCH", body),
  removeRequest: (code: string) => send(`/pm/requests/${requestNumber(code)}`, "DELETE"),

  /* 고객사·팀 */
  createClient: (name: string) => send("/pm/clients", "POST", { name }),
  renameClient: (id: string, name: string) => send(`/pm/clients/${n(id)}`, "PATCH", { name }),
  removeClient: (id: string) => send(`/pm/clients/${n(id)}`, "DELETE"),
  addMember: (id: string, email: string) => send(`/pm/clients/${n(id)}/members`, "POST", { email }),
  removeMember: (id: string, userId: number) =>
    send(`/pm/clients/${n(id)}/members/${userId}`, "DELETE"),
  addStaff: (name: string) => send("/pm/staff", "POST", { name }),
  renameStaff: (from: string, to: string) =>
    send(`/pm/staff/${encodeURIComponent(from)}`, "PATCH", { name: to }),
  removeStaff: (name: string) => send(`/pm/staff/${encodeURIComponent(name)}`, "DELETE"),
};
