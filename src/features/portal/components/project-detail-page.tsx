import { notFound } from "next/navigation";
import { PROJECT_STAGES, requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { DataTable, PageHeader, ProgressBar, Section, WireButton } from "@/shared/ui";
import { PortalPage } from "./portal-page";

async function Body({ projectId }: { projectId: string }) {
  const { session, data } = await requirePortal(routes.portal.project(projectId));
  if (!canSeePortalMenu(routes.portal.projects, session.kinds)) {
    return (
      <PortalNoAccess title="프로젝트" audience={portalMenuAudienceLabel(routes.portal.projects)} />
    );
  }
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) notFound();
  const current = PROJECT_STAGES.indexOf(project.stage);

  return (
    <>
      <PageHeader eyebrow="포털 · 프로젝트" title={project.name} lead={project.period} />
      <Section label="S2 · 단계" title="진행 단계">
        <ol className="flex flex-wrap gap-2 text-sm">
          {PROJECT_STAGES.map((stage, index) => (
            <li
              key={stage}
              aria-current={index === current ? "step" : undefined}
              className={
                index === current
                  ? "rounded-full bg-foreground px-3 py-1 text-background"
                  : index < current
                    ? "rounded-full border border-foreground/40 px-3 py-1"
                    : "rounded-full border border-dashed border-foreground/25 px-3 py-1 text-foreground/50"
              }
            >
              {index < current ? "✓ " : ""}
              {stage}
            </li>
          ))}
        </ol>
        <ProgressBar value={project.progress} label="전체 진행률" />
      </Section>
      <Section label="S3 · 일정" title="단계별 일정">
        <DataTable
          columns={["단계", "예정", "완료"]}
          rows={project.schedule.map((s) => [s.stage, s.planned, s.done ?? "-"])}
        />
      </Section>
      <Section
        label="S4 · 산출물"
        title="산출물 확인·승인"
        description="승인해야 다음 단계로 넘어갑니다."
      >
        <DataTable
          columns={["단계", "산출물", "날짜", "상태", ""]}
          rows={project.deliverables.map((d) => [
            d.stage,
            d.name,
            d.date,
            d.status,
            d.status === "승인 대기" ? <WireButton key={d.name}>확인·승인</WireButton> : "",
          ])}
          caption="데모에서는 승인 버튼이 동작하지 않습니다."
        />
      </Section>
    </>
  );
}

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  return (
    <PortalPage title="프로젝트">
      <Body projectId={projectId} />
    </PortalPage>
  );
}
