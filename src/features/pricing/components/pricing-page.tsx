import Link from "next/link";
import type { ReactNode } from "react";
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
import { ArrowIcon, LandingSection, PageHead, TrackPageView } from "@/shared/ui";
import { PriceRows } from "./price-rows";
import { pricingContent as c } from "../model/content";
import "./pricing.css";

/** 한 갈래 안의 묶음: 작은 제목 + 카드·표 + 안내 */
function Group({
  id,
  title,
  notes = [],
  children,
}: {
  id?: string;
  title: string;
  notes?: string[];
  children: ReactNode;
}) {
  return (
    <div id={id} className="pr-group">
      <h3 className="pr-group-title">{title}</h3>
      {children}
      {notes.length > 0 ? (
        <ul className="pr-notes">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** 요금 페이지: 머리 → 바로 가기 → 병원 → 비즈니스 → 맞춤 개발 → 결제 방식 */
export function PricingPage() {
  const crm = solutionPlans.filter((p) => p.id.startsWith("crm-"));
  const business = solutionPlans.filter((p) => !p.id.startsWith("crm-"));
  const bundle = hospitalGrowthBundle;
  const h = c.hospital;

  return (
    <>
      <TrackPageView event="pricing_viewed" />
      <div className="lc pr">
        <PageHead eyebrow={c.eyebrow} lead={c.lead}>
          <nav className="pr-jump" aria-label="요금 바로 가기">
            {c.jump.map((j) => (
              <a key={j.id} href={`#${j.id}`}>
                {j.label}
              </a>
            ))}
          </nav>
        </PageHead>

        <div id="pr-hospital" className="pr-anchor">
          <LandingSection
            size="compact"
            id="pr-hospital-title"
            title={h.title}
            subtitle={h.subtitle}
          >
            <Group id="geo" title={h.groups.geo} notes={[geoPricingHeadline]}>
              <PriceRows
                plans={geoPlans}
                actions={{
                  consultFallback: "geo-fix",
                  free: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
                }}
              />
            </Group>
            <Group id="hospital-website" title={h.groups.website} notes={hospitalWebsiteNotes}>
              <PriceRows
                plans={hospitalWebsitePlans}
                setupLabel="제작비"
                actions={{ consultFallback: "hospital-website", consultLabel: "제작 상담" }}
              />
            </Group>
            <Group id="solutions" title={h.groups.crm}>
              <PriceRows
                plans={crm}
                setupLabel="세팅"
                actions={{ consultFallback: "crm-adopt", consultLabel: "도입 상담" }}
              />
            </Group>
            <Group id="message" title={h.groups.message} notes={[messagePriceNote]}>
              <PriceRows
                plans={messagePriceRows.map((m) => ({
                  id: m.name,
                  name: m.name,
                  includes: "",
                  monthly: m.unit,
                }))}
                monthlyLabel="건당"
              />
            </Group>
            <Group id="bundle" title={h.groups.bundle}>
              <div className="pr-bundle">
                <div>
                  <p className="pr-bundle-name">{bundle.name}</p>
                  <p className="pr-bundle-includes">{bundle.includesLabel}</p>
                  <p className="pr-bundle-benefit">{bundle.benefit}</p>
                </div>
                <div className="pr-bundle-side">
                  <p className="pr-bundle-price">
                    <small>월</small>
                    {formatKRW(bundle.monthly)}
                  </p>
                  <Link href={routes.contactFor("hospital-bundle")} className="ls-btn">
                    {h.bundleCta}
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </Group>
          </LandingSection>
        </div>

        <div id="pr-business" className="pr-anchor">
          <LandingSection
            size="compact"
            id="pr-business-title"
            title={c.business.title}
            subtitle={c.business.subtitle}
          >
            <Group title={c.business.groups.solutions}>
              <PriceRows
                plans={business}
                setupLabel="세팅"
                actions={{ consultFallback: "connect", consultLabel: "도입 상담" }}
              />
            </Group>
            <Group id="server" title={c.business.groups.server} notes={serverTierNotes}>
              <PriceRows plans={serverTiers} />
            </Group>
          </LandingSection>
        </div>

        <div id="pr-development" className="pr-anchor">
          <LandingSection
            size="compact"
            id="pr-development-title"
            title={c.development.title}
            subtitle={c.development.subtitle}
            action={
              <Link href={routes.development.estimate} className="ls-btn">
                {c.development.estimate}
                <ArrowIcon />
              </Link>
            }
          >
            <Group id="development" title={c.development.groups.packages} notes={outsourcingNotes}>
              <PriceRows
                plans={outsourcingDeposits}
                setupLabel="계약금"
                actions={{ consultFallback: "hospital-website" }}
              />
            </Group>
          </LandingSection>
        </div>

        <div id="pr-payment" className="pr-anchor">
          <LandingSection
            size="compact"
            id="pr-payment-title"
            title={c.payment.title}
            subtitle={c.payment.subtitle}
            action={
              <Link href={routes.legal.refund} className="ls-btn" data-variant="line">
                {c.payment.refund}
                <ArrowIcon />
              </Link>
            }
          >
            <div className="pr-table-wrap">
              <table className="pr-table">
                <thead>
                  <tr>
                    {c.payment.columns.map((col) => (
                      <th key={col} scope="col">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentTypes.map((p) => (
                    <tr key={p.type}>
                      <th scope="row">{p.type}</th>
                      <td>{p.products}</td>
                      <td>{p.where}</td>
                      <td>{p.toss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LandingSection>
        </div>
      </div>
    </>
  );
}
