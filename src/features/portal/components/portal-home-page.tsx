import Link from "next/link";
import { requirePortal } from "@/server/portal";
import {
  canSeePortalMenu,
  isPortalMenuVisible,
  memberKindLabels,
  portalNav,
  routes,
  type MemberKind,
} from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { BulletList, ButtonLink, DataTable, PageHeader, ProgressBar, Section } from "@/shared/ui";
import { PortalPage } from "./portal-page";

const kinds = Object.keys(memberKindLabels) as MemberKind[];

async function Body() {
  const { session, data } = await requirePortal(routes.portal.home);
  const can = (href: string) => canSeePortalMenu(href, session.kinds);

  const todos = [
    ...data.projects.flatMap((p) =>
      p.deliverables
        .filter((d) => d.status === "승인 대기")
        .map((d) => ({
          text: `${p.name} · ${d.name} 확인·승인`,
          href: routes.portal.project(p.id),
        })),
    ),
    ...data.invoices
      .filter((i) => i.status === "미결제")
      .map((i) => ({
        text: `${i.item} ${formatKRW(i.amount)} 결제 (기한 ${i.due})`,
        href: routes.portal.billing,
      })),
    ...data.requests
      .filter((r) => r.reply && r.status !== "완료")
      .map((r) => ({ text: `${r.id} ${r.title} 답변 확인`, href: routes.portal.requests })),
  ];

  return (
    <>
      <PageHeader eyebrow="포털" title="홈" lead={`${session.organization} · ${session.name}님`} />

      <Section label="S2 · 처리할 일" title="지금 처리할 일">
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.text}>
                <Link href={todo.href} className="underline underline-offset-4">
                  {todo.text}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-foreground/70">지금 처리할 일이 없습니다.</p>
        )}
        {session.kinds.length === 1 && session.kinds[0] === "member" ? (
          <ButtonLink href={`${routes.hospital.geo}#diagnosis`} variant="secondary">
            무료 진단 다시 하기
          </ButtonLink>
        ) : null}
      </Section>

      {can(routes.portal.projects) ? (
        <Section label="S3 · 프로젝트" title="진행 중인 프로젝트">
          <DataTable
            columns={["프로젝트", "단계", "진행률", "다음 일정"]}
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
              p.nextMilestone,
            ])}
          />
        </Section>
      ) : null}

      {can(routes.portal.billing) ? (
        <Section label="S4 · 청구" title="미결제 청구">
          {data.invoices.some((i) => i.status === "미결제") ? (
            <DataTable
              columns={["항목", "금액", "기한"]}
              rows={data.invoices
                .filter((i) => i.status === "미결제")
                .map((i) => [i.item, formatKRW(i.amount), i.due])}
            />
          ) : (
            <p className="text-foreground/70">미결제 청구가 없습니다.</p>
          )}
        </Section>
      ) : null}

      <Section label="S5 · 알림" title="최근 알림">
        <BulletList items={data.notifications.map((n) => `${n.date} · ${n.text}`)} />
      </Section>

      <Section
        label="기획 확인용"
        title="가입한 서비스에 따라 보이는 메뉴"
        description="포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨집니다. 다른 데모 계정으로 로그인하면 왼쪽 메뉴가 바뀝니다."
      >
        <DataTable
          columns={["메뉴", ...kinds.map((k) => memberKindLabels[k])]}
          rows={portalNav.map((item) => [
            item.label,
            ...kinds.map((k) => (isPortalMenuVisible(item, [k]) ? "O" : "-")),
          ])}
        />
      </Section>
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
