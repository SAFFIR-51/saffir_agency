import type { Route } from "next";
import Link from "next/link";
import { coreServerNotes } from "@/content/portal";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { NoteBox, Pill, PortalPanel, PortalTitle, Sheet, StatGrid, pBtnLight } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "내 솔루션";
const serverTone = { 정상: "done", 점검: "warn", 장애: "danger" } as const;

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
        <PortalTitle title={TITLE} sub="도입한 솔루션이 없습니다." />
        <Link href={`${routes.pricing}#solutions` as Route} className={pBtnLight}>
          솔루션 요금 보기
        </Link>
      </>
    );
  }
  return (
    <>
      <PortalTitle
        title={TITLE}
        sub="솔루션은 고객사 전용 서버에서 쓰고, 여기에서는 상태와 사용량을 봅니다."
      />
      {data.solutions.map((s) => (
        <div key={s.name} className="mb-6">
          <PortalPanel
            title={s.name}
            sub={`${s.plan} · ${s.since}부터 사용`}
            action={
              <span className="flex items-center gap-2 text-sm">
                서버 <Pill tone={serverTone[s.server]}>{s.server}</Pill>
              </span>
            }
          >
            <StatGrid
              items={[
                { label: "이번 달 방문", value: s.usage.visits.toLocaleString("ko-KR") },
                { label: "저장공간", value: `${s.usage.storageGB}GB` },
                { label: "트래픽", value: `${s.usage.trafficGB}GB` },
                { label: "서버 구간", value: <span className="text-base">{s.tier}</span> },
              ]}
            />
            <p className="mt-3 text-xs text-neutral-500">{coreServerNotes.join(" ")}</p>
          </PortalPanel>
          <PortalPanel title="업데이트 내역">
            <Sheet
              columns={["버전", "날짜", "바뀐 점"]}
              rows={s.versions.map((v) => [
                v.version,
                <span key="d" className="tabular-nums">
                  {v.date}
                </span>,
                v.note,
              ])}
            />
          </PortalPanel>
        </div>
      ))}
      <NoteBox>요금제에 포함된 서버 구간을 넘으면 서버 운영비 구간에 따라 청구합니다.</NoteBox>
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
