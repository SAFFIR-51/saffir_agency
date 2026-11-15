import { homeContent } from "../model/content";
import { PortfolioMarquee } from "./portfolio-marquee";

const { manifesto } = homeContent.layout;

const pad = "px-5 lg:px-10";

/** 1. 소개 (v-w.co.kr 첫 소개 참고): 큰 굵은 영문 세 줄 + 한글 한 줄, 아래 영문·한글 두 단 */
export function Manifesto() {
  return (
    <section aria-labelledby="home-manifesto" className={`pt-28 lg:pt-50 ${pad}`}>
      <h2
        id="home-manifesto"
        className="text-[2.5rem] leading-[1.08] font-bold tracking-[-0.04em] md:text-[4rem] lg:text-[5rem]"
      >
        {manifesto.lead.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-6 text-lg leading-[1.5] font-medium tracking-[-0.02em] text-neutral-500 lg:mt-8 lg:text-2xl">
        {manifesto.sub}
      </p>
      <div className="-mx-5 lg:-mx-10">
        <PortfolioMarquee />
      </div>
      <div className="mt-10 grid gap-10 border-t border-black pt-6 md:grid-cols-12 md:gap-x-4 lg:mt-14">
        <div className="flex flex-col text-[0.9375rem] leading-[1.6] text-neutral-700 md:col-span-5 md:col-start-1">
          {manifesto.en.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex flex-col text-[0.9375rem] leading-[1.7] text-neutral-900 md:col-span-5 md:col-start-7">
          {manifesto.ko.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
