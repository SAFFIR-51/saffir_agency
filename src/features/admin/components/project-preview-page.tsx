import {
  PM_STAGES,
  listRequests,
  nextMilestone,
  progressOf,
  short,
  weekLabel,
} from "@/server/projects";
import { cn } from "@/shared/lib";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { Lines, Panel, StatusTag, table, td, th } from "./ui";

/** 고객 포털에 나가는 내용만 모아 보기 (공개 표시한 것만) */
async function Body({ projectId }: { projectId: string }) {
  const { project, href } = await loadProject(projectId, "preview");
  const current = PM_STAGES.indexOf(project.stage);
  const milestones = project.milestones.filter((m) => m.shared);
  const tasks = project.tasks.filter((t) => t.shared && t.status !== "완료");
  const reports = project.reports.filter((r) => r.sharedAt);
  const meetings = project.meetings.filter((m) => m.sharedAt);
  const requests = listRequests({ projectId: project.id });
  const upcoming = nextMilestone(project);
  const hidden =
    project.milestones.length -
    milestones.length +
    project.tasks.filter((t) => !t.shared).length +
    project.reports.length -
    reports.length +
    project.meetings.length -
    meetings.length;

  return (
    <ProjectFrame project={project} tab="preview" href={href}>
      <p className="mt-8 rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        고객 포털에 보이는 내용입니다. 비공개 항목 {hidden}개는 빠져 있습니다. 내부 메모와 담당자
        배정은 고객에게 보이지 않습니다.
      </p>
      <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-neutral-300 p-6 sm:p-8">
        <p className="text-xs text-neutral-500">포털 · 프로젝트</p>
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em]">{project.name}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {project.start} ~ {project.end} · 진행률 {progressOf(project)}%
          {upcoming ? ` · 다음 일정 ${upcoming.title} (${short(upcoming.due)})` : ""}
        </p>
        <ol className="mt-5 flex flex-wrap gap-2 text-sm">
          {PM_STAGES.map((stage, i) => (
            <li
              key={stage}
              className={cn(
                "rounded-full px-3 py-1",
                i === current && "bg-black text-white",
                i < current && "border border-neutral-400",
                i > current && "border border-dashed border-neutral-300 text-neutral-400",
              )}
            >
              {i < current ? "✓ " : ""}
              {stage}
            </li>
          ))}
        </ol>

        <Panel title="일정">
          <table className={table}>
            <thead>
              <tr>
                {["단계", "일정", "예정", "완료"].map((h) => (
                  <th key={h} scope="col" className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => (
                <tr key={m.id}>
                  <td className={td}>{m.stage}</td>
                  <td className={td}>{m.title}</td>
                  <td className={`${td} tabular-nums`}>{short(m.due)}</td>
                  <td className={`${td} tabular-nums`}>{m.doneAt ? short(m.doneAt) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="진행 중인 작업">
          <ul className="flex flex-col gap-2 text-sm">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3">
                <span>{t.title}</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 tabular-nums">~{short(t.due)}</span>
                  <StatusTag value={t.status} />
                </span>
              </li>
            ))}
            {tasks.length === 0 ? <li className="text-neutral-500">-</li> : null}
          </ul>
        </Panel>

        <Panel title="작업 보고">
          {reports.slice(0, 2).map((r) => (
            <article key={r.id} className="mb-5 text-sm">
              <h3 className="font-bold">{weekLabel(r.weekOf)}</h3>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-neutral-500">한 일</p>
                  <Lines value={r.done} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500">다음 할 일</p>
                  <Lines value={r.next} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500">이슈</p>
                  <Lines value={r.issues} empty="없음" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500">확인 요청</p>
                  <Lines value={r.asks} />
                </div>
              </div>
            </article>
          ))}
          {reports.length === 0 ? (
            <p className="text-sm text-neutral-500">공유한 보고가 없습니다.</p>
          ) : null}
        </Panel>

        <Panel title="회의록">
          <ul className="flex flex-col gap-3 text-sm">
            {meetings.map((m) => (
              <li key={m.id}>
                <span className="text-xs text-neutral-500 tabular-nums">{short(m.date)}</span>{" "}
                <span className="font-semibold">{m.title}</span>
                <div className="mt-1">
                  <Lines value={m.decisions} />
                </div>
              </li>
            ))}
            {meetings.length === 0 ? (
              <li className="text-neutral-500">공유한 회의록이 없습니다.</li>
            ) : null}
          </ul>
        </Panel>

        <Panel title="요청·문의">
          <ul className="flex flex-col gap-2 text-sm">
            {requests.map((r) => (
              <li key={r.id} className="flex items-start justify-between gap-3">
                <span>
                  <span className="text-xs text-neutral-500">{r.id}</span> {r.title}
                  {r.reply ? (
                    <span className="mt-0.5 block text-xs text-neutral-600">답변: {r.reply}</span>
                  ) : null}
                </span>
                <StatusTag value={r.status} />
              </li>
            ))}
            {requests.length === 0 ? <li className="text-neutral-500">-</li> : null}
          </ul>
        </Panel>
      </div>
    </ProjectFrame>
  );
}

export function ProjectPreviewPage({ projectId }: { projectId: string }) {
  return (
    <AdminPage>
      <Body projectId={projectId} />
    </AdminPage>
  );
}
