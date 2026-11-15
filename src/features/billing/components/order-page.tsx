import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { routes, site } from "@/shared/config";
import { SubpageSection, underlineLink } from "@/shared/sections";
import { TrackPageView } from "@/shared/ui";
import { findOrderItem, orderContent as c } from "../model/order";
import { CheckoutForm } from "./checkout-form";

type SearchParams = Promise<{ plan?: string | string[] }>;

async function OrderBody({ searchParams }: { searchParams: SearchParams }) {
  const { plan } = await searchParams;
  const item = findOrderItem(typeof plan === "string" ? plan : undefined);

  if (!item) {
    return (
      <div className="rounded-2xl bg-white p-8">
        <p className="text-[0.9375rem] text-[#4e5968]">{c.notFound}</p>
        <Link href={routes.pricing} className={`mt-4 inline-block text-sm ${underlineLink}`}>
          요금 안내로 가기
        </Link>
      </div>
    );
  }

  const subscription = item.kind === "subscription";
  const amount = (subscription ? item.monthly : item.setup) ?? 0;
  return (
    <>
      <TrackPageView event="order_started" eventProps={{ plan: item.id }} />
      <CheckoutForm
        item={{ id: item.id, name: item.name, includes: item.includes, amount, subscription }}
        methods={subscription ? c.methodOptions.subscription : c.methodOptions.once}
        notes={{ subscription: c.subscriptionNote, pending: c.pendingNote }}
        links={{
          terms: routes.legal.terms as Route,
          refund: routes.legal.refund as Route,
          privacy: routes.legal.privacy as Route,
          pricing: routes.pricing as Route,
        }}
        seller={site.legalName}
      />
    </>
  );
}

/** 요금표 → 주문서 → 토스 결제창. 실제 결제창 구성(상품 · 주문자 · 결제 수단 | 금액 요약 · 동의 · 결제 버튼)을 따른다 */
export function OrderPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="bg-[#f2f4f6] pb-28 lg:pb-40">
      <h1 className="sr-only">{c.title}</h1>
      <SubpageSection id="order-title" first en="Checkout" sub={[c.lead]}>
        <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-white" />}>
          <OrderBody searchParams={searchParams} />
        </Suspense>
      </SubpageSection>
    </div>
  );
}
