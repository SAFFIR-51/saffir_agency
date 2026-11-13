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
import {
  ButtonLink,
  DataTable,
  IconArt,
  PageHeader,
  PlanTable,
  TrackPageView,
  type IconArtKind,
} from "@/shared/ui";
import { PricingNav } from "./pricing-nav";
import "./pricing.css";

/** 오른쪽 요금 한 묶음: 제목 + 내용 */
function Block({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="nc-price-block">
      <div className="nc-price-head">
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          {desc ? <p>{desc}</p> : null}
        </div>
        <span>(VAT 포함)</span>
      </div>
      <div className="nc-price-body">{children}</div>
    </section>
  );
}

const NAV = [
  { id: "geo", label: "AI 검색 최적화" },
  { id: "solutions", label: "구축형 솔루션" },
  { id: "message", label: "메시지 발송" },
  { id: "server", label: "서버 운영비" },
  { id: "hospital-website", label: "병원 홈페이지" },
  { id: "bundle", label: "병원 성장 패키지" },
  { id: "development", label: "맞춤 개발" },
  { id: "payment", label: "결제 방식" },
];

/** 요금 첫 줄 세 가지 원칙 (NHN Cloud 요금 페이지 첫 구역) */
const PRINCIPLES: { title: string; text: string; icon: IconArtKind }[] = [
  {
    title: "모든 요금 공개",
    text: "상담 전에 상품별 금액을 먼저 확인할 수 있습니다.",
    icon: "price",
  },
  {
    title: "바로 결제",
    text: "범위가 정해진 상품은 상담 없이 주문서에서 바로 결제합니다.",
    icon: "steps",
  },
  {
    title: "쓴 만큼 정산",
    text: "서버 운영비와 메시지는 구간·건별로 정산합니다.",
    icon: "module",
  },
];

/** 요금 안내 (NHN Cloud 요금 페이지 구성): 검정 띠 → 왼쪽 바로 가기 + 오른쪽 요금 묶음 */
export function PricingPage() {
  const bundle = hospitalGrowthBundle;
  return (
    <>
      <TrackPageView event="pricing_viewed" />
      <PageHeader
        title="요금 안내"
        lead="모든 서비스 요금을 공개합니다. 금액은 VAT 포함입니다."
        tone="graphite"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact}>요금 상담</ButtonLink>
        </div>
      </PageHeader>
      <div className="nc-container nc-pricing-intro">
        <h2>사피어 요금</h2>
        <ul>
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <IconArt kind={p.icon} id={`pr-${p.icon}`} className="nc-pricing-intro-art" />
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="nc-container nc-pricing">
        <PricingNav items={NAV} />
        <div className="nc-pricing-body">
          <Block
            id="geo"
            title="AI 검색 최적화 (월 구독)"
            desc="병원이 ChatGPT 등 AI 검색에 어떻게 보이는지 진단하고 관리합니다."
          >
            <PlanTable
              plans={geoPlans}
              caption={geoPricingHeadline}
              actions={{
                consultFallback: "geo-fix",
                free: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
              }}
            />
          </Block>

          <Block
            id="solutions"
            title="구축형 솔루션"
            desc="고객사 전용 서버에 세팅합니다. 도입 세팅비 + 월 이용료."
          >
            <PlanTable
              plans={solutionPlans}
              setupLabel="도입 세팅비"
              monthlyLabel="월 이용료"
              actions={{ consultFallback: "crm-adopt", consultLabel: "도입 상담" }}
            />
          </Block>

          <Block id="message" title="메시지 발송 (병원 CRM)" desc={messagePriceNote}>
            <DataTable
              columns={["메시지", "건당"]}
              rows={messagePriceRows.map((m) => [m.name, formatKRW(m.unit)])}
            />
          </Block>

          <Block id="server" title="서버 운영비" desc={serverTierNotes.join(" ")}>
            <DataTable
              columns={["구간", "포함", "월 요금"]}
              rows={serverTiers.map((t) => [
                t.name,
                t.includes,
                t.monthly === null || t.monthly === undefined ? "별도 견적" : formatKRW(t.monthly),
              ])}
            />
          </Block>

          <Block id="hospital-website" title="병원 홈페이지 제작">
            <PlanTable
              plans={hospitalWebsitePlans}
              setupLabel="제작비"
              caption={hospitalWebsiteNotes.join(" ")}
              actions={{ consultFallback: "hospital-website", consultLabel: "제작 상담" }}
            />
          </Block>

          <Block
            id="bundle"
            title={bundle.name}
            desc="병원 솔루션을 함께 쓰면 따로 쓸 때보다 저렴합니다."
          >
            <div className="nc-bundle">
              <div>
                <p className="nc-bundle-label">구성</p>
                <p className="nc-bundle-name">{bundle.includesLabel}</p>
                <p className="nc-bundle-benefit">{bundle.benefit}</p>
              </div>
              <div className="nc-bundle-side">
                <p className="nc-bundle-price">
                  <small>월</small>
                  {formatKRW(bundle.monthly)}
                </p>
                <ButtonLink href={routes.contactFor("hospital-bundle")}>패키지 상담</ButtonLink>
              </div>
            </div>
          </Block>

          <Block id="development" title="맞춤 개발 정찰가">
            <PlanTable
              plans={outsourcingDeposits}
              setupLabel="계약금"
              caption={outsourcingNotes.join(" ")}
              actions={{ consultFallback: "hospital-website" }}
            />
            <ButtonLink href={routes.development.estimate} variant="secondary">
              맞춤 개발 견적 요청
            </ButtonLink>
          </Block>

          <Block id="payment" title="결제 방식">
            <DataTable
              columns={["결제 유형", "대상 상품", "결제 위치", "결제 수단"]}
              rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
            />
            <ButtonLink href={routes.legal.refund} variant="secondary">
              취소 및 환불 규정
            </ButtonLink>
          </Block>
        </div>
      </div>
    </>
  );
}
