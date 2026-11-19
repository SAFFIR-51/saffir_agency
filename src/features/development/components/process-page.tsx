import Link from "next/link";
import { projectStages } from "@/content/company";
import { faqForService } from "@/content/faq";
import { getPortfolioCoverImage, portfolioItems } from "@/content/portfolio";
import { outsourcingDeposits } from "@/content/pricing";
import { developmentPageNavigation, routes } from "@/shared/config";
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
  underlineLink,
} from "@/shared/sections";
import { PlanTable } from "@/shared/ui";
import { processContent as c } from "../model/content";
import { AiDevelopmentBanner } from "./ai-development-banner";

const actions = {
  secondary: { href: "#development-pricing" as const, label: "요금 보기" },
  primary: { href: routes.development.estimate, label: "견적 요청" },
};

export function ProcessPage() {
  const cases = c.caseSlugs.flatMap((slug) => {
    const project = portfolioItems.find((item) => item.slug === slug);
    if (!project) return [];
    return [
      {
        title: project.title,
        href: routes.portfolioDetail(slug),
        image: getPortfolioCoverImage(project),
      },
    ];
  });
  const pricingPlans = outsourcingDeposits.map((plan) => ({
    ...plan,
    includes: c.packageScope[plan.id] ?? plan.includes,
  }));
  return (
    <article
      className={`${detailPageWidth} ${detailSectionSpacing} bg-white text-black [&_[id]]:scroll-mt-24`}
    >
      <JsonLd
        data={serviceGraph({
          path: routes.development.process,
          name: c.name,
          description: c.lead,
          faq: [...faqForService("development"), ...c.faq],
        })}
      />
      <header className={`pt-12 lg:pt-20 ${subpagePad}`}>
        <h1 className="-ml-[0.04em] text-[clamp(2.75rem,8.2vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
          <span className="sr-only">{c.name}</span>
          <span aria-hidden="true">{c.title}</span>
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
          <div>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed font-medium tracking-[-0.02em] lg:text-xl">
              {c.lead}
            </p>
            <div className="mt-10">
              <ButtonPair {...actions} />
            </div>
          </div>
          <SubpageNavigation {...developmentPageNavigation} current={routes.development.process} />
        </div>
        <div className="mt-12 lg:mt-16">
          <CaseMarquee id="development-cases" items={cases} />
        </div>
      </header>

      <SubpageSection id="development-why" en="Why Custom Development" sub={[]}>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-700 lg:text-lg">
          {c.why.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {c.comparison.lead}{" "}
            <strong className="font-semibold text-black">{c.comparison.message}</strong>
          </p>
        </div>
        <table className="mt-8 w-full table-fixed border-collapse border-t border-black text-left text-sm sm:text-base">
          <caption className="sr-only">맞춤 개발 협업 방식 비교</caption>
          <thead>
            <tr className="border-b border-neutral-200 text-xs text-neutral-500 sm:text-sm">
              <th scope="col" className="w-1/6 py-3 pr-2 font-semibold">
                항목
              </th>
              <th scope="col" className="w-1/4 py-3 pr-2 font-semibold sm:pr-4">
                대형 에이전시
              </th>
              <th scope="col" className="w-1/4 py-3 pr-2 font-semibold sm:pr-4">
                프리랜서
              </th>
              <th scope="col" className="py-3 font-bold text-black">
                SAFFIR
              </th>
            </tr>
          </thead>
          <tbody>
            {c.comparison.rows.map(({ item, agency, freelancer, saffir }) => (
              <tr key={item} className="border-b border-neutral-200 align-top leading-relaxed">
                <th scope="row" className="py-4 pr-2 font-semibold sm:py-6">
                  {item}
                </th>
                <td className="py-4 pr-2 text-neutral-600 sm:py-6 sm:pr-4">{agency}</td>
                <td className="py-4 pr-2 text-neutral-600 sm:py-6 sm:pr-4">{freelancer}</td>
                <td className="py-4 font-semibold sm:py-6">{saffir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SubpageSection>

      <FeatureRows
        id="development-features"
        layout="medium"
        items={c.features.map((feature) => ({
          ...feature,
          photoFrameClassName: "md:before:block md:before:aspect-video",
        }))}
      />

      <SubpageSection id="development-process" en="Process" sub={[c.processLead]}>
        <SpecStrip
          numbered="inline"
          items={projectStages.map(({ stage, detail, deliverable }) => ({
            name: stage,
            detail: (
              <>
                {detail}
                <span className="mt-2 block text-sm font-semibold text-black">{deliverable}</span>
              </>
            ),
          }))}
        />
        <AiDevelopmentBanner />
      </SubpageSection>

      <SubpageSection
        id="development-pricing"
        en="Pricing"
        sub={["정찰가 패키지 계약금 · VAT 포함"]}
      >
        <div className="[&_td]:align-middle">
          <PlanTable
            plans={pricingPlans}
            setupLabel="계약금"
            actions={{ consultFallback: "development-estimate" }}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{c.pricingNote}</p>
        <p className="mt-2 text-sm text-neutral-600">
          그 외 맞춤 개발은{" "}
          <Link href={routes.development.estimate} className={underlineLink}>
            견적 요청
          </Link>
          을 통해 범위와 금액을 안내합니다.
        </p>
        <div className="mt-10 [&_table]:min-w-0">
          <h3 className="mb-4 text-lg font-bold">계약·납품·유지보수</h3>
          <SheetTable
            caption="계약·납품·유지보수"
            columns={["항목", "내용"]}
            widths={["w-24 sm:w-36"]}
            rows={c.contract.map(({ item, detail }) => [item, detail])}
          />
        </div>
      </SubpageSection>

      <SubpageSection id="development-faq" en="Questions & Answers" sub={["자주 묻는 질문"]}>
        <FaqList items={[...faqForService("development"), ...c.faq]} />
      </SubpageSection>

      <SubpageClosing {...c.closing} buttons={actions} />
    </article>
  );
}
