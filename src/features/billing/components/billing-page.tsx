import { Suspense } from "react";
import { paymentTypes } from "@/content/pricing";
import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { formatKRW } from "@/shared/lib";
import { DataTable, Note, PageHeader, Section, WireButton } from "@/shared/ui";

const TITLE = "청구·결제";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.billing);
  if (!canSeePortalMenu(routes.portal.billing, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.billing)} />
    );
  }
  const paid = data.invoices.filter((i) => i.status === "결제 완료");
  return (
    <>
      <PageHeader
        eyebrow="포털"
        title={TITLE}
        lead="청구서를 보고 결제합니다. 모든 청구는 요금 안내의 공개 상품과 연결됩니다."
      />
      <Section label="S2 · 청구 목록" title="청구 목록">
        {data.invoices.length > 0 ? (
          <DataTable
            columns={["청구 번호", "항목", "종류", "금액", "기한", "상태", ""]}
            rows={data.invoices.map((i) => [
              i.id,
              i.item,
              i.kind,
              formatKRW(i.amount),
              i.due,
              i.status,
              i.status === "미결제" ? <WireButton key={i.id}>결제하기</WireButton> : "",
            ])}
            caption="데모에서는 결제하기 버튼이 동작하지 않습니다. 실제로는 토스 결제창이 열립니다."
          />
        ) : (
          <p className="text-foreground/70">청구 내역이 없습니다.</p>
        )}
      </Section>
      <Section label="S3 · 구독" title="구독·자동결제">
        {data.subscription ? (
          <>
            <DataTable
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
            <div className="flex flex-wrap gap-3">
              <WireButton>카드 바꾸기</WireButton>
              <WireButton>구독 해지</WireButton>
            </div>
            <Note title="해지 안내">
              <p>해지하면 다음 결제일부터 결제되지 않고, 남은 기간까지는 그대로 쓸 수 있습니다.</p>
            </Note>
          </>
        ) : (
          <p className="text-foreground/70">구독 중인 상품이 없습니다.</p>
        )}
      </Section>
      <Section label="S4 · 영수증" title="영수증·세금계산서">
        {paid.length > 0 ? (
          <DataTable
            columns={["결제일", "항목", "금액", ""]}
            rows={paid.map((i) => [
              i.paidAt ?? "-",
              i.item,
              formatKRW(i.amount),
              <WireButton key={i.id}>영수증 · 세금계산서 요청</WireButton>,
            ])}
          />
        ) : (
          <p className="text-foreground/70">결제한 내역이 없습니다.</p>
        )}
      </Section>
      <Section label="S5 · 결제 유형" title="결제 유형">
        <DataTable
          columns={["결제 유형", "대상 상품", "결제 위치", "결제 수단"]}
          rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
        />
      </Section>
    </>
  );
}

export function BillingPage() {
  return (
    <Suspense fallback={<PageHeader eyebrow="포털" title={TITLE} />}>
      <Body />
    </Suspense>
  );
}
