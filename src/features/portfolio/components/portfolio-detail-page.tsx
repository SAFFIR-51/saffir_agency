import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "@/shared/config";
import { ArrowIcon, ImageSlot, LandingSection, PageHead } from "@/shared/ui";
import { findPortfolio, listPortfolioByGroup } from "../api/queries";
import { portfolioContent as c } from "../model/content";
import { PortfolioGrid } from "./portfolio-grid";
import "./portfolio.css";

/** 포트폴리오 상세: 머리 → 대표 이미지 → 프로젝트 내용 → 도입·견적 → 같은 분야 */
export function PortfolioDetailPage({ slug }: { slug: string }) {
  const item = findPortfolio(slug);
  if (!item) notFound();
  const d = c.detail;
  const same =
    listPortfolioByGroup()
      .find((g) => g.group === item.group)
      ?.items.filter((other) => other.slug !== item.slug)
      .slice(0, 4) ?? [];

  return (
    <div className="lc pf">
      <PageHead eyebrow={item.groupName} title={item.title} lead={item.techNames.join(" · ")}>
        <div className="pf-actions pf-head-actions">
          {item.relatedSolution && item.relatedName ? (
            <Link href={item.relatedSolution} className="ls-btn">
              {item.relatedName} 도입하기
              <ArrowIcon />
            </Link>
          ) : null}
          <Link href={routes.development.estimate} className="ls-btn" data-variant="line">
            {d.similar}
            <ArrowIcon />
          </Link>
        </div>
      </PageHead>

      <section className="ls-sec pf-detail" aria-label="프로젝트 내용">
        <div className="ls-inner">
          <div className="pf-cover">
            <ImageSlot label={`${item.title} 대표 이미지`} />
          </div>
          <dl className="pf-dl">
            {d.rows.map((row) => (
              <div key={row}>
                <dt>{row}</dt>
                <dd>{d.pending}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {same.length > 0 ? (
        <LandingSection
          size="compact"
          id="pf-more"
          title={d.more}
          subtitle={d.moreSub}
          action={
            <Link href={routes.portfolio} className="ls-btn">
              {d.list}
              <ArrowIcon />
            </Link>
          }
        >
          <PortfolioGrid
            items={same.map((s) => ({
              slug: s.slug,
              title: s.title,
              group: s.group,
              techNames: s.techNames,
            }))}
            groups={[]}
          />
        </LandingSection>
      ) : null}
    </div>
  );
}
