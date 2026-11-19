import Image from "next/image";
import Link from "next/link";
import { getPortfolioCoverImage } from "@/content/portfolio";
import { routes } from "@/shared/config";
import { JsonLd } from "@/shared/seo";
import {
  ButtonLabel,
  darkButton,
  detailPageWidth,
  sectionTitle,
  SheetTable,
  subpagePad,
  underlineLink,
} from "@/shared/sections";
import { getPortfolioJsonLd } from "../api/metadata";
import { findPortfolio } from "../api/queries";
import type { PortfolioCaseStudy } from "../model/case-studies";
import { PortfolioCaseStudyFigure } from "./portfolio-case-study-figure";

type Props = {
  item: NonNullable<ReturnType<typeof findPortfolio>>;
  study: PortfolioCaseStudy;
};

export function PortfolioCaseStudyPage({ item, study }: Props) {
  const jsonLd = getPortfolioJsonLd(item.slug);
  const related = study.relatedSlugs
    .map((slug) => findPortfolio(slug))
    .filter((project) => project !== undefined);

  return (
    <article className={`${detailPageWidth} bg-white text-black`}>
      {jsonLd && <JsonLd data={jsonLd} />}
      <header className={`pt-12 lg:pt-20 ${subpagePad}`}>
        <Link href={routes.portfolio} className={`text-sm text-neutral-600 ${underlineLink}`}>
          포트폴리오 목록
        </Link>
        <h1 className="mt-8 -ml-[0.04em] text-[clamp(2.5rem,6.8vw,6rem)] leading-[1.05] font-extrabold tracking-[-0.05em] text-balance">
          {study.title}
        </h1>
        <p className="mt-8 max-w-3xl text-[1.0625rem] leading-relaxed font-medium tracking-[-0.02em] lg:text-xl">
          {study.introduction}
        </p>
        <dl
          aria-label="프로젝트 개요"
          className="mt-10 grid bg-neutral-50 px-6 py-2 sm:grid-cols-3 sm:px-0 sm:py-7 lg:mt-12 lg:py-8"
        >
          {study.facts.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-5 border-b border-neutral-200 py-4 last:border-0 sm:block sm:border-r sm:border-b-0 sm:px-6 sm:py-0 lg:px-8"
            >
              <dt className="shrink-0 text-sm font-medium text-neutral-600">{label}</dt>
              <dd className="text-right text-base leading-relaxed font-semibold tracking-[-0.02em] sm:mt-3 sm:text-left lg:text-lg">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <figure className={`mt-10 lg:mt-12 ${subpagePad}`}>
        <Image
          {...study.cover}
          alt={study.cover.alt}
          preload
          sizes="(min-width: 1088px) 1008px, 100vw"
          className="h-auto w-full"
        />
      </figure>

      <section aria-labelledby="project-background" className={`mt-16 lg:mt-24 ${subpagePad}`}>
        <h2 id="project-background" className={`${sectionTitle} max-w-3xl text-balance`}>
          {study.background.title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700 lg:mt-8 lg:text-lg">
          {study.background.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {study.features.length > 0 && (
        <div
          id="project-features"
          className={`mt-20 space-y-20 lg:mt-28 lg:space-y-28 ${subpagePad}`}
        >
          {study.features.map((feature, index) => (
            <section key={feature.title} aria-labelledby={`project-feature-${index}`}>
              <h2
                id={`project-feature-${index}`}
                className={`${sectionTitle} max-w-3xl text-balance`}
              >
                {feature.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-700 lg:mt-8 lg:text-lg">
                {feature.description}
              </p>
              <PortfolioCaseStudyFigure feature={feature} note={study.imageNote} />
            </section>
          ))}
        </div>
      )}

      {study.features.length > 0 && (
        <section aria-labelledby="project-highlights" className={`mt-20 lg:mt-28 ${subpagePad}`}>
          <h2 id="project-highlights" className={sectionTitle}>
            핵심 구현
          </h2>
          <div className="mt-8 lg:mt-12 [&_table]:min-w-0 [&_table]:table-fixed">
            <SheetTable
              caption="프로젝트 핵심 구현"
              columns={["영역", "구현 내용"]}
              widths={["w-24 sm:w-40"]}
              rows={study.features.map((feature) => [
                feature.caption,
                <ul key={feature.title} className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>,
              ])}
            />
          </div>
        </section>
      )}

      <section aria-labelledby="project-scope" className={`mt-20 lg:mt-28 ${subpagePad}`}>
        <h2 id="project-scope" className={sectionTitle}>
          {study.scopeTitle ?? "사피어가 맡은 범위"}
        </h2>
        <div className="mt-8 lg:mt-12 [&_table]:min-w-0 [&_table]:table-fixed">
          <SheetTable
            caption={study.scopeTitle ?? "사피어 수행 범위"}
            columns={["항목", "내용"]}
            widths={["w-24 sm:w-40"]}
            rows={study.scope.map(({ item: name, detail }) => [name, detail])}
          />
        </div>
      </section>

      <section aria-labelledby="project-inquiry" className={`mt-20 lg:mt-28 ${subpagePad}`}>
        <div className="border-y border-black py-10 lg:py-14">
          <h2
            id="project-inquiry"
            className="max-w-xl text-[2.25rem] leading-[1.2] font-extrabold tracking-[-0.04em] text-balance lg:text-[3.5rem]"
          >
            {study.closing.title}
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.6] text-neutral-700 lg:text-lg">
            {study.closing.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link href={routes.development.estimate} className={darkButton}>
              <ButtonLabel>{study.closing.label}</ButtonLabel>
            </Link>
            {item.relatedSolution && item.relatedName && (
              <Link href={item.relatedSolution} className={`text-sm ${underlineLink}`}>
                {item.relatedName} 살펴보기
              </Link>
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="project-related"
        className={`mt-16 pb-24 lg:mt-24 lg:pb-36 ${subpagePad}`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-5">
          <h2 id="project-related" className={sectionTitle}>
            함께 볼 프로젝트
          </h2>
          <Link href={routes.portfolio} className={`text-sm ${underlineLink}`}>
            전체 포트폴리오
          </Link>
        </div>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {related.map((project) => {
            const cover = getPortfolioCoverImage(project);
            return (
              <li key={project.slug}>
                <Link
                  href={routes.portfolioDetail(project.slug)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  {cover && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      <Image
                        src={cover}
                        alt=""
                        fill
                        sizes="(min-width: 1088px) 488px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <h3 className="mt-4 text-lg/tight font-semibold tracking-[-0.02em] md:text-xl/tight">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="mt-2 text-[0.9375rem] leading-[1.55] text-neutral-700">
                      {project.summary}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
