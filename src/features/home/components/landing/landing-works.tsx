import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { routes } from "@/shared/config";
import { ArrowIcon, ImageSlot, LandingSection } from "@/shared/ui";
import { homeContent as c } from "../../model/content";
import { landingWorks } from "../../model/landing-content";

/** 대표 포트폴리오 8장. 4열 2줄, 마우스를 올리면 살짝 떠오른다 */
export function LandingWorks() {
  const works = landingWorks.flatMap((work) => {
    const item = portfolioItems.find((p) => p.slug === work.slug);
    return item ? [{ ...work, title: item.title }] : [];
  });

  return (
    <LandingSection
      id="home-works"
      title={c.cases.title}
      subtitle={c.cases.subtitle}
      action={
        <Link href={routes.portfolio} className="ls-btn">
          {c.cases.all}
          <ArrowIcon />
        </Link>
      }
    >
      <ul className="lp-works">
        {works.map((work, i) => (
          <li key={work.slug}>
            <Link href={routes.portfolioDetail(work.slug)}>
              <ImageSlot label={work.slot} tone={i % 2} />
              <div className="lp-works-info">
                <strong lang="en">{work.label}</strong>
                <p>{work.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
