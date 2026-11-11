import Link from "next/link";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { ButtonLink, DataTable, PageHeader, ProgressBar, Section } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "프로젝트";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.projects);
  if (!canSeePortalMenu(routes.portal.projects, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.projects)} />
    );
  }
  return (
    <>
      <PageHeader
        eyebrow="포털"
        title={TITLE}
        lead="단계마다 산출물을 확인하고 승인하면 다음 단계로 넘어갑니다."
      />
      <Section label="S2 · 목록" title="프로젝트 목록">
        {data.projects.length > 0 ? (
          <DataTable
            columns={["프로젝트", "단계", "진행률", "기간", "다음 일정"]}
            rows={data.projects.map((p) => [
              <Link
                key={p.id}
                href={routes.portal.project(p.id)}
                className="underline underline-offset-4"
              >
                {p.name}
              </Link>,
              p.stage,
              <ProgressBar key={`${p.id}-bar`} value={p.progress} label={`${p.name} 진행률`} />,
              p.period,
              p.nextMilestone,
            ])}
          />
        ) : (
          <>
            <p className="text-foreground/70">
              진행 중인 프로젝트가 없습니다. 계약하면 단계별 진행 현황이 여기에 보입니다.
            </p>
            <ButtonLink href={routes.development.estimate} variant="secondary">
              견적 요청
            </ButtonLink>
          </>
        )}
      </Section>
    </>
  );
}

export function ProjectsPage() {
  return (
    <PortalPage title={TITLE}>
      <Body />
    </PortalPage>
  );
}
