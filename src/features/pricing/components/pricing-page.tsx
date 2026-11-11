import {
  geoPlans,
  geoPricingHeadline,
  hospitalGrowthBundle,
  hospitalWebsiteNotes,
  hospitalWebsitePlans,
  messagePriceNote,
  messagePriceRows,
  orderablePlanIds,
  outsourcingDeposits,
  outsourcingNotes,
  paymentTypes,
  serverTierNotes,
  serverTiers,
  solutionPlans,
} from "@/content/pricing";
import { routes, type ContactTopic } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  ButtonLink,
  DataTable,
  PageHeader,
  PlanTable,
  Section,
  TrackPageView,
  type PlanRow,
} from "@/shared/ui";

const orderable = new Set<string>(orderablePlanIds);

/** 솔루션 요금 행 → 미리 고를 문의 유형 */
const solutionTopic: Record<string, ContactTopic> = {
  "crm-basic": "crm-adopt",
  "crm-standard": "crm-adopt",
  "crm-network": "crm-adopt",
  connect: "connect",
  erp: "erp",
  "ai-chatbot": "ai-chatbot",
};

function TableLink({
  href,
  children,
}: {
  href: Parameters<typeof ButtonLink>[0]["href"];
  children: React.ReactNode;
}) {
  return (
    <ButtonLink href={href} variant="secondary" className="h-9 px-4 whitespace-nowrap">
      {children}
    </ButtonLink>
  );
}

/** 바로 결제할 수 있는 상품은 주문서로, 아니면 상담으로 */
function orderOrConsult(fallback: ContactTopic, label = "상담") {
  function PlanAction(plan: PlanRow) {
    if (orderable.has(plan.id)) {
      return (
        <TableLink href={routes.order(plan.id)}>{plan.monthly ? "구독하기" : "결제하기"}</TableLink>
      );
    }
    return (
      <TableLink href={routes.contactFor(solutionTopic[plan.id] ?? fallback)}>{label}</TableLink>
    );
  }
  return PlanAction;
}

export function PricingPage() {
  const bundle = hospitalGrowthBundle;
  return (
    <>
      <TrackPageView event="pricing_viewed" />
      <PageHeader title="요금 안내" lead="모든 서비스 요금을 공개합니다. 금액은 VAT 포함입니다." />

      <Section id="geo" label="S2 · AI 검색 최적화" title="AI 검색 최적화 (월 구독)">
        <PlanTable
          plans={geoPlans}
          caption={geoPricingHeadline}
          action={(plan) =>
            plan.monthly === 0 ? (
              <TableLink href={`${routes.hospital.geo}#diagnosis`}>무료 진단</TableLink>
            ) : (
              orderOrConsult("geo-fix")(plan)
            )
          }
        />
      </Section>

      <Section id="solutions" label="S3 · 구축형 솔루션" title="구축형 솔루션">
        <PlanTable
          plans={solutionPlans}
          setupLabel="도입 세팅비"
          monthlyLabel="월 이용료"
          action={orderOrConsult("crm-adopt", "도입 상담")}
        />
      </Section>

      <Section id="message" label="S4 · 메시지" title="메시지 발송 (병원 CRM)">
        <DataTable
          columns={["메시지", "건당"]}
          rows={messagePriceRows.map((m) => [m.name, formatKRW(m.unit)])}
          caption={messagePriceNote}
        />
      </Section>

      <Section id="server" label="S5 · 서버 운영비" title="서버 운영비">
        <PlanTable plans={serverTiers} caption={serverTierNotes.join(" ")} />
      </Section>

      <Section id="hospital-website" label="S6 · 병원 홈페이지" title="병원 홈페이지 제작">
        <PlanTable
          plans={hospitalWebsitePlans}
          setupLabel="제작비"
          caption={hospitalWebsiteNotes.join(" ")}
          action={orderOrConsult("hospital-website", "제작 상담")}
        />
      </Section>

      <Section id="bundle" label="S7 · 패키지" title={bundle.name}>
        <DataTable
          columns={["구성", "월 요금", "혜택"]}
          rows={[[bundle.includesLabel, formatKRW(bundle.monthly), bundle.benefit]]}
        />
        <ButtonLink href={routes.contactFor("hospital-bundle")} variant="secondary">
          패키지 상담
        </ButtonLink>
      </Section>

      <Section id="development" label="S8 · 맞춤 개발" title="맞춤 개발 정찰가">
        <PlanTable
          plans={outsourcingDeposits}
          setupLabel="계약금"
          caption={outsourcingNotes.join(" ")}
          action={orderOrConsult("hospital-website")}
        />
        <ButtonLink href={routes.development.estimate} variant="secondary">
          맞춤 개발 견적 요청
        </ButtonLink>
      </Section>

      <Section id="payment" label="S9 · 결제" title="결제 방식">
        <DataTable
          columns={["결제 유형", "대상 상품", "결제 위치", "결제 수단"]}
          rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
        />
        <ButtonLink href={routes.legal.refund} variant="secondary">
          취소 및 환불 규정
        </ButtonLink>
      </Section>
    </>
  );
}
