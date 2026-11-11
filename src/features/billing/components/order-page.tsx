import Link from "next/link";
import { Suspense } from "react";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  ButtonLink,
  DataTable,
  Note,
  PageHeader,
  Section,
  WireBox,
  WireButton,
  TrackPageView,
  WireInput,
} from "@/shared/ui";
import { findOrderItem, orderContent as c } from "../model/order";

type SearchParams = Promise<{ plan?: string | string[] }>;

async function OrderBody({ searchParams }: { searchParams: SearchParams }) {
  const { plan } = await searchParams;
  const item = findOrderItem(typeof plan === "string" ? plan : undefined);

  if (!item) {
    return (
      <Section label="S2 · 주문 상품" title="주문 상품">
        <p className="text-foreground/70">{c.notFound}</p>
        <ButtonLink href={routes.pricing} variant="secondary">
          요금 안내
        </ButtonLink>
      </Section>
    );
  }

  const subscription = item.kind === "subscription";
  const amount = subscription ? item.monthly : item.setup;
  return (
    <>
      <TrackPageView event="order_started" eventProps={{ plan: item.id }} />
      <Section label="S2 · 주문 상품" title="주문 상품">
        <DataTable
          columns={["상품", "포함", "금액", "결제 방식"]}
          rows={[
            [
              item.name,
              item.includes,
              amount ? formatKRW(amount) : "-",
              subscription ? "매달 자동결제" : "1회 결제",
            ],
          ]}
        />
        {subscription ? (
          <Note title="구독 안내">
            <p>{c.subscriptionNote}</p>
          </Note>
        ) : null}
      </Section>

      <Section label="S3 · 주문자" title="주문자 정보">
        <div className="max-w-xl space-y-4">
          <WireInput label="병원명 또는 회사명" required />
          <WireInput label="담당자 이름" required />
          <WireInput label="이메일 (영수증 받을 곳)" required />
          <WireInput label="연락처" required placeholder="010-0000-0000" />
          <WireInput label="세금계산서 발행" kind="checkbox" />
        </div>
      </Section>

      <Section label="S4 · 결제 수단" title="결제 수단">
        <WireBox label={c.paymentMethods[item.kind]} />
      </Section>

      <Section label="S5 · 동의·결제" title="확인하고 결제하기">
        <div className="max-w-xl space-y-3">
          <WireInput label="주문 내용과 금액을 확인했습니다" kind="checkbox" required />
          <WireInput label="이용약관과 취소 및 환불 규정에 동의합니다" kind="checkbox" required />
          <p className="flex gap-4 text-sm">
            <Link href={routes.legal.terms} className="underline underline-offset-4">
              이용약관
            </Link>
            <Link href={routes.legal.refund} className="underline underline-offset-4">
              취소 및 환불 규정
            </Link>
          </p>
          <WireButton>{subscription ? "카드 등록하고 구독 시작" : "결제하기"}</WireButton>
        </div>
      </Section>
    </>
  );
}

/** 요금표 → 주문서 → 토스 결제창. 결제 완료·실패 화면은 상태 화면 단계에서 만든다 */
export function OrderPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title={c.title} lead={c.lead} />
      <Suspense fallback={<WireBox label="주문 상품" size="lg" />}>
        <OrderBody searchParams={searchParams} />
      </Suspense>
    </>
  );
}
