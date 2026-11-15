import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PM_STAGES,
  daysBetween,
  getClient,
  getProject,
  healthOf,
  listRequests,
  progressOf,
  requireStaff,
  todayKST,
} from "@/server/projects";
import { routes } from "@/shared/config";
import { setStageAction } from "../api/actions";
import { AutoSubmitSelect } from "./auto-submit-select";
import { Dot, Progress } from "./ui";

export type ProjectTab =
  "plan" | "deliverables" | "reports" | "requests" | "activity" | "preview" | "settings";

/** 프로젝트 화면 위쪽: 이름, 고객사, 단계, 상태, 탭 */
export async function loadProject(projectId: string, tab: ProjectTab) {
  const href = {
    plan: routes.admin.project(projectId),
    deliverables: routes.admin.projectDeliverables(projectId),
    reports: routes.admin.projectReports(projectId),
    requests: routes.admin.projectRequests(projectId),
    activity: routes.admin.projectActivity(projectId),
    preview: routes.admin.projectPreview(projectId),
    settings: routes.admin.projectSettings(projectId),
  };
  const session = await requireStaff(href[tab]);
  const project = getProject(projectId);
  if (!project) notFound();
  return { session, project, href };
}

export function ProjectFrame({
  project,
  tab,
  href,
  children,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  tab: ProjectTab;
  href: Record<ProjectTab, ReturnType<typeof routes.admin.project>>;
  children: React.ReactNode;
}) {
  const today = todayKST();
  const { health, reasons } = healthOf(project, today);
  const left = daysBetween(today, project.end);
  const openRequests = listRequests({ projectId: project.id }).filter(
    (r) => r.status !== "완료",
  ).length;
  const waiting = project.deliverables.filter(
    (d) => d.status === "승인 요청" || d.status === "수정 요청",
  ).length;
  const count = (n: number) => (n > 0 ? ` ${n}` : "");
  const tabs: { key: ProjectTab; label: string }[] = [
    { key: "plan", label: "일정 · 작업" },
    { key: "deliverables", label: `산출물${count(waiting)}` },
    { key: "reports", label: "주간 보고 · 회의록" },
    { key: "requests", label: `요청${count(openRequests)}` },
    { key: "activity", label: "기록" },
    { key: "preview", label: "고객 화면" },
    { key: "settings", label: "설정" },
  ];

  return (
    <>
      <p className="text-xs text-neutral-500">
        <Link href={routes.admin.projects} className="hover:text-black hover:underline">
          프로젝트
        </Link>{" "}
        / {getClient(project.clientId)?.name}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="flex items-center gap-3 text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">
            {project.name}
            {project.archivedAt ? (
              <span className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs font-semibold text-neutral-500">
                보관됨
              </span>
            ) : null}
          </h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            {getClient(project.clientId)?.name} · PM {project.pm} · {project.start} ~ {project.end}{" "}
            <span className="text-neutral-400">
              ({left >= 0 ? `D-${left}` : `종료 ${-left}일 지남`})
            </span>
          </p>
        </div>
        <dl className="grid grid-cols-3 border-t border-l border-neutral-300 text-sm">
          <div className="border-r border-b border-neutral-300 px-4 py-2.5">
            <dt className="text-xs text-neutral-500">단계</dt>
            <dd className="mt-1">
              <AutoSubmitSelect
                action={setStageAction.bind(null, project.id)}
                name="stage"
                value={project.stage}
                options={PM_STAGES}
                label="현재 단계"
                tone="strong"
              />
            </dd>
          </div>
          <div className="border-r border-b border-neutral-300 px-4 py-2.5">
            <dt className="text-xs text-neutral-500">진행률</dt>
            <dd className="mt-2.5">
              <Progress value={progressOf(project)} />
            </dd>
          </div>
          <div className="border-r border-b border-neutral-300 px-4 py-2.5">
            <dt className="text-xs text-neutral-500">상태</dt>
            <dd className="mt-2 font-semibold" title={reasons.join("\n") || undefined}>
              <Dot value={health} />
            </dd>
          </div>
        </dl>
      </div>
      {reasons.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
          {reasons.map((r) => (
            <li key={r} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1 rounded-full bg-neutral-400" />
              {r}
            </li>
          ))}
        </ul>
      ) : null}

      <nav
        aria-label="프로젝트 메뉴"
        className="mt-8 flex gap-6 overflow-x-auto border-b border-black"
      >
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={href[t.key]}
            aria-current={t.key === tab ? "page" : undefined}
            className={
              t.key === tab
                ? "-mb-px border-b-[3px] border-black pb-2.5 text-[0.9375rem] font-bold whitespace-nowrap"
                : "pb-3 text-[0.9375rem] font-semibold whitespace-nowrap text-neutral-400 hover:text-black"
            }
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="[&>section:first-child]:mt-8">{children}</div>
    </>
  );
}
