import Link from "next/link";
import { routes } from "@/shared/config";
import { ArrowIcon, LandingSection, PageHead } from "@/shared/ui";
import { listPortfolioByGroup } from "../api/queries";
import { portfolioContent as c } from "../model/content";
import { PortfolioGrid } from "./portfolio-grid";
import "./portfolio.css";

/** 포트폴리오 목록: 머리 → 분야 버튼 + 카드 → 견적·상담 */
export function PortfolioListPage() {
  const groups = listPortfolioByGroup();
  const items = groups.flatMap((g) =>
    g.items.map((item) => ({
      slug: item.slug,
      title: item.title,
      group: item.group,
      techNames: item.techNames,
    })),
  );

  return (
    <div className="lc pf">
      <PageHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="ls-sec pf-list" aria-label="프로젝트 목록">
        <div className="ls-inner">
          <PortfolioGrid
            items={items}
            groups={groups.map((g) => ({ group: g.group, name: g.name, count: g.items.length }))}
          />
        </div>
      </section>
      <LandingSection
        size="compact"
        id="pf-next"
        title={c.next.title}
        subtitle={c.next.subtitle}
        ko={c.next.ko}
      >
        <div className="pf-actions">
          <Link href={routes.development.estimate} className="ls-btn">
            {c.next.estimate}
            <ArrowIcon />
          </Link>
          <Link href={routes.contact} className="ls-btn" data-variant="line">
            {c.next.contact}
            <ArrowIcon />
          </Link>
        </div>
      </LandingSection>
    </div>
  );
}
