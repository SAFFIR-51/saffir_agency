import type { Route } from "next";
import Link from "next/link";
import {
  addDays,
  draftReport,
  mondayOf,
  reportOfWeek,
  short,
  todayKST,
  weekLabel,
} from "@/server/projects";
import {
  addMeetingAction,
  editMeetingAction,
  removeMeetingAction,
  removeReportAction,
  saveReportAction,
  shareMeetingAction,
  shareReportAction,
} from "../api/actions";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import {
  Lines,
  Panel,
  SharedTag,
  btnDark,
  btnLight,
  btnSmall,
  input,
  label,
  table,
  td,
  textarea,
  th,
  linkName,
} from "./ui";

const fields = [
  { name: "done", label: "이번 주 한 일", rows: 4 },
  { name: "next", label: "다음 주 할 일", rows: 4 },
  { name: "issues", label: "이슈 · 지연", rows: 3 },
  { name: "asks", label: "고객 확인 요청", rows: 3 },
] as const;

async function Body({
  projectId,
  week,
  editMeeting,
}: {
  projectId: string;
  week?: string;
  editMeeting?: string;
}) {
  const { project, href } = await loadProject(projectId, "reports");
  const today = todayKST();
  const thisWeek = mondayOf(today);
  const weekOf = week && /^\d{4}-\d{2}-\d{2}$/.test(week) ? mondayOf(week) : thisWeek;
  const saved = reportOfWeek(project, weekOf);
  const draft = draftReport(project, weekOf);
  const values = saved ?? draft;
  const weekHref = (w: string) => `${href.reports}?week=${w}` as Route;

  return (
    <ProjectFrame project={project} tab="reports" href={href}>
      <Panel
        title="주간 보고"
        sub="작성 → 저장 → 고객에게 공유. 공유하면 고객 포털 '작업 보고'에 올라가고 알림이 갑니다."
        action={
          <div className="flex items-center gap-1 text-sm">
            <Link href={weekHref(addDays(weekOf, -7))} className={btnSmall} aria-label="이전 주">
              ←
            </Link>
            <span className="min-w-44 px-2 text-center font-semibold tabular-nums">
              {weekLabel(weekOf)}
            </span>
            <Link href={weekHref(addDays(weekOf, 7))} className={btnSmall} aria-label="다음 주">
              →
            </Link>
            {weekOf !== thisWeek ? (
              <Link href={href.reports} className="ml-2 text-xs underline underline-offset-4">
                이번 주
              </Link>
            ) : null}
          </div>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <form
            action={saveReportAction.bind(null, project.id, weekOf)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {saved ? (
                <>
                  <SharedTag
                    shared={!!saved.sharedAt}
                    date={saved.sharedAt && short(saved.sharedAt)}
                  />
                  <span className="text-neutral-500">
                    {saved.author} · 수정 {short(saved.updatedAt)}
                  </span>
                </>
              ) : (
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 font-semibold text-neutral-600">
                  초안 · 이번 주 작업에서 자동으로 채웠습니다
                </span>
              )}
            </div>
            {fields.map((f) => (
              <div key={f.name}>
                <label htmlFor={`r-${f.name}`} className={label}>
                  {f.label} <span className="font-normal text-neutral-400">(한 줄에 한 항목)</span>
                </label>
                <textarea
                  id={`r-${f.name}`}
                  name={f.name}
                  rows={f.rows}
                  defaultValue={values[f.name]}
                  key={`${weekOf}-${f.name}-${values[f.name]}`}
                  className={textarea}
                />
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <button type="submit" name="intent" value="save" className={btnLight}>
                저장
              </button>
              {saved?.sharedAt ? null : (
                <button type="submit" name="intent" value="share" className={btnDark}>
                  저장하고 고객에게 공유
                </button>
              )}
            </div>
            {saved?.sharedAt ? (
              <p className="text-xs text-neutral-500">
                이미 공유한 보고입니다. 저장하면 고객 화면에도 바로 바뀐 내용이 보입니다.
              </p>
            ) : null}
          </form>

          {/* 고객이 보게 될 모양 */}
          <div>
            <p className={label}>고객에게 보이는 모양</p>
            <article className="rounded-lg border border-neutral-300 p-5 text-sm leading-[1.6]">
              <p className="text-xs text-neutral-500">{project.name}</p>
              <h3 className="mt-1 text-base font-bold">{weekLabel(weekOf)} 작업 보고</h3>
              <dl className="mt-4 flex flex-col gap-4">
                {fields.map((f) => (
                  <div key={f.name}>
                    <dt className="text-xs font-semibold text-neutral-500">{f.label}</dt>
                    <dd className="mt-1">
                      <Lines value={values[f.name]} empty={f.name === "issues" ? "없음" : "-"} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
            {!saved ? (
              <p className="mt-2 text-xs text-neutral-400">
                저장한 뒤 내용이 이 모양으로 반영됩니다.
              </p>
            ) : null}
          </div>
        </div>
      </Panel>

      <Panel title="보고 기록" sub={`${project.reports.length}건`}>
        {project.reports.length > 0 ? (
          <table className={table}>
            <thead>
              <tr>
                {["주차", "작성", "수정일", "고객 공개", ""].map((h, i) => (
                  <th key={i} scope="col" className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.reports.map((r) => (
                <tr key={r.id} className={r.weekOf === weekOf ? "bg-neutral-50" : undefined}>
                  <th scope="row" className={`${td} text-left font-semibold`}>
                    <Link href={weekHref(r.weekOf)} className={linkName}>
                      {weekLabel(r.weekOf)}
                    </Link>
                  </th>
                  <td className={td}>{r.author}</td>
                  <td className={`${td} tabular-nums`}>{short(r.updatedAt)}</td>
                  <td className={td}>
                    <SharedTag shared={!!r.sharedAt} date={r.sharedAt && short(r.sharedAt)} />
                  </td>
                  <td className={`${td} w-44`}>
                    <div className="flex items-center justify-center gap-3">
                      <form action={shareReportAction.bind(null, project.id, r.id, !r.sharedAt)}>
                        <button type="submit" className={btnSmall}>
                          {r.sharedAt ? "공유 취소" : "공유하기"}
                        </button>
                      </form>
                      <form action={removeReportAction.bind(null, project.id, r.id)}>
                        <button
                          type="submit"
                          className="text-xs text-neutral-400 hover:text-red-600"
                        >
                          삭제
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-neutral-500">아직 저장한 보고가 없습니다.</p>
        )}
      </Panel>

      <Panel
        title="회의록"
        id="meetings"
        sub="결정 사항과 할 일을 남기고, 공유하면 고객 포털에 보입니다."
      >
        <details className="group rounded-lg bg-neutral-50 p-4 open:pb-5">
          <summary className="cursor-pointer list-none text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">+ 회의록 추가</span>
            <span className="hidden group-open:inline">회의록 추가</span>
          </summary>
          <form
            action={addMeetingAction.bind(null, project.id)}
            className="mt-4 grid gap-3 sm:grid-cols-2"
          >
            <div>
              <label htmlFor="mt-date" className={label}>
                날짜
              </label>
              <input
                id="mt-date"
                name="date"
                type="date"
                required
                defaultValue={today}
                className={input}
              />
            </div>
            <div>
              <label htmlFor="mt-title" className={label}>
                회의
              </label>
              <input
                id="mt-title"
                name="title"
                required
                placeholder="예: 주간 정례 미팅"
                className={input}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="mt-attendees" className={label}>
                참석
              </label>
              <input
                id="mt-attendees"
                name="attendees"
                placeholder="고객 / 사피어"
                className={input}
              />
            </div>
            <div>
              <label htmlFor="mt-decisions" className={label}>
                결정 사항 (한 줄에 한 항목)
              </label>
              <textarea id="mt-decisions" name="decisions" rows={4} className={textarea} />
            </div>
            <div>
              <label htmlFor="mt-actions" className={label}>
                할 일 · 담당 · 기한
              </label>
              <textarea
                id="mt-actions"
                name="actions"
                rows={4}
                placeholder="고객: 자료 전달 (11-20)"
                className={textarea}
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className={btnDark}>
                회의록 저장
              </button>
            </div>
          </form>
        </details>

        <ul className="mt-5 flex flex-col gap-4">
          {project.meetings.map((m) =>
            editMeeting === m.id ? (
              <li key={m.id} className="rounded-lg border border-black p-5">
                <form
                  action={editMeetingAction.bind(null, project.id, m.id)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor={`em-date-${m.id}`} className={label}>
                      날짜
                    </label>
                    <input
                      id={`em-date-${m.id}`}
                      name="date"
                      type="date"
                      defaultValue={m.date}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`em-title-${m.id}`} className={label}>
                      회의
                    </label>
                    <input
                      id={`em-title-${m.id}`}
                      name="title"
                      defaultValue={m.title}
                      required
                      className={input}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`em-att-${m.id}`} className={label}>
                      참석
                    </label>
                    <input
                      id={`em-att-${m.id}`}
                      name="attendees"
                      defaultValue={m.attendees}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`em-dec-${m.id}`} className={label}>
                      결정 사항
                    </label>
                    <textarea
                      id={`em-dec-${m.id}`}
                      name="decisions"
                      rows={4}
                      defaultValue={m.decisions}
                      className={textarea}
                    />
                  </div>
                  <div>
                    <label htmlFor={`em-act-${m.id}`} className={label}>
                      할 일 · 담당 · 기한
                    </label>
                    <textarea
                      id={`em-act-${m.id}`}
                      name="actions"
                      rows={4}
                      defaultValue={m.actions}
                      className={textarea}
                    />
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="submit" className={btnDark}>
                      저장
                    </button>
                    <Link href={`${href.reports}#meetings` as Route} className={btnLight}>
                      취소
                    </Link>
                  </div>
                </form>
              </li>
            ) : (
              <li key={m.id} className="rounded-lg border border-neutral-300 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-neutral-500 tabular-nums">{m.date}</p>
                    <h3 className="mt-0.5 font-bold">{m.title}</h3>
                    {m.attendees ? (
                      <p className="mt-0.5 text-xs text-neutral-500">{m.attendees}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <SharedTag shared={!!m.sharedAt} date={m.sharedAt && short(m.sharedAt)} />
                    <form action={shareMeetingAction.bind(null, project.id, m.id, !m.sharedAt)}>
                      <button type="submit" className={btnSmall}>
                        {m.sharedAt ? "공유 취소" : "공유하기"}
                      </button>
                    </form>
                    <Link
                      href={`${href.reports}?editMeeting=${m.id}#meetings` as Route}
                      className={btnSmall}
                    >
                      수정
                    </Link>
                    <form action={removeMeetingAction.bind(null, project.id, m.id)}>
                      <button type="submit" className="text-xs text-neutral-400 hover:text-red-600">
                        삭제
                      </button>
                    </form>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">결정 사항</p>
                    <div className="mt-1">
                      <Lines value={m.decisions} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">할 일</p>
                    <div className="mt-1">
                      <Lines value={m.actions} />
                    </div>
                  </div>
                </div>
              </li>
            ),
          )}
          {project.meetings.length === 0 ? (
            <li className="text-sm text-neutral-500">아직 회의록이 없습니다.</li>
          ) : null}
        </ul>
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectReportsPage({
  projectId,
  week,
  editMeeting,
}: {
  projectId: string;
  week?: string;
  editMeeting?: string;
}) {
  return (
    <AdminPage>
      <Body projectId={projectId} week={week} editMeeting={editMeeting} />
    </AdminPage>
  );
}
