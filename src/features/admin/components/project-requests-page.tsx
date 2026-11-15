import { listRequests } from "@/server/projects";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { RequestList } from "./request-list";
import { Panel } from "./ui";

async function Body({ projectId, status }: { projectId: string; status?: string }) {
  const { project, href } = await loadProject(projectId, "requests");
  return (
    <ProjectFrame project={project} tab="requests" href={href}>
      <Panel
        title="요청"
        sub="이 프로젝트로 들어온 요청입니다. 답변은 고객 포털 '요청·문의'에 보입니다."
      >
        <RequestList
          requests={listRequests({ projectId: project.id })}
          basePath={href.requests}
          status={status}
          showProject={false}
        />
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectRequestsPage({ projectId, status }: { projectId: string; status?: string }) {
  return (
    <AdminPage>
      <Body projectId={projectId} status={status} />
    </AdminPage>
  );
}
