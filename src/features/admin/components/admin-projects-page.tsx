import Link from "next/link";
import { getClient, listProjects, requireStaff, short } from "@/server/projects";
import { routes } from "@/shared/config";
import { archiveProjectAction } from "../api/actions";
import { AdminPage } from "./admin-page";
import { ProjectTable } from "./project-table";
import { AdminTitle, Panel, btnDark, btnSmall, table, td, th, linkName } from "./ui";

async function Body() {
  await requireStaff(routes.admin.projects);
  const all = listProjects();
  const projects = all.filter((p) => !p.archivedAt);
  const archived = all.filter((p) => p.archivedAt);
  const clientIds = [...new Set(projects.map((p) => p.clientId))];
  return (
    <>
      <AdminTitle
        title="프로젝트"
        sub={`진행 중 ${projects.length}개 · 고객사 ${clientIds.length}곳`}
        actions={
          <Link href={routes.admin.newProject} className={btnDark}>
            + 새 프로젝트
          </Link>
        }
      />
      <Panel
        title="진행 중"
        sub="프로젝트 이름을 누르면 일정·작업, 산출물, 보고, 요청을 관리합니다. 끝난 프로젝트는 설정에서 보관합니다."
        className="mt-2"
      >
        {projects.length > 0 ? (
          <ProjectTable projects={projects} full />
        ) : (
          <p className="text-sm text-neutral-500">진행 중인 프로젝트가 없습니다.</p>
        )}
      </Panel>
      {archived.length > 0 ? (
        <Panel title="보관" sub="고객 포털에는 계속 보입니다.">
          <table className={table}>
            <thead>
              <tr>
                {["프로젝트", "고객사", "기간", "보관일", ""].map((h, i) => (
                  <th key={i} scope="col" className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archived.map((p) => (
                <tr key={p.id} className="text-neutral-600">
                  <th scope="row" className={`${td} text-left font-semibold`}>
                    <Link href={routes.admin.project(p.id)} className={linkName}>
                      {p.name}
                    </Link>
                  </th>
                  <td className={td}>{getClient(p.clientId)?.name}</td>
                  <td className={`${td} tabular-nums`}>
                    {short(p.start)} ~ {short(p.end)}
                  </td>
                  <td className={`${td} tabular-nums`}>{p.archivedAt}</td>
                  <td className={`${td} w-32`}>
                    <form action={archiveProjectAction.bind(null, p.id, false)}>
                      <button type="submit" className={btnSmall}>
                        다시 진행
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : null}
    </>
  );
}

export function AdminProjectsPage() {
  return (
    <AdminPage>
      <Body />
    </AdminPage>
  );
}
