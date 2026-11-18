import { hospitalWebsiteCases, withCaseImages } from "@/content/portfolio";
import { hospitalWebsiteNotes, hospitalWebsitePlans } from "@/content/pricing";
import { hospitalPageNavigation, routes } from "@/shared/config";
import { JsonLd, serviceGraph } from "@/shared/seo";
import {
  ButtonPair,
  CaseMarquee,
  detailPageWidth,
  detailSectionSpacing,
  FaqList,
  FeatureRows,
  SheetTable,
  SpecStrip,
  SubpageClosing,
  SubpageNavigation,
  SubpageSection,
  subpagePad,
} from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { hospitalWebsiteContent as content } from "../model/content";

const actions = { secondary: content.secondaryCta, primary: content.cta };

function WebsiteHero() {
  const cases = withCaseImages(
    hospitalWebsiteCases.map(({ slug, title }) => ({ title, href: routes.portfolioDetail(slug) })),
    { preferCover: true },
  );

  return (
    <section aria-labelledby="website-title" className={`pt-12 lg:pt-20 ${subpagePad}`}>
      <h1
        id="website-title"
        className="-ml-[0.04em] text-[clamp(2.75rem,8.2vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em]"
      >
        <span className="sr-only">{content.name}</span>
        <span aria-hidden="true">{content.title}</span>
      </h1>
      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
        <div>
          <p className="max-w-xl text-[1.0625rem] leading-relaxed font-medium tracking-[-0.02em] lg:text-xl">
            {content.lead}
          </p>
          <div className="mt-10">
            <ButtonPair {...actions} />
          </div>
        </div>
        <SubpageNavigation {...hospitalPageNavigation} current={routes.hospital.website} />
      </div>
      <section id="screens" aria-labelledby="work-title" className="mt-12 scroll-mt-24 lg:mt-16">
        <h2 id="work-title" className="sr-only">
          제작 사례
        </h2>
        <CaseMarquee id="cases" items={cases} />
      </section>
    </section>
  );
}

export function HospitalWebsitePage() {
  return (
    <article
      className={`${detailPageWidth} ${detailSectionSpacing} bg-white text-black [&_h2]:scroll-mt-24`}
    >
      <JsonLd
        data={serviceGraph({
          path: content.path,
          name: content.name,
          description: content.message,
        })}
      />
      <WebsiteHero />

      <SubpageSection id="problems" first en="Why Hospital Website" sub={[]}>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-700 lg:text-lg">
          {content.why.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 border-t border-black">
          <div className="hidden grid-cols-2 gap-6 border-b border-neutral-200 px-3 py-3 text-sm font-semibold text-neutral-500 sm:grid">
            <span>지금은</span>
            <span>개선 후</span>
          </div>
          <ul>
            {content.comparison.map(({ before, after }) => (
              <li
                key={before}
                className="grid gap-3 border-b border-neutral-200 px-3 py-5 leading-relaxed sm:grid-cols-2 sm:gap-6 sm:py-6"
              >
                <p className="text-neutral-600">
                  <span className="mb-1 block text-sm font-medium sm:sr-only">지금은</span>
                  {before}
                </p>
                <p className="font-semibold">
                  <span className="mb-1 block text-sm font-medium text-neutral-600 sm:sr-only">
                    개선 후
                  </span>
                  {after}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SubpageSection>

      <FeatureRows items={content.features} layout="medium" note={content.premiumNote} />

      <SubpageSection id="process" en="Process" sub={["상담부터 공개 후 관리까지"]}>
        <SpecStrip
          numbered="inline"
          items={content.process.map(({ step, detail }) => ({ name: step, detail }))}
        />
        <div className="mt-12 [&_table]:min-w-0">
          <SheetTable
            caption="병원 홈페이지 제작 및 운영 안내"
            columns={["항목", "내용"]}
            widths={["w-24 sm:w-36"]}
            rows={content.delivery.map(({ item, detail }) => [item, detail])}
          />
        </div>
      </SubpageSection>

      <SubpageSection id="pricing" en="Pricing" sub={["제작 비용과 제공 범위 · VAT 포함"]}>
        <div className="[&_td]:align-middle">
          <PlanTable
            plans={hospitalWebsitePlans}
            setupLabel="제작비"
            caption={hospitalWebsiteNotes.join(" ")}
            actions={{ consultFallback: "hospital-website", consultLabel: "제작 상담" }}
          />
        </div>
      </SubpageSection>

      <SubpageSection
        id="faq"
        en="Questions & Answers"
        sub={["병원 홈페이지 제작과 운영에 대해 자주 묻는 질문"]}
      >
        <FaqList items={content.faq} />
      </SubpageSection>

      <SubpageClosing
        title="우리 병원 홈페이지를 만들고 싶다면"
        description="지금 필요한 진료 안내와 예약 기능부터 함께 정리합니다."
        buttons={actions}
      />
    </article>
  );
}
