import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { Panel } from "./ui";

/** 변경 기록: 누가 언제 무엇을 바꿨는지 (고객의 승인·수정 요청 포함) */
async function Body({ projectId }: { projectId: string }) {
  const { project, href } = await loadProject(projectId, "activity");
  const byDay = new Map<string, typeof project.activity>();
  for (const a of project.activity) {
    const day = a.at.slice(0, 10);
    byDay.set(day, [...(byDay.get(day) ?? []), a]);
  }
  return (
    <ProjectFrame project={project} tab="activity" href={href}>
      <Panel
        title="기록"
        sub="일정·작업·산출물·보고·요청을 바꾸면 자동으로 남습니다. 고객에게는 보이지 않습니다."
      >
        {byDay.size === 0 ? (
          <p className="text-sm text-neutral-500">아직 기록이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {[...byDay.entries()].map(([day, items]) => (
              <section key={day}>
                <h3 className="text-xs font-semibold text-neutral-500 tabular-nums">{day}</h3>
                <ol className="mt-3 border-l border-neutral-300">
                  {items.map((a, i) => (
                    <li key={`${a.at}-${i}`} className="relative pb-4 pl-5 text-sm last:pb-0">
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-black"
                      />
                      <span className="mr-2 text-xs text-neutral-400 tabular-nums">
                        {a.at.slice(11)}
                      </span>
                      <span className="font-semibold">{a.who}</span>{" "}
                      <span className="text-neutral-700">{a.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectActivityPage({ projectId }: { projectId: string }) {
  return (
    <AdminPage>
      <Body projectId={projectId} />
    </AdminPage>
  );
}
