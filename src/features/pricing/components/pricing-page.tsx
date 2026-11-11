import {
  geoPlans,
  geoPricingHeadline,
  growthBundleNotes,
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
import {
  BulletList,
  ButtonLink,
  DataTable,
  Note,
  PageHeader,
  PlanTable,
  Section,
} from "@/shared/ui";

export function PricingPage() {
  return (
    <>
      <PageHeader
        title="요금 안내"
        lead="모든 서비스 요금을 한 페이지에 공개합니다. 금액은 VAT 포함입니다."
      />

      <Section id="geo" title="AI 검색 최적화 (월 구독)">
        <Note>
          <p>{geoPricingHeadline}</p>
        </Note>
        <PlanTable plans={geoPlans} />
      </Section>

      <Section id="solutions" title="구축형 솔루션 (CRM, 커머스 연동, ERP, AI 챗봇)">
        <PlanTable plans={solutionPlans} setupLabel="도입 세팅비 (1회)" monthlyLabel="월 이용료" />
        <DataTable
          caption={messagePriceNote}
          columns={["메시지 발송 (CRM)", "건당"]}
          rows={messagePriceRows.map((m) => [m.name, formatKRW(m.unit)])}
        />
      </Section>

      <Section id="server" title="서버 운영비 구간">
        <PlanTable plans={serverTiers} />
        <BulletList items={serverTierNotes} />
      </Section>

      <Section id="hospital-website" title="병원 홈페이지 제작">
        <PlanTable plans={hospitalWebsitePlans} setupLabel="제작비" />
        <BulletList items={hospitalWebsiteNotes} />
      </Section>

      <Section id="bundle" title="병원 성장 패키지">
        <BulletList items={growthBundleNotes} />
      </Section>

      <Section id="development" title="맞춤 개발 정찰가">
        <PlanTable plans={outsourcingDeposits} setupLabel="계약금" />
        <BulletList items={outsourcingNotes} />
        <ButtonLink href={routes.development.estimate} variant="secondary">
          맞춤 개발 견적 요청
        </ButtonLink>
      </Section>

      <Section id="payment" title="결제 방식">
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
