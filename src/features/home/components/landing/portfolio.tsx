import Link from "next/link";
import { cn } from "@/shared/lib";
import { landing } from "../../model/landing-content";
import { Cate, ImageLeadText, MainTitle, MoreLink, Wrap } from "./parts";

const c = landing.portfolio;

/**
 * 대표 사례: 큰 제목 + 소개 글, 2열 카드(오른쪽 열은 반 칸 내려감).
 * 올리면 바탕이 살짝 커지고 가운데 VIEW 원, 아래 제목·분야가 나온다.
 */
export function LandingPortfolio() {
  return (
    <section className="pt-[clamp(100px,14vw,240px)]">
      <Wrap>
        <Cate>{c.label}</Cate>
        <MainTitle className="mt-1">{c.title}</MainTitle>
        <div className="mt-[clamp(40px,8vw,130px)]">
          <ImageLeadText width={38} ratio={191 / 398} color={c.color} label={c.image}>
            {c.text}
          </ImageLeadText>
        </div>

        <ul className="mt-[clamp(60px,10vw,120px)] grid gap-x-[30px] gap-y-6 sm:grid-cols-2 lg:gap-y-0">
          {c.items.map((item, index) => (
            <li
              key={item.slug}
              className={cn("landing-fade lg:pt-[30px]", index % 2 === 1 && "lg:translate-y-1/2")}
            >
              <Link
                href={item.href}
                className="group relative block aspect-[512/328] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ background: item.color }}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-4 left-4 max-w-[55%] text-[12px] leading-snug font-medium",
                    item.dark ? "text-white/70" : "text-black/55",
                  )}
                >
                  [ 이미지 · {item.title} 대표 화면 ]
                </span>
                <ul aria-hidden className="absolute top-4 right-4 flex gap-1.5">
                  {item.tech.map((t) => (
                    <li
                      key={t}
                      className={cn(
                        "lt-chip flex h-[2.5em] min-w-[2.5em] items-center justify-center rounded-full border-2 px-[0.6em]",
                        item.dark ? "border-white text-white" : "border-black text-black",
                      )}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 hidden size-24 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-(--landing-signal) text-[13px] font-semibold tracking-[0.1em] text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:flex"
                >
                  VIEW
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/75 to-transparent p-[clamp(16px,2.7vw,30px)] pt-16 text-white transition duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                  <span>
                    <span className="lt-card-title block">{item.title}</span>
                    <span className="lt-card-sub mt-1 block">{item.group}</span>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="lt-chip rounded-full border-2 border-white px-[0.8em] py-[0.4em]"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center lg:mt-[calc(16vw+60px)]">
          <MoreLink href={c.more.href}>{c.more.label}</MoreLink>
        </div>
      </Wrap>
    </section>
  );
}
