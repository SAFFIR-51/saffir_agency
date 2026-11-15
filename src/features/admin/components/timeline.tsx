import { addDays, daysBetween, mondayOf, short, type PmProject } from "@/server/projects";
import { cn } from "@/shared/lib";

const barTone: Record<string, string> = {
  "할 일": "border border-neutral-400 bg-white",
  "진행 중": "bg-black",
  검토: "border-2 border-black bg-white",
  완료: "bg-neutral-300",
  보류: "bg-amber-400",
};

/**
 * 타임라인(간트): 주 단위 눈금 위에 마일스톤(◆)과 작업 막대.
 * 작업 시작일이 없으면 마감 6일 전부터 그린다. 세로 빨간 선은 오늘.
 */
export function Timeline({ project, today }: { project: PmProject; today: string }) {
  const from = mondayOf(project.start < today ? project.start : today);
  const lastDue = [
    project.end,
    ...project.tasks.map((t) => t.due),
    ...project.milestones.map((m) => m.due),
  ]
    .toSorted()
    .at(-1)!;
  const to = addDays(mondayOf(lastDue), 7);
  const total = daysBetween(from, to);
  const pos = (d: string) =>
    `${(Math.min(Math.max(daysBetween(from, d), 0), total) / total) * 100}%`;
  const weeks = Array.from({ length: Math.round(total / 7) }, (_, i) => addDays(from, i * 7));
  const tasks = project.tasks.toSorted((a, b) =>
    (a.start ?? addDays(a.due, -6)).localeCompare(b.start ?? addDays(b.due, -6)),
  );

  const grid = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {weeks.map((w) => (
        <span
          key={w}
          className="absolute inset-y-0 border-l border-neutral-200"
          style={{ left: pos(w) }}
        />
      ))}
      {today >= from && today <= to ? (
        <span className="absolute inset-y-0 w-px bg-red-500" style={{ left: pos(today) }} />
      ) : null}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[56rem] text-sm">
        {/* 주 눈금 */}
        <div className="grid grid-cols-[14rem_minmax(0,1fr)] border-b border-black">
          <div className="px-2 py-2 text-xs font-semibold text-neutral-500">항목</div>
          <div className="relative h-8">
            {weeks.map((w) => (
              <span
                key={w}
                className="absolute top-2 pl-1 text-[0.6875rem] text-neutral-500 tabular-nums"
                style={{ left: pos(w) }}
              >
                {short(w)}
              </span>
            ))}
            {today >= from && today <= to ? (
              <span
                className="absolute -top-0.5 -translate-x-1/2 rounded bg-red-500 px-1 text-[0.625rem] font-semibold text-white"
                style={{ left: pos(today) }}
              >
                오늘
              </span>
            ) : null}
          </div>
        </div>

        {/* 마일스톤 */}
        <div className="grid grid-cols-[14rem_minmax(0,1fr)] border-b border-neutral-300 bg-neutral-50">
          <div className="px-2 py-3 text-xs font-bold">마일스톤</div>
          <div className="relative h-16">
            {grid}
            {project.milestones.map((m, i) => (
              <span
                key={m.id}
                className="absolute flex -translate-x-1/2 flex-col items-center"
                style={{ left: pos(m.due), top: i % 2 === 0 ? 6 : 30 }}
                title={`${m.title} · ${m.due}${m.doneAt ? " (완료)" : ""}`}
              >
                <span
                  className={cn(
                    "size-2.5 rotate-45",
                    m.doneAt
                      ? "bg-black"
                      : m.due < today
                        ? "bg-red-600"
                        : "border-2 border-black bg-white",
                  )}
                />
                <span className="mt-0.5 max-w-28 truncate text-[0.6875rem] whitespace-nowrap">
                  {m.title}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* 작업 */}
        {tasks.map((t) => {
          const start = t.start ?? addDays(t.due, -6);
          const late = t.status !== "완료" && t.status !== "보류" && t.due < today;
          return (
            <div
              key={t.id}
              className="grid grid-cols-[14rem_minmax(0,1fr)] border-b border-neutral-200"
            >
              <div className="truncate px-2 py-2.5">
                <span className={cn(t.status === "완료" && "text-neutral-400 line-through")}>
                  {t.title}
                </span>
                <span className="ml-1.5 text-xs text-neutral-400">{t.assignee}</span>
              </div>
              <div className="relative">
                {grid}
                <span
                  className={cn(
                    "absolute top-1/2 h-3.5 -translate-y-1/2 rounded-sm",
                    barTone[t.status],
                    late && "ring-2 ring-red-500",
                  )}
                  style={{
                    left: pos(start),
                    width: `max(0.5rem, calc(${pos(addDays(t.due, 1))} - ${pos(start)}))`,
                  }}
                  title={`${t.title} · ${short(start)}~${short(t.due)} · ${t.status}`}
                />
              </div>
            </div>
          );
        })}

        <ul className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
          {Object.entries(barTone).map(([k, v]) => (
            <li key={k} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-2.5 w-5 rounded-sm", v)} />
              {k}
            </li>
          ))}
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-5 rounded-sm ring-2 ring-red-500" />
            마감 지남
          </li>
        </ul>
      </div>
    </div>
  );
}
