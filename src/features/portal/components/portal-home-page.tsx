import type { Route } from "next";
import Link from "next/link";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  Pill,
  PortalPanel,
  PortalTitle,
  ProgressLine,
  Sheet,
  StatGrid,
  pBtnLight,
  pLink,
} from "@/shared/ui";
import { PortalPage } from "./portal-page";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.home);
  const can = (href: string) => canSeePortalMenu(href, session.kinds);

  const waiting = data.projects.flatMap((p) =>
    p.deliverables
      .filter((d) => d.status === "승인 대기")
      .map((d) => ({ project: p, deliverable: d })),
  );
  const unpaid = data.invoices.filter((i) => i.status === "미결제");
  const answered = data.requests.filter((r) => r.reply && r.status !== "완료");
  const openRequests = data.requests.filter((r) => r.status !== "완료");

  const todos: {
    kind: string;
    text: React.ReactNode;
    when: string;
    href: Route;
    action: string;
  }[] = [
    ...waiting.map(({ project, deliverable }) => ({
      kind: "승인",
      text: `${project.name} · ${deliverable.name}`,
      when: deliverable.date,
      href: `${routes.portal.project(project.id)}#deliverables` as Route,
      action: "확인·승인",
    })),
    ...unpaid.map((i) => ({
      kind: "결제",
      text: `${i.item} ${formatKRW(i.amount)}`,
      when: `기한 ${i.due}`,
      href: routes.portal.billing as Route,
      action: "결제하기",
    })),
    ...answered.map((r) => ({
      kind: "답변",
      text: `${r.id} ${r.title}`,
      when: r.date,
      href: routes.portal.requests as Route,
      action: "답변 보기",
    })),
  ];

  const stats = [
    ...(can(routes.portal.projects)
      ? [
          {
            label: "진행 중 프로젝트",
            value: data.projects.length,
            href: routes.portal.projects as Route,
          },
          { label: "승인 기다림", value: waiting.length, href: routes.portal.projects as Route },
        ]
      : []),
    ...(can(routes.portal.requests)
      ? [
          {
            label: "처리 중인 요청",
            value: openRequests.length,
            href: routes.portal.requests as Route,
          },
        ]
      : []),
    ...(can(routes.portal.billing)
      ? [{ label: "미결제 청구", value: unpaid.length, href: routes.portal.billing as Route }]
      : []),
    ...(data.geo
      ? [
          {
            label: "GEO 진단 점수",
            value: data.geo.latest.score,
            note: data.geo.latest.date,
            href: routes.portal.geo as Route,
          },
        ]
      : []),
  ].slice(0, 4);

  return (
    <>
      <PortalTitle
        title={`${session.organization || session.name}님, 안녕하세요.`}
        sub={
          todos.length > 0
            ? `지금 확인할 일이 ${todos.length}건 있습니다.`
            : "지금 확인할 일이 없습니다."
        }
      />

      {stats.length > 0 ? <StatGrid items={stats} /> : null}

      <PortalPanel title="지금 확인할 일" className="mt-12">
        {todos.length > 0 ? (
          <Sheet
            columns={["할 일", "내용", "날짜", ""]}
            firstIsHeader={false}
            rows={todos.map((t) => [
              <Pill key="k" tone={t.kind === "승인" ? "strong" : "default"}>
                {t.kind}
              </Pill>,
              <Link key="t" href={t.href} className={`font-semibold ${pLink}`}>
                {t.text}
              </Link>,
              <span key="w" className="whitespace-nowrap text-neutral-600 tabular-nums">
                {t.when}
              </span>,
              <Link key="a" href={t.href} className="text-xs font-semibold whitespace-nowrap">
                {t.action} →
              </Link>,
            ])}
          />
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-neutral-500">지금 확인할 일이 없습니다.</p>
            {session.kinds.length === 1 && session.kinds[0] === "member" ? (
              <Link href={`${routes.hospital.geo}#diagnosis` as Route} className={pBtnLight}>
                무료 진단 다시 하기
              </Link>
            ) : null}
          </div>
        )}
      </PortalPanel>

      {can(routes.portal.projects) && data.projects.length > 0 ? (
        <PortalPanel
          title="진행 중인 프로젝트"
          action={
            <Link href={routes.portal.projects} className="text-xs font-semibold">
              전체 보기 →
            </Link>
          }
        >
          <Sheet
            columns={["프로젝트", "단계", "진행률", "다음 일정"]}
            rows={data.projects.map((p) => [
              <Link key={p.id} href={routes.portal.project(p.id)} className={pLink}>
                {p.name}
              </Link>,
              p.stage,
              <ProgressLine key="p" value={p.progress} label={`${p.name} 진행률`} />,
              p.nextMilestone,
            ])}
          />
        </PortalPanel>
      ) : null}

      <PortalPanel title="최근 알림">
        <Sheet
          columns={["날짜", "알림"]}
          empty="새 알림이 없습니다."
          firstIsHeader={false}
          rows={data.notifications.map((n) => [
            <span key="d" className="whitespace-nowrap text-neutral-600 tabular-nums">
              {n.date}
            </span>,
            n.text,
          ])}
        />
      </PortalPanel>
    </>
  );
}

export function PortalHomePage() {
  return (
    <PortalPage title="홈">
      <Body />
    </PortalPage>
  );
}
