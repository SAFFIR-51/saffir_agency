import { site } from "@/shared/config";
import { landing } from "../../model/landing-content";
import { Wrap } from "./parts";

const c = landing.hero;

/**
 * 첫 화면: 단색 배경(영상 자리) 위 큰 워드마크, 세로 문구, 왼쪽 아래 소개, 아래 스크롤 표시.
 * 높이는 최소값만 정하고 내용이 길면 늘어난다 (글이 잘리지 않게).
 */
export function LandingHero() {
  return (
    <section
      className="relative min-h-[max(100svh,640px)] overflow-hidden text-white lg:min-h-[clamp(800px,100vw,1206px)]"
      style={{ background: c.color }}
    >
      <h1 className="sr-only">
        {site.legalName}. {site.tagline}
      </h1>
      <span
        aria-hidden
        className="absolute top-5 left-5 text-[12px] font-medium text-white/80 lg:left-9"
      >
        [ 영상 · {c.image} ]
      </span>
      <Wrap className="relative flex flex-col pt-[clamp(120px,24vw,360px)] pb-[clamp(96px,10vw,180px)] sm:pr-[clamp(64px,7vw,120px)]">
        <p aria-hidden className="landing-parallax flex items-start whitespace-nowrap">
          <span className="lt-hero-sub mt-[0.08em] mr-[0.35em]">{c.small}</span>
          <span className="lt-hero-title">{c.word}</span>
        </p>
        <div className="mt-[clamp(48px,8vw,140px)] w-full max-w-[calc(var(--lr)*24)] min-w-[260px] border-t-4 border-white pt-[calc(var(--lr)*1.2)]">
          <p className="lt-hero-meta-title">
            {c.metaTitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="lt-hero-meta-text mt-[calc(var(--lr)*1.2)]">{c.metaText}</p>
        </div>
      </Wrap>
      <p
        aria-hidden
        className="lt-hero-side absolute top-1/2 right-[clamp(16px,3vw,48px)] hidden -translate-y-1/2 rotate-180 whitespace-nowrap [writing-mode:vertical-rl] sm:block"
      >
        {c.side}
      </p>
      <span
        aria-hidden
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[12px] font-medium tracking-[0.2em] uppercase"
      >
        Scroll
        <span className="landing-scroll-line block h-12 w-px bg-white/30" />
      </span>
    </section>
  );
}
