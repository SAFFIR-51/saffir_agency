import { Suspense } from "react";
import { paymentTypes } from "@/content/pricing";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { formatKRW } from "@/shared/lib";
import { NoteBox, Pill, PortalPanel, PortalTitle, Sheet, StatGrid, pBtnLight } from "@/shared/ui";

const TITLE = "청구·결제";

/** 결제 버튼 모양 (토스 결제창 연결 전이라 아직 동작하지 않음) */
const payButton =
  "inline-flex h-9 items-center rounded-lg bg-[#3182f6] px-3.5 text-sm font-semibold whitespace-nowrap text-white disabled:opacity-60";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.billing);
  if (!canSeePortalMenu(routes.portal.billing, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.billing)} />
    );
  }
  const unpaid = data.invoices.filter((i) => i.status === "미결제");
  const paid = data.invoices.filter((i) => i.status === "결제 완료");
  return (
    <>
      <PortalTitle
        title={TITLE}
        sub="청구서를 보고 결제합니다. 모든 청구는 요금 안내의 공개 상품과 연결됩니다."
      />
      <StatGrid
        items={[
          {
            label: "미결제",
            value: unpaid.length,
            note: unpaid.length ? formatKRW(unpaid.reduce((n, i) => n + i.amount, 0)) : undefined,
          },
          { label: "결제 완료", value: paid.length },
          {
            label: "다음 자동결제",
            value: <span className="text-base">{data.subscription?.nextBilling ?? "없음"}</span>,
          },
        ]}
      />

      <PortalPanel title="청구 목록" className="mt-12">
        <Sheet
          columns={["청구 번호", "항목", "종류", "금액", "기한", "상태", ""]}
          empty="청구 내역이 없습니다."
          firstIsHeader={false}
          rows={data.invoices.map((i) => [
            <span key="i" className="whitespace-nowrap text-neutral-500 tabular-nums">
              {i.id}
            </span>,
            <span key="t" className="font-semibold">
              {i.item}
            </span>,
            i.kind,
            <span key="a" className="whitespace-nowrap tabular-nums">
              {formatKRW(i.amount)}
            </span>,
            <span key="d" className="tabular-nums">
              {i.due}
            </span>,
            <Pill key="s" tone={i.status === "미결제" ? "strong" : "done"}>
              {i.status}
            </Pill>,
            i.status === "미결제" ? (
              <button
                key="b"
                type="button"
                disabled
                className={payButton}
                title="결제 연결 준비 중"
              >
                결제하기
              </button>
            ) : (
              ""
            ),
          ])}
        />
        {unpaid.length > 0 ? (
          <p className="mt-2 text-xs text-neutral-500">
            결제하기를 누르면 토스페이먼츠 결제창이 열립니다 (결제 연결 준비 중).
          </p>
        ) : null}
      </PortalPanel>

      <PortalPanel title="구독·자동결제">
        {data.subscription ? (
          <>
            <Sheet
              columns={["구독", "월 요금", "다음 결제일", "결제 카드"]}
              rows={[
                [
                  data.subscription.name,
                  formatKRW(data.subscription.amount),
                  data.subscription.nextBilling,
                  data.subscription.card,
                ],
              ]}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" disabled className={`${pBtnLight} disabled:opacity-50`}>
                카드 바꾸기
              </button>
              <button type="button" disabled className={`${pBtnLight} disabled:opacity-50`}>
                구독 해지
              </button>
            </div>
            <div className="mt-4">
              <NoteBox>
                해지하면 다음 결제일부터 결제되지 않고, 남은 기간까지는 그대로 쓸 수 있습니다. 카드
                변경과 해지는 결제 연결 후 이곳에서 바로 할 수 있습니다.
              </NoteBox>
            </div>
          </>
        ) : (
          <p className="text-sm text-neutral-500">구독 중인 상품이 없습니다.</p>
        )}
      </PortalPanel>

      <PortalPanel title="영수증·세금계산서">
        <Sheet
          columns={["결제일", "항목", "금액"]}
          empty="결제한 내역이 없습니다."
          firstIsHeader={false}
          rows={paid.map((i) => [
            <span key="d" className="tabular-nums">
              {i.paidAt ?? "-"}
            </span>,
            i.item,
            <span key="a" className="tabular-nums">
              {formatKRW(i.amount)}
            </span>,
          ])}
        />
        <p className="mt-2 text-xs text-neutral-500">
          영수증은 결제 완료 메일로 보내 드립니다. 세금계산서는 계정의 세금계산서 이메일로
          발행합니다.
        </p>
      </PortalPanel>

      <PortalPanel title="결제 유형">
        <Sheet
          columns={["결제 유형", "대상 상품", "결제 위치", "결제 수단"]}
          rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
        />
      </PortalPanel>
    </>
  );
}

export function BillingPage() {
  return (
    <Suspense
      fallback={
        <div aria-busy="true">
          <h1 className="text-[1.75rem] font-bold tracking-[-0.03em]">{TITLE}</h1>
          <div className="mt-8 h-72 animate-pulse rounded-lg bg-neutral-100" />
        </div>
      }
    >
      <Body />
    </Suspense>
  );
}
