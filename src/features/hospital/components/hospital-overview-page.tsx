import Link from "next/link";
import { hospitalDifferentiator, hospitalJourney } from "@/content/hospital";
import {
  geoPlans,
  geoPricingHeadline,
  hospitalGrowthBundle,
  hospitalWebsitePlans,
  solutionPlans,
} from "@/content/pricing";
import { listServices, type Service } from "@/content/services";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { ArrowIcon, ImageSlot, LandingSection } from "@/shared/ui";
import { hospitalOverviewContent as c } from "../model/overview-content";
import "./hospital.css";

function minOf(values: Array<number | null | undefined>) {
  const v = values.filter((x): x is number => typeof x === "number" && x > 0);
  return v.length > 0 ? Math.min(...v) : null;
}

/** 서비스 카드에 보이는 시작 가격 (요금 데이터에서 계산) */
function startPrice(id: Service["id"]) {
  const crm = solutionPlans.filter((p) => p.id.startsWith("crm-"));
  const from = (label: string, value: number | null) =>
    value === null ? "별도 견적" : `${label}${formatKRW(value)}부터`;
  switch (id) {
    case "geo":
      return from("월 ", minOf(geoPlans.map((p) => p.monthly)));
    case "ad-check":
      return "무료";
    case "hospital-website":
      return from("", minOf(hospitalWebsitePlans.map((p) => p.setup)));
    case "crm":
      return from("세팅 ", minOf(crm.map((p) => p.setup)));
    default:
      return "별도 견적";
  }
}

/**
 * 병원 솔루션 허브. 읽기 쉬움이 먼저:
 * 한글 제목을 크게, 본문은 16~20px, 줄 간격 넉넉하게, 한 줄 길이는 960px 이하.
 */
export function HospitalOverviewPage() {
  const bundle = hospitalGrowthBundle;
  const separate = [...geoPlans, ...solutionPlans]
    .filter((p) => bundle.includes.includes(p.id))
    .reduce((sum, p) => sum + (p.monthly ?? 0), 0);

  return (
    <div className="hp">
      {/* 첫 화면: 영문 작은 제목 → 한글 큰 제목 → 설명 → 버튼 → 이미지 칸 */}
      <section className="hp-hero ls-sec" aria-labelledby="hp-title">
        <div className="ls-inner">
          <p className="hp-eyebrow" lang="en">
            {c.eyebrow}
          </p>
          <h1 id="hp-title" className="hp-title">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h1>
          <p className="hp-lead">{c.lead}</p>
          <div className="hp-actions">
            <Link href={routes.hospital.geo} className="ls-btn">
              {c.primaryCta}
              <ArrowIcon />
            </Link>
            <Link
              href={routes.contactFor("hospital-bundle")}
              className="ls-btn"
              data-variant="line"
            >
              {c.bundleCta}
            </Link>
          </div>
          <div className="hp-hero-media">
            <ImageSlot label={c.heroSlot} />
          </div>
        </div>
      </section>

      {/* 서비스 4가지: 이름 · 한 줄 설명 · 시작 가격 · 주요 내용 */}
      <LandingSection id="hp-services" title={c.services.en} subtitle={c.services.title}>
        <ul className="hp-services">
          {listServices("hospital").map((s, i) => (
            <li key={s.id}>
              <Link href={s.href} className="hp-service">
                <span className="hp-service-no" lang="en">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="hp-service-name">{s.name}</h3>
                <p className="hp-service-msg">{s.message}</p>
                <p className="hp-service-price">{startPrice(s.id)}</p>
                <ul className="hp-service-points">
                  {(c.servicePoints[s.id] ?? s.highlights).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <span className="hp-service-more">
                  {c.services.more}
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="hp-principle">{geoPricingHeadline}</p>
      </LandingSection>

      {/* 고객 흐름: 번호 · 단계 · 하는 일 · 서비스 */}
      <LandingSection id="hp-journey" title={c.journey.en} subtitle={c.journey.title}>
        <ol className="hp-journey">
          {hospitalJourney.map((j, i) => (
            <li key={j.step}>
              <span className="hp-journey-no" lang="en" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="hp-journey-step">{j.step}</h3>
              <p className="hp-journey-detail">{j.detail}</p>
              <p className="hp-journey-service">{j.service}</p>
            </li>
          ))}
        </ol>
      </LandingSection>

      {/* 차별점: 큰 글씨 한 문단 */}
      <LandingSection id="hp-why" title={c.why.en} subtitle={hospitalDifferentiator.title}>
        <p className="hp-statement">{hospitalDifferentiator.description}</p>
      </LandingSection>

      {/* 패키지: 구성·혜택 | 가격(따로 쓸 때 대비) */}
      <LandingSection id="hp-bundle" title={c.bundle.en} subtitle={c.bundle.title}>
        <div className="hp-bundle">
          <div>
            <dl className="hp-bundle-info">
              <div>
                <dt>구성</dt>
                <dd>{bundle.includesLabel}</dd>
              </div>
            </dl>
            <p className="hp-bundle-benefit">{bundle.benefit}</p>
          </div>
          <div className="hp-bundle-price">
            <p className="hp-bundle-separate">
              {c.bundle.separate} <s>월 {formatKRW(separate)}</s>
            </p>
            <p className="hp-bundle-now">
              <small>월</small>
              {formatKRW(bundle.monthly)}
            </p>
            <p className="hp-bundle-vat">{c.bundle.vat}</p>
          </div>
        </div>
        <div className="hp-actions">
          <Link href={routes.contactFor("hospital-bundle")} className="ls-btn">
            {c.bundleCta}
            <ArrowIcon />
          </Link>
          <Link href={`${routes.pricing}#bundle`} className="ls-btn" data-variant="line">
            {c.bundle.pricing}
          </Link>
        </div>
      </LandingSection>
    </div>
  );
}
