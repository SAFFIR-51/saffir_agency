import Link from "next/link";
import { businessModels, developmentAreas, modules, workflow } from "@/content/company";
import {
  geoPlans,
  hospitalGrowthBundle,
  hospitalWebsiteNotes,
  hospitalWebsitePlans,
  messagePriceNote,
  messagePriceRows,
  outsourcingDeposits,
  serverTierNotes,
  serverTiers,
  solutionPlans,
  type Plan,
} from "@/content/pricing";
import { listServices, serviceLines } from "@/content/services";
import { routes } from "@/shared/config";
import { ArrowIcon, ImageSlot, LandingSection } from "@/shared/ui";
import { homeContent as c } from "../../model/content";
import { PriceReceipt, type ReceiptPrice, type ReceiptRow } from "./price-receipt";
import "./home-sections.css";

/** S2 · 세 갈래: 병원 / 비즈니스 / 맞춤 개발 (같은 크기 카드) */
export function EntrySection() {
  const l = c.entry.lines;
  const lines = [
    {
      ...l.hospital,
      name: serviceLines.hospital.name,
      href: routes.hospital.root,
      items: listServices("hospital").map((s) => s.name),
    },
    {
      ...l.business,
      name: serviceLines.business.name,
      href: routes.solutions.root,
      items: listServices("business").map((s) => s.name),
    },
    {
      ...l.development,
      name: "맞춤 개발",
      href: routes.development.root,
      items: developmentAreas,
    },
  ];

  return (
    <LandingSection id="home-entry" title={c.entry.title} subtitle={c.entry.subtitle}>
      <ul className="hs-entry">
        {lines.map((line, i) => (
          <li key={line.en}>
            <div className="hs-entry-media" aria-hidden="true">
              <ImageSlot label={line.slot} tone={i} />
            </div>
            <div className="hs-entry-body">
              <p className="hs-entry-en" lang="en">
                {line.en}
              </p>
              <h3 className="hs-entry-name">{line.name}</h3>
              <p className="ls-ko hs-entry-desc">{line.description}</p>
              <ul className="hs-entry-items">
                {line.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="hs-entry-actions">
                <Link href={line.start.href} className="ls-btn">
                  {line.start.label}
                  <ArrowIcon />
                </Link>
                <Link href={line.href} className="ls-btn" data-variant="line">
                  {c.entry.more}
                  <span className="sr-only"> ({line.name})</span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}

/** S4 · 제공 방식 3가지: 번호·영문 이름 / 한글 이름 / 상품·방식·요금 세 줄 */
export function ModelsSection() {
  const rows = [
    { key: "products", label: "대표 상품" },
    { key: "delivery", label: "제공 방식" },
    { key: "revenue", label: "요금 방식" },
  ] as const;
  return (
    <LandingSection id="home-models" title={c.models.title} subtitle={c.models.subtitle}>
      <ul className="hs-models">
        {businessModels.map((m, i) => (
          <li key={m.type}>
            <div className="hs-model-top" lang="en">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{c.models.en[i]}</span>
            </div>
            <h3 className="hs-model-name">{m.type}</h3>
            <dl className="hs-model-rows">
              {rows.map((row) => (
                <div key={row.key}>
                  <dt>{row.label}</dt>
                  <dd>{m[row.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}

/** S5 · 진행 순서 4단계 */
export function WorkflowSection() {
  return (
    <LandingSection id="home-workflow" title={c.workflow.title} subtitle={c.workflow.subtitle}>
      <ol className="hs-steps">
        {workflow.map((w, i) => (
          <li key={w.step}>
            <span className="hs-step-no" lang="en" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="hs-step-name">{w.step}</h3>
            <p className="ls-ko hs-step-detail">{w.detail}</p>
          </li>
        ))}
      </ol>
    </LandingSection>
  );
}

/** S6 · 보유 모듈: 모듈 6칸 = 완성본, 아래에 고르고 → 조합하고 → 오픈 */
export function ModulesSection() {
  const m = c.modules;
  return (
    <LandingSection id="home-modules" title={m.title} subtitle={m.subtitle} ko={m.description}>
      <div className="hs-build">
        <ol className="hs-build-modules">
          {modules.map((name, i) => (
            <li key={name}>
              <span className="hs-build-no" lang="en">
                M{String(i + 1).padStart(2, "0")}
              </span>
              <strong>{name}</strong>
            </li>
          ))}
        </ol>
        <div className="hs-build-eq" aria-hidden="true">
          =
        </div>
        <figure className="hs-build-result">
          <div className="hs-build-media">
            <ImageSlot label={m.result.slot} tone={2} />
          </div>
          <figcaption>
            <span lang="en">{m.result.label}</span>
            {m.result.caption}
          </figcaption>
        </figure>
      </div>
      <ol className="hs-build-steps">
        {m.steps.map((step, i) => (
          <li key={step.en}>
            <span lang="en">
              {String(i + 1).padStart(2, "0")} {step.en}
            </span>
            <p className="ls-ko">{step.ko}</p>
          </li>
        ))}
      </ol>
    </LandingSection>
  );
}

function minPrice(values: Array<number | null | undefined>) {
  const prices = values.filter((v): v is number => typeof v === "number" && v > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

/** 요금 데이터 한 줄 → 영수증 한 줄. note에 "~"가 있으면 그 이상일 수 있다는 뜻 */
function row(plan: Plan, show: { setup?: string; monthly?: string } = {}): ReceiptRow {
  const from = plan.note?.includes("~") ?? false;
  const prices: ReceiptPrice[] = [];
  if (plan.setup !== undefined) prices.push({ label: show.setup, value: plan.setup, from });
  if (plan.monthly !== undefined) prices.push({ label: show.monthly, value: plan.monthly, from });
  return { name: plan.name, includes: plan.includes, prices };
}

const SETUP_MONTHLY = { setup: "세팅", monthly: "월" };

/** S7 · 요금: 세 갈래 상세 요금표 (영수증 3장) */
export function PricingSection() {
  const crmIds = ["crm-basic", "crm-standard", "crm-network"];
  const crm = solutionPlans.filter((p) => crmIds.includes(p.id));
  const business = solutionPlans.filter((p) => !crmIds.includes(p.id));
  const vat = c.pricing.note;

  const receipts = [
    {
      en: "Hospital",
      name: serviceLines.hospital.name,
      groups: [
        {
          title: "AI 검색 최적화 · 월 구독",
          rows: geoPlans.map((p) => row(p, { monthly: "월" })),
        },
        {
          title: "병원 홈페이지 · 제작",
          rows: hospitalWebsitePlans.map((p) => row(p, { monthly: "월" })),
        },
        { title: "병원 CRM · 세팅 + 월 이용료", rows: crm.map((p) => row(p, SETUP_MONTHLY)) },
        {
          title: "메시지 발송 · 건당",
          rows: messagePriceRows.map((m) => ({
            name: m.name,
            prices: [{ value: m.unit }],
          })),
        },
        {
          title: "패키지",
          rows: [
            {
              name: hospitalGrowthBundle.name,
              includes: `${hospitalGrowthBundle.includesLabel}. ${hospitalGrowthBundle.benefit}`,
              prices: [{ label: "월", value: hospitalGrowthBundle.monthly }],
            },
          ],
        },
      ],
      start: { label: "AI 검색 최적화 모니터링", value: minPrice(geoPlans.map((p) => p.monthly)) },
      notes: [vat, ...hospitalWebsiteNotes, messagePriceNote],
    },
    {
      en: "Business",
      name: serviceLines.business.name,
      groups: [
        { title: "솔루션 · 세팅 + 월 이용료", rows: business.map((p) => row(p, SETUP_MONTHLY)) },
        {
          title: "서버 운영비 · 월",
          rows: serverTiers.map((p) => row(p, { monthly: "월" })),
        },
      ],
      start: { label: "도입 세팅비", value: minPrice(business.map((p) => p.setup)) },
      notes: [vat, ...serverTierNotes],
    },
    {
      en: "Development",
      name: "맞춤 개발",
      groups: [
        {
          title: "정찰가 패키지 · 계약금",
          rows: outsourcingDeposits.map((p) => row(p)),
        },
        {
          title: "추가 개발",
          rows: [{ name: "웹·앱, 쇼핑몰, 플랫폼 연동, AI, IoT", prices: [{ value: null }] }],
        },
      ],
      start: { label: "정찰가 계약금", value: minPrice(outsourcingDeposits.map((p) => p.setup)) },
      notes: [vat, c.pricing.devNote],
    },
  ];

  return (
    <LandingSection
      id="home-pricing"
      title={c.pricing.title}
      subtitle={c.pricing.subtitle}
      action={
        <Link href={routes.pricing} className="ls-btn">
          {c.pricing.all}
          <ArrowIcon />
        </Link>
      }
    >
      <div className="rc-list">
        {receipts.map((r, i) => (
          <PriceReceipt key={r.en} index={i + 1} total={receipts.length} {...r} />
        ))}
      </div>
    </LandingSection>
  );
}
