import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { DataTable, PageHeader, Section, WireButton, WireInput } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "요청·문의";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.requests);
  if (!canSeePortalMenu(routes.portal.requests, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.requests)} />
    );
  }
  return (
    <>
      <PageHeader
        eyebrow="포털"
        title={TITLE}
        lead="수정 요청과 장애 신고를 보내고 처리 상태를 봅니다. 장애 신고는 먼저 처리합니다."
      />
      <Section label="S2 · 처리 상태" title="보낸 요청">
        {data.requests.length > 0 ? (
          <DataTable
            columns={["번호", "유형", "제목", "날짜", "상태", "답변"]}
            rows={data.requests.map((r) => [
              r.id,
              r.kind,
              r.title,
              r.date,
              r.status,
              r.reply ?? "-",
            ])}
          />
        ) : (
          <p className="text-foreground/70">보낸 요청이 없습니다.</p>
        )}
      </Section>
      <Section label="S3 · 요청 보내기" title="새 요청">
        <div className="max-w-xl space-y-4">
          <WireInput label="유형" kind="select" placeholder="수정 요청 / 장애 신고" required />
          <WireInput label="제목" required />
          <WireInput label="내용" kind="textarea" required />
          <WireInput label="파일 첨부" />
          <WireButton>요청 보내기</WireButton>
        </div>
      </Section>
    </>
  );
}

export function RequestsPage() {
  return (
    <PortalPage title={TITLE}>
      <Body />
    </PortalPage>
  );
}
