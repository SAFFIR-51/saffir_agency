import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { DataTable, PageHeader, Section } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "작업 보고";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.reports);
  if (!canSeePortalMenu(routes.portal.reports, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.reports)} />
    );
  }
  return (
    <>
      <PageHeader
        eyebrow="포털"
        title={TITLE}
        lead="매주 한 일과 다음 할 일, 정례 미팅 기록을 봅니다."
      />
      <Section label="S2 · 주간 보고" title="주간 스프린트 보고">
        {data.reports.length > 0 ? (
          <DataTable
            columns={["주차", "한 일", "다음 할 일", "이슈"]}
            rows={data.reports.map((r) => [r.week, r.done, r.next, r.issues])}
          />
        ) : (
          <p className="text-foreground/70">
            아직 작업 보고가 없습니다. 프로젝트가 시작되면 매주 보고가 올라옵니다.
          </p>
        )}
      </Section>
      <Section label="S3 · 미팅" title="정례 미팅 기록">
        <DataTable
          columns={["날짜", "미팅", "결정 사항"]}
          rows={data.meetings.map((m) => [m.date, m.title, m.decisions])}
        />
      </Section>
    </>
  );
}

export function ReportsPage() {
  return (
    <PortalPage title={TITLE}>
      <Body />
    </PortalPage>
  );
}
