import { hospitalWebsiteCases, withCaseImages } from "@/content/portfolio";
import { geoPlans, geoPricingHeadline } from "@/content/pricing";
import { hospitalPageNavigation, routes } from "@/shared/config";
import { JsonLd, serviceGraph } from "@/shared/seo";
import {
  BeforeAfter,
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
import { geoContent as content } from "../model/content";

export function GeoLandingPage() {
  const cases = withCaseImages(
    hospitalWebsiteCases.map(({ slug, title }) => ({ title, href: routes.portfolioDetail(slug) })),
    { preferCover: true },
  );

  return (
    <article
      className={`${detailPageWidth} ${detailSectionSpacing} bg-white text-black [&_[id]]:scroll-mt-24`}
    >
      <JsonLd
        data={serviceGraph({
          path: content.path,
          name: content.name,
          description: content.message,
        })}
      />
      <header className={`pt-12 lg:pt-20 ${subpagePad}`}>
        <h1 className="-ml-[0.04em] text-[clamp(2.75rem,8.2vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
          <span className="sr-only">{content.name}</span>
          <span aria-hidden="true">{content.title}</span>
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
          <div>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed font-medium tracking-[-0.02em] lg:text-xl">
              {content.message}
            </p>
            <div className="mt-10">
              <ButtonPair secondary={content.pricing} primary={content.diagnosis} />
            </div>
          </div>
          <SubpageNavigation {...hospitalPageNavigation} current={routes.hospital.geo} />
        </div>
      </header>

      <section
        id="screens"
        aria-label="병원 홈페이지 제작 사례"
        className={`mt-12 lg:mt-16 ${subpagePad}`}
      >
        <CaseMarquee id="cases" items={cases} />
      </section>

      <SubpageSection id="problems" en="Why AI Search Optimization" sub={[]}>
        <BeforeAfter caption="AI 검색 최적화 전후 비교" comparison={content.comparison}>
          {content.why.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </BeforeAfter>
      </SubpageSection>

      <FeatureRows id="diagnosis" items={content.features} layout="medium" />

      <SubpageSection id="process" en="Process" sub={["진단부터 개선과 추적까지"]}>
        <SpecStrip numbered="inline" items={content.process} />
        <div className="mt-12 [&_table]:min-w-0">
          <SheetTable
            caption="AI 검색 최적화 점검 범위"
            columns={["항목", "확인하는 내용"]}
            widths={["w-24 sm:w-36"]}
            rows={content.measurement.map(({ name, detail }) => [name, detail])}
          />
        </div>
      </SubpageSection>

      <SubpageSection id="pricing" en="Pricing" sub={["AI 검색 최적화 월 구독 · VAT 포함"]}>
        <div className="[&_td]:align-middle">
          <PlanTable
            plans={geoPlans}
            monthlyLabel="월 이용료"
            caption={geoPricingHeadline}
            actions={{ consultFallback: "geo-fix", free: content.diagnosis }}
          />
        </div>
      </SubpageSection>

      <SubpageSection
        id="faq"
        en="Questions & Answers"
        sub={["AI 검색 최적화에 대해 자주 묻는 질문"]}
      >
        <FaqList items={content.faq} />
      </SubpageSection>

      <SubpageClosing
        title="우리 병원이 AI 검색에서 어떻게 보이는지 궁금하다면"
        description="운영 중인 홈페이지를 기준으로 먼저 확인할 항목을 함께 정리합니다."
        buttons={{ secondary: content.diagnosis, primary: content.consult }}
      />
    </article>
  );
}
