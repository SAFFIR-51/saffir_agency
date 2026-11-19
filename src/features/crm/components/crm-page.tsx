import Image from "next/image";
import Link from "next/link";
import { installedSolutionRows } from "@/content/company";
import { faqForService } from "@/content/faq";
import { messagePriceRows, solutionPlans } from "@/content/pricing";
import { hospitalPageNavigation, routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  BeforeAfter,
  ButtonLabel,
  ButtonPair,
  CaseMarquee,
  detailPageWidth,
  detailSectionSpacing,
  FaqList,
  FeatureRows,
  lightButton,
  SheetTable,
  SpecStrip,
  SubpageClosing,
  SubpageNavigation,
  SubpageSection,
  subpagePad,
} from "@/shared/sections";
import { JsonLd, serviceGraph } from "@/shared/seo";
import { PlanTable } from "@/shared/ui";
import { crmPage as c } from "../model/content";

/** 1. 첫 화면: 큰 제목·소개·버튼 */
function Hero() {
  const h = c.hero;
  return (
    <section aria-labelledby="crm-title" className={`pt-12 lg:pt-20 ${subpagePad}`}>
      <h1
        id="crm-title"
        className="-ml-[0.04em] text-[clamp(2.75rem,8.2vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em]"
      >
        <span className="sr-only">{h.srTitle}</span>
        <span aria-hidden="true">{h.title}</span>
      </h1>
      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
        <div>
          <p className="max-w-xl text-[1.0625rem] leading-[1.6] font-medium tracking-[-0.02em] whitespace-pre-line lg:text-xl">
            {h.lead}
          </p>
          <div className="mt-10">
            <ButtonPair secondary={h.secondary} primary={h.primary} />
          </div>
        </div>
        <SubpageNavigation {...hospitalPageNavigation} current={routes.hospital.crm} />
      </div>
    </section>
  );
}

function Problems() {
  const p = c.problems;
  return (
    <SubpageSection id="crm-problems" en={p.title} sub={p.sub}>
      <BeforeAfter caption="병원 CRM 도입 전후 비교" comparison={p.rows}>
        {p.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </BeforeAfter>
    </SubpageSection>
  );
}

function Channels() {
  const ch = c.channels;
  const row =
    "grid flex-1 grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-3 border-t border-neutral-200 px-4 py-3.5 sm:px-5";
  return (
    <SubpageSection id="crm-channels" en={ch.title} sub={ch.sub}>
      <div className="grid gap-6 lg:gap-8">
        {ch.items.map((channel, index) => (
          <section
            key={channel.name}
            aria-labelledby={`crm-channel-${index}`}
            className="grid min-w-0 gap-4 md:grid-cols-2"
          >
            <div className="flex min-w-0 flex-col border border-neutral-200">
              <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 bg-neutral-100 px-4 py-4 sm:px-5">
                <h3 id={`crm-channel-${index}`} className="text-xl font-bold tracking-[-0.02em]">
                  {channel.name}
                </h3>
                <p className="text-sm font-medium text-neutral-600">{channel.tag}</p>
              </header>
              <dl className="flex flex-1 flex-col text-[0.9375rem] leading-relaxed">
                {ch.rows.map((item) => (
                  <div key={item.label} className={row}>
                    <dt className="font-semibold">{item.label}</dt>
                    <dd className="text-neutral-700">{item.values[index]}</dd>
                  </div>
                ))}
                <div className={row}>
                  <dt className="font-semibold">건당 요금</dt>
                  <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
                    {channel.prices.map(({ name, label }) => {
                      const unit = messagePriceRows.find((price) => price.name === name)?.unit;
                      return (
                        <span
                          key={name}
                          className={label ? "text-sm text-neutral-600" : "font-semibold"}
                        >
                          {label && `${label} `}
                          {unit === undefined ? "상담" : formatKRW(unit)}
                        </span>
                      );
                    })}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="relative aspect-[4/3] w-full self-start bg-neutral-100">
              <Image
                src={channel.image}
                alt={channel.imageAlt}
                fill
                sizes="(min-width: 1088px) 496px, (min-width: 1024px) calc(50vw - 48px), (min-width: 768px) calc(50vw - 28px), calc(100vw - 40px)"
                className="object-contain"
              />
            </div>
          </section>
        ))}
      </div>
      <p className="mt-4 text-sm leading-[1.6] text-neutral-600">{ch.note}</p>
    </SubpageSection>
  );
}

function Features() {
  return (
    <FeatureRows
      id="crm-features"
      layout="medium"
      lead={c.features.sub[0]}
      items={c.features.items.map(({ no, name, ...item }) => ({
        photoClassName: "bg-slate-100 object-contain",
        ...item,
        label: `${no} ${name}`,
        photoFrameClassName: "max-md:aspect-[4/3] md:before:block md:before:aspect-[4/3]",
        photoUnoptimized: true,
      }))}
    />
  );
}

function Process() {
  return (
    <SubpageSection id="crm-flow" en={c.flow.title} sub={c.flow.sub}>
      <SpecStrip
        numbered="inline"
        items={c.flow.steps.map(({ step, detail }) => ({ name: step, detail }))}
      />
      <div className="mt-12 [&_table]:min-w-0">
        <SheetTable
          caption="병원 CRM 제공 방식"
          columns={["항목", "내용"]}
          widths={["w-24 sm:w-36"]}
          rows={installedSolutionRows.map(({ item, detail }) => [item, detail])}
        />
      </div>
    </SubpageSection>
  );
}

const securityIcons = {
  server:
    "M20 5c0 1.66-3.58 3-8 3S4 6.66 4 5s3.58-3 8-3 8 1.34 8 3ZM4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3",
  lock: "M8 10V7a4 4 0 0 1 8 0v3M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2ZM12 14v3",
  shield: "M12 22c5-2.2 8-5.5 8-10V6l-8-4-8 4v6c0 4.5 3 7.8 8 10ZM9 12l2 2 4-4",
  backup:
    "M7 18H6a4 4 0 0 1-.3-8 6.5 6.5 0 0 1 12.3-1.3 4.7 4.7 0 0 1 0 9.3h-1M12 21v-9m-3 3 3-3 3 3",
};

function Security() {
  const s = c.security;
  return (
    <SubpageSection id="crm-security" en={s.title} sub={s.sub}>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {s.cards.map((card) => (
          <li key={card.name} className="bg-[#f5f5f5] p-6 lg:p-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mb-4 size-7 text-neutral-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={securityIcons[card.icon]} />
            </svg>
            <p className="text-lg font-bold tracking-[-0.02em]">{card.name}</p>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-neutral-700">{card.detail}</p>
          </li>
        ))}
      </ul>
      <Link href={s.link.href} className={`mt-6 ${lightButton}`}>
        <ButtonLabel>{s.link.label}</ButtonLabel>
      </Link>
    </SubpageSection>
  );
}

function Pricing() {
  const p = c.pricing;
  const plans = solutionPlans.filter((plan) => plan.id.startsWith("crm-"));
  return (
    <SubpageSection id="crm-pricing" en={p.title} sub={p.sub}>
      <div className="[&_td]:align-middle [&_td:last-child]:pr-0 [&_td:last-child]:text-right [&_th:last-child]:pr-0 [&_th:last-child]:text-right">
        <PlanTable
          plans={plans}
          setupLabel={p.setupLabel}
          monthlyLabel={p.monthlyLabel}
          caption={p.vat}
          actions={{
            consultFallback: "crm-adopt",
            consultLabel: p.consultLabel,
            highlightConsult: true,
          }}
        />
      </div>
      <h3 className="mt-10 text-base font-semibold">{p.messageTitle}</h3>
      <ul className="mt-3 border-t border-black">
        {messagePriceRows.map((message) => (
          <li
            key={message.name}
            className="flex justify-between gap-4 border-b border-neutral-200 py-3 text-[0.9375rem]"
          >
            <span>{message.name}</span>
            <span className="font-semibold tabular-nums">
              {message.unit === undefined ? "상담" : formatKRW(message.unit)}
            </span>
          </li>
        ))}
      </ul>
      <Link href={p.more.href} className={`mt-6 ${lightButton}`}>
        <ButtonLabel>{p.more.label}</ButtonLabel>
      </Link>
    </SubpageSection>
  );
}

function Faq() {
  const faq = faqForService("crm");
  if (faq.length === 0) return null;
  return (
    <SubpageSection id="crm-faq" en={c.faq.title} sub={c.faq.sub}>
      <FaqList items={faq} />
    </SubpageSection>
  );
}

/** 검색·AI용 구조화데이터: 서비스 + 화면의 요금(월 이용료) + FAQ */
function CrmJsonLd() {
  const offers = solutionPlans
    .filter((plan) => plan.id.startsWith("crm-") && plan.monthly != null)
    .map((plan) => ({
      name: plan.name,
      price: plan.monthly ?? 0,
      description: `월 이용료, 부가세 별도${plan.setup != null ? `. 도입 세팅비 ${formatKRW(plan.setup)}` : ""}`,
    }));
  return (
    <JsonLd
      data={serviceGraph({
        path: routes.hospital.crm,
        name: c.hero.srTitle,
        description:
          "방문 이력으로 환자를 나누고 검진·재처치 시기에 알림톡·문자 안내를 예약해 보내는 병원 CRM. 병원마다 전용 서버·DB로 운영합니다.",
        faq: faqForService("crm"),
        offers,
      })}
    />
  );
}

export function CrmPage() {
  return (
    <article
      className={`${detailPageWidth} ${detailSectionSpacing} bg-white text-black [&_[id]]:scroll-mt-24`}
    >
      <CrmJsonLd />
      <Hero />
      <div className={`mt-12 lg:mt-16 ${subpagePad}`}>
        <CaseMarquee
          items={[
            {
              title: "사피어의원 카카오 알림톡 예약 안내와 채널 광고를 보여주는 두 대의 휴대폰",
              image: "/images/hospital/crm-kakao-duo-marble.webp",
            },
            {
              title: "사피어의원 SMS 예약 안내와 MMS 건강 강좌 광고 화면",
              image: "/images/hospital/crm-sms-mms.webp",
            },
            {
              title: "사피어 CRM 어드민 예시. 알림톡 템플릿 정보와 발송 미리보기.",
              image: "/images/hospital/crm-admin-portfolio-saffir.webp",
            },
          ]}
        />
      </div>
      <Problems />
      <Features />
      <Channels />
      <Process />
      <Security />
      <Pricing />
      <Faq />
      <SubpageClosing
        title={c.closing.title}
        description={
          <>
            {c.closing.description} <span className="mt-2 block text-sm">{c.closing.detail}</span>
          </>
        }
        buttons={c.hero}
      />
    </article>
  );
}
