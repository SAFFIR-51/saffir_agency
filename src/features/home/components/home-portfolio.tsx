"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { homeContent } from "../model/content";
import { pretendard } from "../model/pretendard";

const arrowClass =
  "absolute top-1/2 z-10 grid size-[3.125rem] -translate-y-1/2 cursor-pointer place-items-center bg-background/50 text-2xl hover:bg-background focus-visible:outline-2 motion-safe:transition-opacity motion-safe:duration-300 [@media(hover:hover)_and_(pointer:fine)]:pointer-events-none [@media(hover:hover)_and_(pointer:fine)]:opacity-0 group-hover/portfolio:pointer-events-auto group-hover/portfolio:opacity-100 group-focus-within/portfolio:pointer-events-auto group-focus-within/portfolio:opacity-100";

export function HomePortfolio({
  projects,
}: {
  projects: { slug: string; title: string; tag: string }[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const section = useRef<HTMLElement>(null);
  const { title, all, detail } = homeContent.cases;

  function step(direction: -1 | 1) {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;

    const max = list.scrollWidth - list.clientWidth;
    if (direction > 0 && list.scrollLeft >= max - 1) {
      list.scrollTo({ left: 0 });
    } else if (direction < 0 && list.scrollLeft <= 1) {
      list.scrollTo({ left: max });
    } else {
      list.scrollBy({ left: direction * card.getBoundingClientRect().width });
    }
  }

  useEffect(() => {
    if (projects.length < 2) return;

    const pointerCanHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const region = section.current;
      if (!region || document.hidden || reducedMotion.matches) return;
      if (
        region.contains(document.activeElement) ||
        (pointerCanHover.matches && region.matches(":hover"))
      )
        return;

      const bounds = region.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) step(1);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [projects.length]);
  return (
    <section
      ref={section}
      aria-labelledby="home-portfolio-title"
      className={cn(pretendard.className, "group/portfolio mb-60 border-b border-foreground/25")}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 border-b border-foreground/25 px-5 py-4 md:px-11 md:pt-0 md:pb-4">
        <h2
          id="home-portfolio-title"
          lang="en"
          className="scroll-mt-[calc(var(--site-header-height)+1rem)] text-3xl leading-none font-bold tracking-[-0.04rem] text-home-hero-title md:text-[2.5625rem]"
        >
          {title}
        </h2>
        <Link
          href={routes.portfolio}
          aria-label="포트폴리오 전체 보기"
          className="inline-flex min-h-11 items-center text-base leading-[1.4] font-medium tracking-[-0.04rem] text-home-hero-copy underline-offset-4 hover:underline md:min-h-[2.125rem]"
        >
          <span lang="en">{all}</span>
        </Link>
      </div>

      <div className="md:grid md:grid-cols-[clamp(15.5rem,24.7%,32.125rem)_1fr]">
        <div aria-hidden="true" className="hidden border-r border-foreground/25 md:block" />
        <div className="relative min-w-0">
          <ul
            ref={track}
            aria-label="대표 프로젝트"
            className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain motion-safe:scroll-smooth"
          >
            {projects.map((project) => (
              <li
                key={project.slug}
                className="w-[76%] shrink-0 snap-start border-r border-foreground/20 p-5 md:w-[min(35.5%,24rem)] md:pb-16 2xl:w-[min(24.5%,31.25rem)] 2xl:px-[clamp(1.25rem,1.06vw,1.6875rem)]"
              >
                <Link
                  href={routes.portfolioDetail(project.slug)}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div
                    aria-hidden="true"
                    className="aspect-[15/26] max-h-[43.3125rem] bg-foreground/5"
                  />
                  <h3 className="mt-9 text-2xl leading-[1.2] font-bold tracking-[-0.0625rem] text-home-hero-title">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-base leading-[1.2] font-medium tracking-[-0.04rem] text-home-hero-title">
                    {project.tag}
                  </p>
                  <span
                    lang="en"
                    className="mt-auto inline-flex items-center pt-12 text-base leading-[1.4] font-medium tracking-[-0.04rem] text-home-hero-copy group-hover:underline md:pt-[5.625rem]"
                  >
                    {detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="이전 프로젝트"
            disabled={projects.length < 2}
            onClick={() => step(-1)}
            className={`${arrowClass} left-2 md:left-5`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="다음 프로젝트"
            disabled={projects.length < 2}
            onClick={() => step(1)}
            className={`${arrowClass} right-2 md:right-5`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
