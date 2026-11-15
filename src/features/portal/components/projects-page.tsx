import type { Route } from "next";
import Link from "next/link";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { Pill, PortalPanel, PortalTitle, ProgressLine, Sheet, pBtnLight, pLink } from "@/shared/ui";
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
      <PortalTitle
        title={TITLE}
        sub="단계마다 산출물을 확인하고 승인하면 다음 단계로 넘어갑니다."
      />
      <PortalPanel title="프로젝트 목록">
        {data.projects.length > 0 ? (
          <Sheet
            columns={["프로젝트", "단계", "진행률", "기간", "다음 일정", "확인할 것"]}
            rows={data.projects.map((p) => {
              const waiting = p.deliverables.filter((d) => d.status === "승인 대기").length;
              return [
                <Link key={p.id} href={routes.portal.project(p.id)} className={pLink}>
                  {p.name}
                </Link>,
                p.stage,
                <ProgressLine key="p" value={p.progress} label={`${p.name} 진행률`} />,
                <span key="d" className="whitespace-nowrap tabular-nums">
                  {p.period}
                </span>,
                p.nextMilestone,
                waiting > 0 ? (
                  <Pill key="w" tone="strong">
                    승인 {waiting}건
                  </Pill>
                ) : (
                  <span key="w" className="text-neutral-400">
                    없음
                  </span>
                ),
              ];
            })}
          />
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-neutral-500">
              진행 중인 프로젝트가 없습니다. 계약하면 단계별 진행 현황이 여기에 보입니다.
            </p>
            <Link href={routes.development.estimate as Route} className={pBtnLight}>
              견적 요청
            </Link>
          </div>
        )}
      </PortalPanel>
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
