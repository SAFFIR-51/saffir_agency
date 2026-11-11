import { coreServerNotes } from "@/content/portal";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { BulletList, ButtonLink, DataTable, PageHeader, Section, WireButton } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "내 솔루션";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.solutions);
  if (!canSeePortalMenu(routes.portal.solutions, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.solutions)} />
    );
  }
  if (data.solutions.length === 0) {
    return (
      <>
        <PageHeader eyebrow="포털" title={TITLE} />
        <Section>
          <p className="text-foreground/70">도입한 솔루션이 없습니다.</p>
          <ButtonLink href={`${routes.pricing}#solutions`} variant="secondary">
            솔루션 요금 보기
          </ButtonLink>
        </Section>
      </>
    );
  }
  return (
    <>
      <PageHeader
        eyebrow="포털"
        title={TITLE}
        lead="솔루션은 고객사 전용 서버에서 쓰고, 여기에서는 바로가기와 상태를 봅니다."
      />
      {data.solutions.map((s, index) => (
        <div key={s.name}>
          <Section label={`S${index * 3 + 2} · 솔루션`} title={s.name}>
            <DataTable
              columns={["항목", "내용"]}
              rows={[
                ["요금제", s.plan],
                ["도입일", s.since],
                ["서버 상태", s.server],
                ["서버 구간", s.tier],
              ]}
            />
            <WireButton>전용 서버 바로가기</WireButton>
          </Section>
          <Section
            label={`S${index * 3 + 3} · 사용량`}
            title="이번 달 사용량"
            description={coreServerNotes.join(" ")}
          >
            <DataTable
              columns={["방문 수", "저장공간", "트래픽"]}
              rows={[
                [
                  s.usage.visits.toLocaleString("ko-KR"),
                  `${s.usage.storageGB}GB`,
                  `${s.usage.trafficGB}GB`,
                ],
              ]}
            />
          </Section>
          <Section label={`S${index * 3 + 4} · 업데이트`} title="버전·업데이트 내역">
            <DataTable
              columns={["버전", "날짜", "바뀐 점"]}
              rows={s.versions.map((v) => [v.version, v.date, v.note])}
            />
          </Section>
        </div>
      ))}
      <Section label="안내" title="서버 운영비">
        <BulletList
          items={["요금제에 포함된 서버 구간을 넘으면 서버 운영비 구간에 따라 청구합니다."]}
        />
      </Section>
    </>
  );
}

export function MySolutionsPage() {
  return (
    <PortalPage title={TITLE}>
      <Body />
    </PortalPage>
  );
}
