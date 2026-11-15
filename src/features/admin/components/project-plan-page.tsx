import { Picker, toOptions } from "@/shared/ui";
import type { Route } from "next";
import Link from "next/link";
import {
  PM_STAGES,
  TASK_STATUSES,
  addDays,
  listStaff,
  short,
  todayKST,
  type Milestone,
  type Task,
} from "@/server/projects";
import { cn } from "@/shared/lib";
import {
  addMilestoneAction,
  addTaskAction,
  editMilestoneAction,
  editTaskAction,
  removeMilestoneAction,
  removeTaskAction,
  toggleMilestoneAction,
  toggleMilestoneSharedAction,
  toggleTaskSharedAction,
  updateTaskAction,
} from "../api/actions";
import { AdminPage } from "./admin-page";
import { AutoSubmitSelect } from "./auto-submit-select";
import { loadProject, ProjectFrame } from "./project-frame";
import { TaskBoard } from "./task-board";
import { Timeline } from "./timeline";
import { Panel, SharedTag, btnDark, btnLight, input, label, table, td, th } from "./ui";

const VIEWS = [
  { key: "table", label: "표" },
  { key: "board", label: "보드" },
  { key: "timeline", label: "타임라인" },
] as const;
type View = (typeof VIEWS)[number]["key"];

/** 표 순서: 지금 움직이는 것부터 */
const ORDER: Task["status"][] = ["진행 중", "검토", "할 일", "보류", "완료"];
const order = (t: Task) => ORDER.indexOf(t.status);

const smallLink = "text-xs text-neutral-500 underline-offset-4 hover:text-black hover:underline";

function StageSelect({ id, value }: { id: string; value: string }) {
  return <Picker id={id} name="stage" defaultValue={value} options={toOptions(PM_STAGES)} />;
}

/** 마일스톤 한 줄 고치기 */
function MilestoneEditRow({
  projectId,
  m,
  cancel,
}: {
  projectId: string;
  m: Milestone;
  cancel: Route;
}) {
  return (
    <tr className="bg-neutral-50">
      <td colSpan={7} className={td}>
        <form
          action={editMilestoneAction.bind(null, projectId, m.id)}
          className="grid gap-3 py-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end"
        >
          <div>
            <label htmlFor={`em-title-${m.id}`} className={label}>
              마일스톤
            </label>
            <input
              id={`em-title-${m.id}`}
              name="title"
              defaultValue={m.title}
              required
              className={input}
            />
          </div>
          <div>
            <label htmlFor={`em-stage-${m.id}`} className={label}>
              단계
            </label>
            <StageSelect id={`em-stage-${m.id}`} value={m.stage} />
          </div>
          <div>
            <label htmlFor={`em-due-${m.id}`} className={label}>
              예정일 {m.shared ? <span className="font-normal">(바꾸면 고객에게 알림)</span> : null}
            </label>
            <input
              id={`em-due-${m.id}`}
              name="due"
              type="date"
              defaultValue={m.due}
              required
              className={input}
            />
          </div>
          <button type="submit" className={btnDark}>
            저장
          </button>
          <Link href={cancel} className={btnLight}>
            취소
          </Link>
        </form>
      </td>
    </tr>
  );
}

/** 작업 한 줄 고치기 */
function TaskEditRow({ projectId, t, cancel }: { projectId: string; t: Task; cancel: Route }) {
  return (
    <tr className="bg-neutral-50">
      <td colSpan={7} className={td}>
        <form
          action={editTaskAction.bind(null, projectId, t.id)}
          className="grid gap-3 py-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end"
        >
          <input type="hidden" name="view" value="table" />
          <div>
            <label htmlFor={`et-title-${t.id}`} className={label}>
              작업
            </label>
            <input
              id={`et-title-${t.id}`}
              name="title"
              defaultValue={t.title}
              required
              className={input}
            />
          </div>
          <div>
            <label htmlFor={`et-stage-${t.id}`} className={label}>
              단계
            </label>
            <StageSelect id={`et-stage-${t.id}`} value={t.stage} />
          </div>
          <div>
            <label htmlFor={`et-start-${t.id}`} className={label}>
              시작
            </label>
            <input
              id={`et-start-${t.id}`}
              name="start"
              type="date"
              defaultValue={t.start}
              className={input}
            />
          </div>
          <div>
            <label htmlFor={`et-due-${t.id}`} className={label}>
              마감
            </label>
            <input
              id={`et-due-${t.id}`}
              name="due"
              type="date"
              defaultValue={t.due}
              required
              className={input}
            />
          </div>
          <button type="submit" className={btnDark}>
            저장
          </button>
          <Link href={cancel} className={btnLight}>
            취소
          </Link>
        </form>
      </td>
    </tr>
  );
}

async function Body({
  projectId,
  view: rawView,
  edit,
}: {
  projectId: string;
  view?: string;
  edit?: string;
}) {
  const { project, href } = await loadProject(projectId, "plan");
  const view: View = VIEWS.some((v) => v.key === rawView) ? (rawView as View) : "table";
  const today = todayKST();
  const staff = listStaff();
  const current = PM_STAGES.indexOf(project.stage);
  const tasks = project.tasks.toSorted((a, b) => order(a) - order(b) || a.due.localeCompare(b.due));
  const counts = TASK_STATUSES.map(
    (s) => [s, project.tasks.filter((t) => t.status === s).length] as const,
  );
  const base = `${href.plan}?view=${view}`;
  const cancel = `${base}#tasks` as Route;
  const editLink = (key: string, anchor: string) => `${base}&edit=${key}#${anchor}` as Route;

  return (
    <ProjectFrame project={project} tab="plan" href={href}>
      <Panel
        title="단계"
        sub="단계는 위쪽 '단계'에서 바꿉니다. 고객 포털에도 같은 단계가 보입니다."
      >
        <ol className="grid grid-cols-3 border-t border-l border-neutral-300 sm:grid-cols-6">
          {PM_STAGES.map((stage, i) => {
            const ms = project.milestones.filter((m) => m.stage === stage);
            const done = ms.filter((m) => m.doneAt).length;
            return (
              <li
                key={stage}
                aria-current={i === current ? "step" : undefined}
                className={cn(
                  "border-r border-b border-neutral-300 px-3 py-3 text-sm font-semibold",
                  i === current && "bg-black text-white",
                  i > current && "text-neutral-400",
                )}
              >
                <span className="flex justify-between text-[0.6875rem] font-normal tabular-nums opacity-60">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {ms.length > 0 ? (
                    <span>
                      {done}/{ms.length}
                    </span>
                  ) : null}
                </span>
                {i < current ? "✓ " : ""}
                {stage}
              </li>
            );
          })}
        </ol>
      </Panel>

      <div id="views" className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="보기"
          className="inline-flex rounded-lg border border-neutral-300 p-1"
        >
          {VIEWS.map((v) => (
            <Link
              key={v.key}
              role="tab"
              aria-selected={v.key === view}
              href={`${href.plan}?view=${v.key}#views` as Route}
              className={cn(
                "inline-flex h-8 items-center rounded-md px-4 text-sm font-semibold",
                v.key === view ? "bg-black text-white" : "text-neutral-500 hover:text-black",
              )}
            >
              {v.label}
            </Link>
          ))}
        </div>
        <ul className="flex flex-wrap gap-3 text-xs text-neutral-500">
          {counts.map(([s, n]) => (
            <li key={s}>
              {s} <span className="font-semibold text-black tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {view === "board" ? (
        <div className="mt-5">
          <p className="mb-3 text-xs text-neutral-500">
            카드를 끌어다 다른 칸에 놓으면 상태가 바뀌고 바로 저장됩니다.
          </p>
          <TaskBoard
            projectId={project.id}
            today={today}
            editHref={`${href.plan}?view=table`}
            tasks={project.tasks.map((t) => ({
              id: t.id,
              title: t.title,
              stage: t.stage,
              assignee: t.assignee,
              due: t.due,
              status: t.status,
              shared: t.shared,
            }))}
          />
        </div>
      ) : null}

      {view === "timeline" ? (
        <div className="mt-5">
          <Timeline project={project} today={today} />
        </div>
      ) : null}

      {view === "table" ? (
        <>
          <Panel
            title="마일스톤"
            sub="완료하면 진행률이 올라가고, 공개한 마일스톤은 고객 포털 일정에 보입니다. 공개 일정을 바꾸면 고객에게 알림이 갑니다."
          >
            <div id="milestones" className="scroll-mt-6 overflow-x-auto">
              <table className={table}>
                <thead>
                  <tr>
                    {["완료", "마일스톤", "단계", "예정일", "완료일", "고객 공개", ""].map(
                      (h, i) => (
                        <th key={i} scope="col" className={th}>
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((m) => {
                    if (edit === `m-${m.id}`)
                      return (
                        <MilestoneEditRow
                          key={m.id}
                          projectId={project.id}
                          m={m}
                          cancel={`${base}#milestones` as Route}
                        />
                      );
                    const late = !m.doneAt && m.due < today;
                    const soon = !m.doneAt && !late && m.due <= addDays(today, 7);
                    return (
                      <tr key={m.id} className={m.doneAt ? "text-neutral-500" : undefined}>
                        <td className={`${td} w-14 text-center`}>
                          <form action={toggleMilestoneAction.bind(null, project.id, m.id)}>
                            <button
                              type="submit"
                              aria-label={m.doneAt ? `${m.title} 완료 취소` : `${m.title} 완료`}
                              aria-pressed={!!m.doneAt}
                              className={cn(
                                "inline-flex size-5 items-center justify-center rounded border text-xs",
                                m.doneAt
                                  ? "border-black bg-black text-white"
                                  : "border-neutral-400 hover:border-black",
                              )}
                            >
                              {m.doneAt ? "✓" : ""}
                            </button>
                          </form>
                        </td>
                        <th
                          scope="row"
                          className={`${td} text-left font-semibold ${m.doneAt ? "text-neutral-500" : "text-black"}`}
                        >
                          {m.title}
                        </th>
                        <td className={td}>{m.stage}</td>
                        <td
                          className={cn(
                            td,
                            "whitespace-nowrap tabular-nums",
                            late && "font-semibold text-red-600",
                          )}
                        >
                          {m.due}
                          {late ? (
                            " · 지남"
                          ) : soon ? (
                            <span className="text-xs text-neutral-500"> · 이번 주</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className={`${td} tabular-nums`}>{m.doneAt ?? "-"}</td>
                        <td className={td}>
                          <form
                            action={toggleMilestoneSharedAction.bind(null, project.id, m.id)}
                            className="flex items-center gap-2"
                          >
                            <SharedTag shared={m.shared} />
                            <button type="submit" className={smallLink}>
                              {m.shared ? "숨기기" : "공개"}
                            </button>
                          </form>
                        </td>
                        <td className={`${td} w-24 whitespace-nowrap`}>
                          <div className="flex items-center gap-3">
                            <Link href={editLink(`m-${m.id}`, "milestones")} className={smallLink}>
                              수정
                            </Link>
                            <form action={removeMilestoneAction.bind(null, project.id, m.id)}>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
            <form
              action={addMilestoneAction.bind(null, project.id)}
              className="mt-4 grid gap-3 rounded-lg bg-neutral-50 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end"
            >
              <div>
                <label htmlFor="m-title" className={label}>
                  새 마일스톤
                </label>
                <input
                  id="m-title"
                  name="title"
                  required
                  placeholder="예: 검수 시작"
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="m-stage" className={label}>
                  단계
                </label>
                <StageSelect id="m-stage" value={project.stage} />
              </div>
              <div>
                <label htmlFor="m-due" className={label}>
                  예정일
                </label>
                <input id="m-due" name="due" type="date" required className={input} />
              </div>
              <label className="flex h-10 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="shared"
                  defaultChecked
                  className="size-4 accent-black"
                />
                고객 공개
              </label>
              <button type="submit" className={btnDark}>
                추가
              </button>
            </form>
          </Panel>

          <Panel
            title="작업"
            sub="담당·상태를 고르면 바로 저장됩니다. 공개한 작업만 주간 보고 초안과 고객 포털에 들어갑니다. 보류 작업이 있으면 상태가 '주의'로 바뀝니다."
          >
            <div id="tasks" className="scroll-mt-6 overflow-x-auto">
              <table className={table}>
                <thead>
                  <tr>
                    {["작업", "단계", "담당", "기간", "상태", "고객 공개", ""].map((h, i) => (
                      <th key={i} scope="col" className={th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => {
                    if (edit === `t-${t.id}`)
                      return (
                        <TaskEditRow key={t.id} projectId={project.id} t={t} cancel={cancel} />
                      );
                    const late = t.status !== "완료" && t.status !== "보류" && t.due < today;
                    return (
                      <tr
                        key={t.id}
                        className={t.status === "완료" ? "text-neutral-500" : undefined}
                      >
                        <th
                          scope="row"
                          className={`${td} text-left font-medium ${t.status === "완료" ? "line-through decoration-neutral-300" : "text-black"}`}
                        >
                          {t.title}
                        </th>
                        <td className={td}>{t.stage}</td>
                        <td className={td}>
                          <AutoSubmitSelect
                            action={updateTaskAction.bind(null, project.id, t.id)}
                            name="assignee"
                            value={t.assignee}
                            options={staff}
                            empty="미지정"
                            label={`${t.title} 담당`}
                          />
                        </td>
                        <td
                          className={cn(
                            td,
                            "whitespace-nowrap tabular-nums",
                            late && "font-semibold text-red-600",
                          )}
                        >
                          {t.start ? `${short(t.start)} ~ ` : "~ "}
                          {short(t.due)}
                          {late ? " · 지남" : ""}
                          {t.doneAt ? (
                            <span className="ml-1 text-xs text-neutral-400">
                              (완료 {short(t.doneAt)})
                            </span>
                          ) : null}
                        </td>
                        <td className={td}>
                          <AutoSubmitSelect
                            action={updateTaskAction.bind(null, project.id, t.id)}
                            name="status"
                            value={t.status}
                            options={TASK_STATUSES}
                            label={`${t.title} 상태`}
                            tone={
                              t.status === "진행 중"
                                ? "strong"
                                : t.status === "보류"
                                  ? "warn"
                                  : undefined
                            }
                          />
                        </td>
                        <td className={td}>
                          <form
                            action={toggleTaskSharedAction.bind(null, project.id, t.id, t.shared)}
                            className="flex items-center gap-2"
                          >
                            <SharedTag shared={t.shared} />
                            <button type="submit" className={smallLink}>
                              {t.shared ? "숨기기" : "공개"}
                            </button>
                          </form>
                        </td>
                        <td className={`${td} w-24 whitespace-nowrap`}>
                          <div className="flex items-center gap-3">
                            <Link href={editLink(`t-${t.id}`, "tasks")} className={smallLink}>
                              수정
                            </Link>
                            <form action={removeTaskAction.bind(null, project.id, t.id)}>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      ) : null}

      {/* 작업 추가: 어느 보기에서든 */}
      <form
        action={addTaskAction.bind(null, project.id)}
        className="mt-4 grid gap-3 rounded-lg bg-neutral-50 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end"
      >
        <div>
          <label htmlFor="t-title" className={label}>
            새 작업
          </label>
          <input
            id="t-title"
            name="title"
            required
            placeholder="예: 관리자 쿠폰 관리"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="t-stage" className={label}>
            단계
          </label>
          <StageSelect id="t-stage" value={project.stage} />
        </div>
        <div>
          <label htmlFor="t-assignee" className={label}>
            담당
          </label>
          <Picker id="t-assignee" name="assignee" options={toOptions(staff, "미지정")} />
        </div>
        <div>
          <label htmlFor="t-start" className={label}>
            시작 (선택)
          </label>
          <input id="t-start" name="start" type="date" defaultValue={today} className={input} />
        </div>
        <div>
          <label htmlFor="t-due" className={label}>
            마감
          </label>
          <input
            id="t-due"
            name="due"
            type="date"
            required
            defaultValue={addDays(today, 7)}
            className={input}
          />
        </div>
        <label className="flex h-10 items-center gap-2 text-sm">
          <input type="checkbox" name="shared" defaultChecked className="size-4 accent-black" />
          고객 공개
        </label>
        <button type="submit" className={btnDark}>
          추가
        </button>
      </form>
    </ProjectFrame>
  );
}

export function ProjectPlanPage({
  projectId,
  view,
  edit,
}: {
  projectId: string;
  view?: string;
  edit?: string;
}) {
  return (
    <AdminPage>
      <Body projectId={projectId} view={view} edit={edit} />
    </AdminPage>
  );
}
