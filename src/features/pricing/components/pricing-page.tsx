import {
  geoPlans,
  geoPricingHeadline,
  hospitalGrowthBundle,
  hospitalWebsiteNotes,
  hospitalWebsitePlans,
  messagePriceNote,
  messagePriceRows,
  outsourcingDeposits,
  outsourcingNotes,
  paymentTypes,
  serverTierNotes,
  serverTiers,
  solutionPlans,
} from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { ButtonLink, DataTable, PageHeader, PlanTable, Section } from "@/shared/ui";

export function PricingPage() {
  const bundle = hospitalGrowthBundle;
  return (
    <>
      <PageHeader title="요금 안내" lead="모든 서비스 요금을 공개합니다. 금액은 VAT 포함입니다." />

      <Section id="geo" label="S2 · AI 검색 최적화" title="AI 검색 최적화 (월 구독)">
        <PlanTable plans={geoPlans} caption={geoPricingHeadline} />
      </Section>

      <Section id="solutions" label="S3 · 구축형 솔루션" title="구축형 솔루션">
        <PlanTable plans={solutionPlans} setupLabel="도입 세팅비" monthlyLabel="월 이용료" />
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
        />
      </Section>

      <Section id="bundle" label="S7 · 패키지" title={bundle.name}>
        <DataTable
          columns={["구성", "월 요금", "혜택"]}
          rows={[[bundle.includesLabel, formatKRW(bundle.monthly), bundle.benefit]]}
        />
      </Section>

      <Section id="development" label="S8 · 맞춤 개발" title="맞춤 개발 정찰가">
        <PlanTable
          plans={outsourcingDeposits}
          setupLabel="계약금"
          caption={outsourcingNotes.join(" ")}
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
