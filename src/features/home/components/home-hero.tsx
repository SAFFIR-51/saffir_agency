import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { homeContent } from "../model/content";
import { pretendard } from "../model/pretendard";

const roboto = Roboto({ subsets: ["latin"], weight: "700", display: "swap" });

export function HomeHero() {
  const { title, description, learnMore } = homeContent.hero;

  return (
    <section
      aria-labelledby="home-hero-title"
      className="mb-16 grid min-h-[calc(100svh-var(--site-header-height))] grid-rows-[auto_1fr] pt-[clamp(1rem,4svh,3rem)] md:mb-[clamp(5rem,11.42vw,9.125rem)] md:grid-cols-[clamp(15.5rem,24.7%,32.125rem)_1fr] md:grid-rows-none md:pt-[clamp(1.5rem,calc(26svh-var(--site-header-height)),18rem)]"
    >
      <div
        className={cn(
          pretendard.className,
          "@container min-w-0 px-5 pb-5 md:py-[clamp(0.5rem,1.5svh,1.25rem)] md:pr-3 md:pl-[clamp(1.5rem,3.13vw,3.5rem)]",
        )}
      >
        <h1
          id="home-hero-title"
          lang="en"
          className={cn(
            roboto.className,
            "text-[min(3.75rem,36cqw,8svh)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-home-hero-title md:text-[min(36cqw,7.83vw,11.2svh,9rem)] md:leading-none md:tracking-[-0.02em]",
          )}
        >
          {title.map((line, index) => (
            <span key={line} className="block">
              {index > 0 ? " " : null}
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-[clamp(0.75rem,2.7svh,1.625rem)] grid gap-[0.23em] text-base leading-[1.175] font-normal tracking-[-0.04rem] text-home-hero-copy md:gap-[0.2575em] md:text-[clamp(1rem,min(1.875vw,2.55svh),2rem)] md:tracking-[-0.04em]">
          {description.map((line, index) => (
            <span key={line} className="block">
              {index > 0 ? " " : null}
              {line}
            </span>
          ))}
        </p>

        <Link
          href={routes.about}
          className="mt-[clamp(0.375rem,2svh,2rem)] inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline md:text-lg"
        >
          <span lang="en">{learnMore}</span>
        </Link>
      </div>

      <div className="relative min-h-32 min-w-0 bg-foreground">
        <Image
          src="/images/home/architectural-hero.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 2080px) calc(100vw - 514px), (min-width: 768px) 76vw, 100vw"
          className="object-cover"
        />
        <a
          href="#home-portfolio-title"
          aria-label="포트폴리오로 스크롤"
          className="absolute right-[clamp(0.75rem,2.7vw,4rem)] bottom-[18%] flex min-w-11 flex-col items-center gap-2 py-2 text-sm font-medium text-white underline-offset-4 [text-shadow:0_1px_4px_black] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:bottom-[24%] md:gap-4 md:text-base"
        >
          <span aria-hidden="true" className="h-5 w-px bg-white/75 md:h-10" />
          <span lang="en" className="[writing-mode:vertical-rl]">
            Scroll
          </span>
        </a>
      </div>
    </section>
  );
}
