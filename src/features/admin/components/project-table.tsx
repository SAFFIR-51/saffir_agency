import Link from "next/link";
import {
  getClient,
  healthOf,
  listRequests,
  mondayOf,
  nextMilestone,
  progressOf,
  reportOfWeek,
  short,
  todayKST,
  type PmProject,
} from "@/server/projects";
import { routes } from "@/shared/config";
import { Dot, Progress, table, td, th, linkName } from "./ui";

/** 프로젝트 현황 표 (대시보드·목록 공통) */
export function ProjectTable({ projects, full }: { projects: PmProject[]; full?: boolean }) {
  const today = todayKST();
  const week = mondayOf(today);
  return (
    <div className="overflow-x-auto">
      <table className={table}>
        <thead>
          <tr>
            {[
              "프로젝트",
              "고객사",
              ...(full ? ["PM", "기간"] : []),
              "단계",
              "진행률",
              "상태",
              "다음 마일스톤",
              "열린 요청",
              "이번 주 보고",
            ].map((h) => (
              <th key={h} scope="col" className={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const upcoming = nextMilestone(p);
            const { health } = healthOf(p, today);
            const open = listRequests({ projectId: p.id }).filter((r) => r.status !== "완료");
            const report = reportOfWeek(p, week);
            return (
              <tr key={p.id} className="hover:bg-neutral-50">
                <th scope="row" className={`${td} text-left font-semibold`}>
                  <Link href={routes.admin.project(p.id)} className={linkName}>
                    {p.name}
                  </Link>
                </th>
                <td className={td}>{getClient(p.clientId)?.name}</td>
                {full ? (
                  <>
                    <td className={td}>{p.pm}</td>
                    <td className={`${td} whitespace-nowrap tabular-nums`}>
                      {short(p.start)} ~ {short(p.end)}
                    </td>
                  </>
                ) : null}
                <td className={td}>{p.stage}</td>
                <td className={td}>
                  <Progress value={progressOf(p)} />
                </td>
                <td className={td}>
                  <Dot value={health} />
                </td>
                <td className={td}>
                  {upcoming ? (
                    <span className={upcoming.due < today ? "text-red-600" : undefined}>
                      {upcoming.title}{" "}
                      <span className="text-xs text-neutral-500 tabular-nums">
                        {short(upcoming.due)}
                      </span>
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className={`${td} tabular-nums`}>
                  <Link href={routes.admin.projectRequests(p.id)} className={linkName}>
                    {open.length}건
                  </Link>
                </td>
                <td className={td}>
                  <Link
                    href={routes.admin.projectReports(p.id)}
                    className={`text-xs font-semibold ${linkName}`}
                  >
                    {report?.sharedAt ? "공유됨" : report ? "작성됨 · 미공유" : "작성 전"}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
