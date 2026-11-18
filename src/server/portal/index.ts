import "server-only";
import { redirect } from "next/navigation";
import { routes } from "@/shared/config";
import { getBackendProfile } from "../auth/backend-session";
import { getSession } from "../auth/session";
import { dataSource } from "../api";
import { nextMilestone, progressOf, short, weekLabel } from "../projects";
import { loadMyGeo } from "../geo";
import { loadPortalBilling, loadPortalState } from "../projects/remote";
import { type State, readState } from "../projects/store";
import { emptyPortalData, getDemoPortalData } from "./demo-data";
import type { PortalData } from "./types";

export type * from "./types";
export { PROJECT_STAGES } from "./types";

/**
 * 포털 화면용: 로그인 확인(2차) + 그 회원의 데이터.
 * 로그인이 안 되어 있으면 로그인 화면으로 보낸다. 지금은 데모 데이터, 이후 DB·코어 서버로 바꾼다.
 */
export async function requirePortal(next: string) {
  const session = await getSession();
  if (!session) redirect(routes.auth.loginFrom(next));
  // 백엔드 모드: 프로젝트·보고·요청·알림은 /api/pm/portal (공개 항목만), 청구는 /api/pm/billing, GEO는 /api/geo/me
  if (dataSource() === "api") {
    const [pm, invoices, geo, me] = await Promise.all([
      loadPortalState(session.id),
      loadPortalBilling().catch(() => []),
      loadMyGeo().catch(() => null),
      getBackendProfile(),
    ]);
    const empty: PortalData = {
      ...emptyPortalData(session.organization || session.name),
      invoices,
      geo,
      company: {
        name: me?.organization || session.organization || "-",
        businessNumber: me?.businessNumber || "-",
        taxEmail: me?.taxEmail || "-",
      },
      members: (me?.colleagues ?? []).map((m) => ({
        name: m.name,
        email: m.email,
        role: m.role === "owner" ? ("관리자" as const) : ("담당자" as const),
      })),
    };
    return { session, data: withProjectData(session.id, empty, pm) };
  }
  const data = getDemoPortalData(session.id);
  if (!data) redirect(routes.auth.loginFrom(next));
  const pm = readState();
  return { session, data: withDemoPayments(session.id, withProjectData(session.id, data, pm), pm) };
}

const projectKinds = new Set(["외주 계약금", "외주 잔금", "프로젝트 청구"]);

/**
 * 데모 모드: 프로젝트 청구는 어드민 '청구' 탭(저장소)의 것을 보여 준다.
 * 그래야 어드민에서 청구를 만들거나 결제 완료로 바꾸면 고객 화면에도 바로 바뀐다.
 */
function withDemoPayments(accountId: string, data: PortalData, pm: State): PortalData {
  const clientIds = pm.clients.filter((c) => c.accountIds.includes(accountId)).map((c) => c.id);
  const projects = pm.projects.filter((p) => clientIds.includes(p.clientId));
  if (projects.length === 0) return data;
  const md = (v?: string) => (v ? short(v) : "-");
  return {
    ...data,
    invoices: [
      ...projects.flatMap((p) =>
        (p.payments ?? []).toReversed().map((x) => ({
          id: x.invoiceNumber ?? `PAY-${x.id.toUpperCase()}`,
          item: `${p.name} · ${x.title}`,
          kind: /잔금/.test(x.title)
            ? ("외주 잔금" as const)
            : /계약금|착수금|선금/.test(x.title)
              ? ("외주 계약금" as const)
              : ("프로젝트 청구" as const),
          amount: x.amount,
          due: md(x.due),
          status: x.paidAt ? ("결제 완료" as const) : ("미결제" as const),
          ...(x.paidAt && { paidAt: md(x.paidAt) }),
        })),
      ),
      ...data.invoices.filter((i) => !projectKinds.has(i.kind)),
    ],
  };
}

const deliverableLabel = {
  "작성 중": "작성 중",
  "승인 요청": "승인 대기",
  "수정 요청": "수정 요청",
  "승인 완료": "승인 완료",
} as const;

/**
 * 프로젝트·보고·회의록·요청·알림은 어드민이 관리하는 저장소에서 가져온다.
 * 고객에게 공개(공유)한 것만 넣는다.
 */
function withProjectData(accountId: string, data: PortalData, pm: State): PortalData {
  const clients = pm.clients.filter((c) => c.accountIds.includes(accountId));
  if (clients.length === 0) return data;
  const clientIds = clients.map((c) => c.id);
  const projects = pm.projects.filter((p) => clientIds.includes(p.clientId));
  const nonProject = data.notifications.filter(
    (n) => !/작업 보고|테스트 주소|REQ-|답변|회의록|마일스톤/.test(n.text),
  );

  return {
    ...data,
    notifications: [
      ...pm.notifications
        .filter((n) => clientIds.includes(n.clientId))
        .toSorted((a, b) => b.date.localeCompare(a.date))
        .map((n) => ({ date: short(n.date), text: n.text })),
      ...nonProject,
    ].slice(0, 6),
    projects: projects.map((p) => {
      const upcoming = nextMilestone(p);
      const shared = p.milestones.filter((m) => m.shared);
      return {
        id: p.id,
        name: p.name,
        stage: p.stage,
        progress: progressOf(p),
        period: `${p.start} ~ ${p.end}`,
        nextMilestone: upcoming ? `${upcoming.title} (${short(upcoming.due)})` : "-",
        schedule: shared.map((m) => ({
          stage: m.stage,
          title: m.title,
          planned: short(m.due),
          done: m.doneAt ? short(m.doneAt) : undefined,
        })),
        deliverables: p.deliverables.map((d) => ({
          id: d.id,
          stage: d.stage,
          name: `${d.name} ${d.version}`.trim(),
          status: deliverableLabel[d.status],
          date: short(d.decidedAt ?? d.requestedAt ?? d.updatedAt),
          link: d.link || undefined,
          note: d.note || undefined,
          feedback: d.feedback,
        })),
        tasks: p.tasks
          .filter((t) => t.shared && t.status !== "완료")
          .toSorted((a, b) => a.due.localeCompare(b.due))
          .map((t) => ({ title: t.title, status: t.status, due: short(t.due) })),
      };
    }),
    reports: projects.flatMap((p) =>
      p.reports
        .filter((r) => r.sharedAt)
        .map((r) => ({
          week: projects.length > 1 ? `${p.name} · ${weekLabel(r.weekOf)}` : weekLabel(r.weekOf),
          done: r.done,
          next: r.next,
          issues: r.issues || "없음",
          asks: r.asks,
        })),
    ),
    meetings: projects.flatMap((p) =>
      p.meetings
        .filter((m) => m.sharedAt)
        .map((m) => ({
          date: short(m.date),
          title: m.title,
          decisions: m.decisions,
          actions: m.actions,
        })),
    ),
    requests: clientIds
      .flatMap((id) => pm.requests.filter((r) => r.clientId === id))
      .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((r) => ({
        id: r.id,
        kind: r.kind,
        title: r.title,
        status: r.status,
        date: short(r.createdAt),
        reply: r.reply,
      })),
    requestTargets: clients.flatMap((c) => {
      const own = projects.filter((p) => p.clientId === c.id);
      return own.length > 0
        ? own.map((p) => ({ clientId: c.id, projectId: p.id, label: p.name }))
        : [{ clientId: c.id, label: c.name }];
    }),
  };
}
