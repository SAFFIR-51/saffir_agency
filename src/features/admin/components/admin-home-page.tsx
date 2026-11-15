import type { Route } from "next";
import Link from "next/link";
import {
  addDays,
  daysBetween,
  getClient,
  getProject,
  healthOf,
  listProjects,
  listRequests,
  mondayOf,
  reportOfWeek,
  requireStaff,
  short,
  todayKST,
  weekLabel,
} from "@/server/projects";
import { routes } from "@/shared/config";
import { AdminPage } from "./admin-page";
import { ProjectTable } from "./project-table";
import { AdminTitle, Dot, Panel, StatusTag, btnDark, table, td, th, linkName } from "./ui";

async function Body() {
  const session = await requireStaff(routes.admin.home);
  const today = todayKST();
  const week = mondayOf(today);
  const weekEnd = addDays(week, 6);
  const projects = listProjects().filter((p) => !p.archivedAt);
  const requests = listRequests();
  const open = requests.filter((r) => r.status !== "완료");
  const risky = projects.filter((p) => healthOf(p, today).health !== "정상");
  const unshared = projects.filter((p) => !reportOfWeek(p, week)?.sharedAt);
  const dueTasks = projects
    .flatMap((p) => p.tasks.map((t) => ({ ...t, project: p })))
    .filter((t) => t.status !== "완료" && t.due <= weekEnd)
    .toSorted((a, b) => a.due.localeCompare(b.due));
  const upcoming = projects
    .flatMap((p) => p.milestones.map((m) => ({ ...m, project: p })))
    .filter((m) => !m.doneAt && m.due <= addDays(today, 14))
    .toSorted((a, b) => a.due.localeCompare(b.due));
  const deliverables = projects
    .flatMap((p) => p.deliverables.map((d) => ({ ...d, project: p })))
    .filter((d) => d.status === "승인 요청" || d.status === "수정 요청")
    .toSorted((a, b) => (a.status === "수정 요청" ? -1 : 0) - (b.status === "수정 요청" ? -1 : 0));

  const stats = [
    { label: "진행 중 프로젝트", value: projects.length, href: routes.admin.projects },
    { label: "지연 · 주의", value: risky.length, href: routes.admin.projects },
    {
      label: "열린 요청",
      value: open.length,
      note: `긴급 ${open.filter((r) => r.priority === "긴급").length}`,
      href: routes.admin.requests,
    },
    { label: "이번 주 보고 미공유", value: unshared.length, href: routes.admin.projects },
  ];

  return (
    <>
      <AdminTitle
        title={`${session.name}님, 오늘 챙길 일입니다.`}
        sub={`${today} · ${weekLabel(week)}`}
        actions={
          <Link href={routes.admin.newProject} className={btnDark}>
            + 새 프로젝트
          </Link>
        }
      />

      <dl className="grid grid-cols-2 border-t border-l border-neutral-300 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border-r border-b border-neutral-300 px-5 py-4 hover:bg-neutral-50"
          >
            <dt className="text-xs font-semibold text-neutral-500">{s.label}</dt>
            <dd className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums">{s.value}</span>
              {s.note ? <span className="text-xs text-red-600">{s.note}</span> : null}
            </dd>
          </Link>
        ))}
      </dl>

      <Panel title="프로젝트 현황" sub="상태는 마일스톤·작업 마감과 보류 작업으로 자동 계산합니다.">
        <ProjectTable projects={projects} />
      </Panel>

      <div className="grid gap-x-10 lg:grid-cols-2">
        <Panel title="다가오는 마일스톤" sub="2주 안 · 지난 일정 포함">
          {upcoming.length > 0 ? (
            <table className={table}>
              <thead>
                <tr>
                  {["남은 날", "마일스톤", "프로젝트", "예정일"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcoming.map((m) => {
                  const left = daysBetween(today, m.due);
                  return (
                    <tr key={`${m.project.id}-${m.id}`} className="hover:bg-neutral-50">
                      <td
                        className={`${td} w-24 font-semibold whitespace-nowrap tabular-nums ${left < 0 ? "text-red-600" : left <= 3 ? "text-black" : "text-neutral-500"}`}
                      >
                        {left < 0 ? `${-left}일 지남` : left === 0 ? "오늘" : `D-${left}`}
                      </td>
                      <th scope="row" className={`${td} text-left font-semibold`}>
                        <Link
                          href={
                            `${routes.admin.project(m.project.id)}?view=table#milestones` as Route
                          }
                          className={linkName}
                        >
                          {m.title}
                        </Link>
                      </th>
                      <td className={td}>{m.project.name}</td>
                      <td className={`${td} whitespace-nowrap tabular-nums`}>{short(m.due)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-neutral-500">2주 안 마일스톤이 없습니다.</p>
          )}
        </Panel>

        <Panel title="산출물 승인" sub="고객 응답 대기 · 수정 요청 받음">
          {deliverables.length > 0 ? (
            <table className={table}>
              <thead>
                <tr>
                  {["상태", "산출물", "프로젝트", "요청일"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliverables.map((d) => (
                  <tr key={`${d.project.id}-${d.id}`} className="hover:bg-neutral-50">
                    <td
                      className={`${td} w-28 font-semibold whitespace-nowrap ${d.status === "수정 요청" ? "text-red-600" : "text-neutral-600"}`}
                    >
                      {d.status === "수정 요청"
                        ? "수정 요청"
                        : `대기 ${daysBetween(d.requestedAt ?? today, today)}일`}
                    </td>
                    <th scope="row" className={`${td} text-left font-semibold`}>
                      <Link
                        href={`${routes.admin.projectDeliverables(d.project.id)}#${d.id}` as Route}
                        className={linkName}
                      >
                        {d.name} {d.version}
                      </Link>
                    </th>
                    <td className={td}>{d.project.name}</td>
                    <td className={`${td} whitespace-nowrap tabular-nums`}>
                      {d.requestedAt ? short(d.requestedAt) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-neutral-500">승인을 기다리는 산출물이 없습니다.</p>
          )}
        </Panel>
      </div>

      <div className="grid gap-x-10 lg:grid-cols-2">
        <Panel
          title="이번 주 마감 작업"
          sub={`${short(week)} ~ ${short(weekEnd)} · 지난 마감 포함`}
        >
          {dueTasks.length > 0 ? (
            <table className={table}>
              <thead>
                <tr>
                  {["마감", "작업", "프로젝트", "담당", "상태"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dueTasks.map((t) => (
                  <tr key={`${t.project.id}-${t.id}`}>
                    <td
                      className={`${td} whitespace-nowrap tabular-nums ${t.due < today ? "font-semibold text-red-600" : ""}`}
                    >
                      {short(t.due)}
                    </td>
                    <td className={td}>{t.title}</td>
                    <td className={td}>
                      <Link href={routes.admin.project(t.project.id)} className={linkName}>
                        {t.project.name}
                      </Link>
                    </td>
                    <td className={`${td} whitespace-nowrap`}>{t.assignee || "-"}</td>
                    <td className={td}>
                      <StatusTag value={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-neutral-500">이번 주 마감 작업이 없습니다.</p>
          )}
        </Panel>

        <Panel
          title="처리할 요청"
          sub="접수·확인 상태"
          action={
            <Link
              href={routes.admin.requests}
              className="text-xs font-semibold underline underline-offset-4"
            >
              요청함
            </Link>
          }
        >
          {open.filter((r) => r.status === "접수" || r.status === "확인").length > 0 ? (
            <table className={table}>
              <thead>
                <tr>
                  {["우선", "요청", "고객사", "날짜", "상태"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {open
                  .filter((r) => r.status === "접수" || r.status === "확인")
                  .map((r) => (
                    <tr key={r.id}>
                      <td className={td}>
                        <Dot value={r.priority} />
                      </td>
                      <td className={td}>
                        <Link href={`${routes.admin.requests}#${r.id}`} className={linkName}>
                          <span className="text-xs text-neutral-500">{r.id}</span> {r.title}
                        </Link>
                      </td>
                      <td className={`${td} whitespace-nowrap`}>
                        {r.projectId ? getProject(r.projectId)?.name : getClient(r.clientId)?.name}
                      </td>
                      <td className={`${td} whitespace-nowrap tabular-nums`}>
                        {short(r.createdAt)}
                      </td>
                      <td className={td}>
                        <StatusTag value={r.status} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-neutral-500">새로 처리할 요청이 없습니다.</p>
          )}
        </Panel>
      </div>
    </>
  );
}

export function AdminHomePage() {
  return (
    <AdminPage>
      <Body />
    </AdminPage>
  );
}
