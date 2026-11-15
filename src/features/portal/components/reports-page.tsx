import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { LineList, PortalPanel, PortalTitle, Sheet } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const TITLE = "작업 보고";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.reports);
  if (!canSeePortalMenu(routes.portal.reports, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.reports)} />
    );
  }
  const [latest, ...older] = data.reports;
  return (
    <>
      <PortalTitle title={TITLE} sub="매주 한 일과 다음 할 일, 정례 미팅 기록입니다." />

      {latest ? (
        <PortalPanel title="이번 보고" sub={latest.week}>
          <div className="grid border-t border-l border-neutral-300 text-sm sm:grid-cols-2">
            {[
              ["한 일", latest.done, "-"],
              ["다음 할 일", latest.next, "-"],
              ["이슈", latest.issues, "없음"],
              ["확인 부탁드립니다", latest.asks, "없음"],
            ].map(([label, value, empty]) => (
              <div key={label} className="border-r border-b border-neutral-300 p-5">
                <p className="text-xs font-semibold text-neutral-500">{label}</p>
                <div className="mt-2 leading-[1.7]">
                  <LineList value={value === "없음" ? "" : value} empty={empty} />
                </div>
              </div>
            ))}
          </div>
        </PortalPanel>
      ) : (
        <p className="text-sm text-neutral-500">
          아직 작업 보고가 없습니다. 프로젝트가 시작되면 매주 보고가 올라옵니다.
        </p>
      )}

      {older.length > 0 ? (
        <PortalPanel title="지난 보고">
          <Sheet
            columns={["주차", "한 일", "다음 할 일", "이슈", "확인 요청"]}
            rows={older.map((r) => [
              <span key="w" className="whitespace-nowrap">
                {r.week}
              </span>,
              <LineList key="d" value={r.done} />,
              <LineList key="n" value={r.next} />,
              <LineList key="i" value={r.issues === "없음" ? "" : r.issues} empty="없음" />,
              <LineList key="a" value={r.asks} />,
            ])}
          />
        </PortalPanel>
      ) : null}

      <PortalPanel title="정례 미팅 기록">
        <Sheet
          columns={["날짜", "미팅", "결정 사항", "할 일"]}
          empty="공유된 회의록이 없습니다."
          firstIsHeader={false}
          rows={data.meetings.map((m) => [
            <span key="d" className="whitespace-nowrap tabular-nums">
              {m.date}
            </span>,
            <span key="t" className="font-semibold">
              {m.title}
            </span>,
            <LineList key="x" value={m.decisions} />,
            <LineList key="a" value={m.actions} />,
          ])}
        />
      </PortalPanel>
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
