import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { installedSolutionRows } from "@/content/company";
import { withCaseImages } from "@/content/portfolio";
import { businessPageNavigation, routes } from "@/shared/config";
import { JsonLd, serviceGraph } from "@/shared/seo";
import {
  ButtonPair,
  CaseMarquee,
  detailPageWidth,
  detailSectionSpacing,
  FaqList,
  type FeatureLayout,
  FeatureRows,
  SheetTable,
  SpecStrip,
  SubpageClosing,
  SubpageNavigation,
  SubpageSection,
  subpagePad,
  underlineLink,
} from "@/shared/sections";
import { type BusinessSolutionContent, solutionsOverviewContent } from "../model/content";

export function BusinessSolutionPage({
  content,
  featureLayout,
  overview,
  pricing,
}: {
  content: BusinessSolutionContent;
  featureLayout?: FeatureLayout;
  overview: ReactNode;
  pricing: ReactNode;
}) {
  const previews = withCaseImages(content.cases, { preferCover: true }).flatMap(
    ({ title, href, image }) => (href && image ? [{ title, href, image }] : []),
  );
  const [preview] = previews;
  const actions = {
    secondary: { href: "#pricing" as const, label: "요금 보기" },
    primary: content.cta,
  };

  return (
    <article
      className={`${detailPageWidth} bg-white text-black ${detailSectionSpacing} [&_[id]]:scroll-mt-24`}
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
          <span aria-hidden="true" className="whitespace-pre-line">
            {content.heroTitle ?? content.title}
          </span>
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
          <div>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed font-medium tracking-[-0.02em] lg:text-xl">
              {content.message}
            </p>
            <div className="mt-10">
              <ButtonPair {...actions} />
            </div>
          </div>
          <SubpageNavigation {...businessPageNavigation} current={content.path} />
        </div>
      </header>

      <section id="screens" aria-label="제작 사례" className={`mt-12 lg:mt-16 ${subpagePad}`}>
        {previews.length > 1 ? (
          <CaseMarquee id="cases" items={previews} />
        ) : (
          <div
            id="cases"
            className="relative aspect-[4/3] w-full max-w-[46rem] overflow-hidden bg-neutral-100"
          >
            {preview && (
              <Image
                src={preview.image}
                alt={preview.title}
                fill
                sizes="(max-width: 775px) calc(100vw - 40px), 736px"
                className="object-cover"
              />
            )}
          </div>
        )}
      </section>

      <SubpageSection id="problems" en={`Why ${content.title}`} sub={[]}>
        {overview}
      </SubpageSection>

      <FeatureRows items={content.features} layout={featureLayout} />

      <SubpageSection id="process" en="Process" sub={["도입 절차"]}>
        <SpecStrip
          numbered="inline"
          items={content.process.map(({ step, detail }) => ({ name: step, detail }))}
        />
        <div className="mt-12">
          <SheetTable
            caption="제공 방식"
            columns={["항목", "내용"]}
            rows={installedSolutionRows.map(({ item, detail }) => [item, detail])}
          />
        </div>
      </SubpageSection>

      <SubpageSection
        id="pricing"
        en="Pricing"
        sub={["금액은 VAT 포함입니다. 상담 후 결제합니다."]}
      >
        <div className="[&_td]:align-middle">{pricing}</div>
      </SubpageSection>

      <SubpageSection id="faq" en="Questions & Answers" sub={["자주 묻는 질문"]}>
        <FaqList items={content.faq} />
        <Link href={routes.faq} className={`mt-6 inline-block text-sm ${underlineLink}`}>
          전체 질문 보기
        </Link>
      </SubpageSection>

      <SubpageClosing {...solutionsOverviewContent.closing} buttons={actions} />
    </article>
  );
}
