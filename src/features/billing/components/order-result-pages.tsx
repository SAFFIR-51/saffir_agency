import { Suspense } from "react";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  ButtonLink,
  Note,
  PageHeader,
  Section,
  StateTable,
  WireBox,
  WireButton,
  InfoList,
} from "@/shared/ui";
import { findOrderItem, orderResultContent as c } from "../model/order";

type SearchParams = Promise<{ plan?: string | string[] }>;

async function planFrom(searchParams: SearchParams) {
  const { plan } = await searchParams;
  return findOrderItem(typeof plan === "string" ? plan : undefined);
}

async function CompleteBody({ searchParams }: { searchParams: SearchParams }) {
  const item = await planFrom(searchParams);
  const subscription = item?.kind === "subscription";
  const amount = item ? (subscription ? item.monthly : item.setup) : null;
  return (
    <>
      <Section label="S2 · 결제 내용" title="결제 내용">
        <InfoList
          rows={c.complete.rows.map((row) => [
            row,
            row === "상품" && item
              ? item.name
              : row === "금액" && amount
                ? `${formatKRW(amount)}${subscription ? " / 월" : ""}`
                : `[ ${row} ]`,
          ])}
        />
        <WireButton>영수증 보기</WireButton>
      </Section>
      <Section label="S3 · 다음" title="이제 이렇게 쓰시면 됩니다">
        <Note title="안내">
          <p>{subscription ? c.complete.nextSubscription : c.complete.nextOnce}</p>
        </Note>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={subscription ? routes.portal.geo : routes.portal.billing}>
            포털로 이동
          </ButtonLink>
          <ButtonLink href={routes.home} variant="secondary">
            메인으로
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

async function FailBody({ searchParams }: { searchParams: SearchParams }) {
  const item = await planFrom(searchParams);
  return (
    <>
      <Section label="S2 · 사유" title="결제되지 않은 이유">
        <WireBox label="토스가 보낸 실패 사유" />
        <StateTable states={c.fail.reasons} />
      </Section>
      <Section label="S3 · 다시 결제" title="다시 결제하기">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={item ? routes.order(item.id) : routes.pricing}>
            {item ? "다시 결제하기" : "요금 안내에서 다시 고르기"}
          </ButtonLink>
          <ButtonLink href={routes.contact} variant="secondary">
            문의하기
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

/** 토스 결제창 successUrl. 실제로는 서버에서 결제 승인(confirm)을 마친 뒤에 이 화면을 보여 준다 */
export function OrderCompletePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title={c.complete.title} lead={c.complete.lead} />
      <Suspense fallback={<WireBox label="결제 내용" size="lg" />}>
        <CompleteBody searchParams={searchParams} />
      </Suspense>
    </>
  );
}

/** 토스 결제창 failUrl */
export function OrderFailPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title={c.fail.title} lead={c.fail.lead} />
      <Suspense fallback={<WireBox label="실패 사유" size="lg" />}>
        <FailBody searchParams={searchParams} />
      </Suspense>
    </>
  );
}
