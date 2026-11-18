import Image from "next/image";
import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { homeContent } from "../model/content";

/**
 * 포트폴리오 카드가 끊김 없이 왼쪽으로 흐르고, 마우스를 올리면 멈춘다.
 * 같은 줄을 두 번 이어 붙이고 정확히 절반(-50%)만큼 움직여 이음매가 보이지 않게 한다.
 * 움직임 줄이기 설정에서는 흐르지 않고 손으로 넘겨 본다.
 */
export function PortfolioMarquee() {
  const row = (copy: number) => (
    <ul aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-2 pr-2">
      {homeContent.portfolioCards.map((card) => (
        <li
          key={card.image}
          className="relative aspect-[4/3] w-[72vw] shrink-0 overflow-hidden bg-[#f0f0f0] md:w-[38vw] lg:w-[28vw]"
        >
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 38vw, 72vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-linear-to-t from-black/85 via-black/60 to-transparent px-4 pt-9 pb-4 text-lg/tight font-semibold text-white md:px-5 md:text-xl/tight">
            <p className="break-keep">{card.title}</p>
            <span className="shrink-0 tracking-wider whitespace-nowrap">{card.type}</span>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div role="region" aria-label="포트폴리오" className="mt-10 lg:mt-14">
      <Link
        href={routes.portfolio}
        aria-label="포트폴리오 목록 보기"
        className="group block overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground motion-reduce:overflow-x-auto"
      >
        <div className="flex w-max group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-safe:animate-[portfolio-marquee_48s_linear_infinite]">
          {row(0)}
          {row(1)}
        </div>
      </Link>
    </div>
  );
}
