import {
  geoPlans,
  hospitalWebsitePlans,
  outsourcingDeposits,
  priceStatus,
  serverTiers,
  solutionPlans,
} from "@/content/pricing";
import { Section } from "@/shared/ui";
import { PriceTable } from "./price-table";

export function PricingPage() {
  return (
    <>
      <Section
        title="요금 안내"
        description={`모든 금액은 VAT 포함입니다.${priceStatus === "proposed" ? " (제안가, 확정 전)" : ""}`}
      />
      <Section title="AI 검색 최적화 (월 구독)">
        <PriceTable plans={geoPlans} />
      </Section>
      <Section title="병원 홈페이지 제작">
        <PriceTable plans={hospitalWebsitePlans} />
      </Section>
      <Section title="구축형 솔루션">
        <PriceTable plans={solutionPlans} />
      </Section>
      <Section title="서버 운영비">
        <PriceTable plans={serverTiers} />
      </Section>
      <Section title="맞춤 개발 계약금">
        <PriceTable plans={outsourcingDeposits} />
      </Section>
    </>
  );
}
