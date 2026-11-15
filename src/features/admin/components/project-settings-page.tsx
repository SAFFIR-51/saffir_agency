import { Picker, toOptions } from "@/shared/ui";
import { getClient, listStaff } from "@/server/projects";
import { archiveProjectAction, deleteProjectAction, updateProjectAction } from "../api/actions";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { Panel, btnDark, btnLight, input, label } from "./ui";

async function Body({ projectId, deleteError }: { projectId: string; deleteError?: boolean }) {
  const { project, href } = await loadProject(projectId, "settings");
  const client = getClient(project.clientId);
  return (
    <ProjectFrame project={project} tab="settings" href={href}>
      <Panel title="프로젝트 정보">
        <form
          action={updateProjectAction.bind(null, project.id)}
          className="grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label htmlFor="s-name" className={label}>
              프로젝트 이름 (고객에게 보임)
            </label>
            <input id="s-name" name="name" defaultValue={project.name} required className={input} />
          </div>
          <div>
            <label htmlFor="s-pm" className={label}>
              PM
            </label>
            <Picker
              id="s-pm"
              name="pm"
              defaultValue={project.pm}
              options={toOptions(listStaff())}
            />
          </div>
          <div />
          <div>
            <label htmlFor="s-start" className={label}>
              시작
            </label>
            <input
              id="s-start"
              name="start"
              type="date"
              defaultValue={project.start}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="s-end" className={label}>
              종료
            </label>
            <input id="s-end" name="end" type="date" defaultValue={project.end} className={input} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btnDark}>
              저장
            </button>
          </div>
        </form>
      </Panel>
      <Panel title="고객사 · 포털 접근">
        <dl className="grid max-w-3xl gap-3 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
          <dt className="text-neutral-500">고객사</dt>
          <dd className="font-semibold">{client?.name}</dd>
          <dt className="text-neutral-500">포털 계정</dt>
          <dd>
            {client && client.accountIds.length > 0 ? (
              client.accountIds.join(", ")
            ) : (
              <span className="text-neutral-500">
                아직 연결된 포털 계정이 없습니다. 초대 메일 기능을 붙이면 여기서 담당자를
                초대합니다.
              </span>
            )}
          </dd>
        </dl>
      </Panel>
      <Panel
        title="보관"
        sub="끝난 프로젝트를 목록 아래로 옮기고 대시보드에서 뺍니다. 고객 포털에는 계속 보입니다."
      >
        <form action={archiveProjectAction.bind(null, project.id, !project.archivedAt)}>
          <button type="submit" className={btnLight}>
            {project.archivedAt ? `보관 해제 (보관 ${project.archivedAt})` : "프로젝트 보관"}
          </button>
        </form>
      </Panel>
      <Panel
        title="삭제"
        id="danger"
        sub="일정·작업·산출물·보고·회의록·기록이 모두 지워지고 되돌릴 수 없습니다. 요청은 고객사에 남습니다."
      >
        <form
          action={deleteProjectAction.bind(null, project.id)}
          className="flex max-w-xl flex-col gap-2"
        >
          <label htmlFor="confirm-delete" className={label}>
            지우려면 프로젝트 이름 &lsquo;{project.name}&rsquo;을 그대로 입력하세요
          </label>
          {deleteError ? (
            <p role="alert" className="text-sm text-red-600">
              이름이 맞지 않습니다.
            </p>
          ) : null}
          <div className="flex gap-2">
            <input id="confirm-delete" name="confirm" autoComplete="off" className={input} />
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center rounded-lg border border-red-600 px-4 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              삭제
            </button>
          </div>
        </form>
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectSettingsPage({
  projectId,
  deleteError,
}: {
  projectId: string;
  deleteError?: boolean;
}) {
  return (
    <AdminPage>
      <Body projectId={projectId} deleteError={deleteError} />
    </AdminPage>
  );
}
