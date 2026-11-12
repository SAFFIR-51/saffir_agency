import Link from "next/link";
import { landing } from "../../model/landing-content";
import { Cate, ColorSlot, MainTitle, Wrap } from "./parts";

const c = landing.service;

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      className="size-[0.85em] shrink-0 transition-transform duration-300 group-open:rotate-180"
    >
      <path d="M5 11l11 11 11-11" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** 서비스: 큰 제목, 왼쪽 고정 이미지·글, 오른쪽 번호 붙은 목록(하나씩 열림) */
export function LandingService() {
  return (
    <section className="pt-[clamp(100px,12vw,200px)]">
      <Wrap>
        <Cate>{c.label}</Cate>
        <MainTitle className="mt-1">{c.title}</MainTitle>
        <div className="mt-[clamp(40px,8vw,120px)] grid border-y-2 border-black lg:grid-cols-2">
          <div className="py-6 lg:py-0 lg:pr-8">
            <div className="lg:sticky lg:top-[90px] lg:py-1">
              <ColorSlot
                color={c.color}
                label={c.image}
                className="aspect-square w-1/2 max-w-[330px] lg:w-[44%]"
              />
              <p className="lt-side-text mt-3 max-w-[calc(var(--lr)*22)]">{c.text}</p>
            </div>
          </div>
          <ul className="border-t-2 border-black lg:border-t-0 lg:border-l-2">
            {c.items.map((item, index) => (
              <li key={item.title} className={index > 0 ? "border-t-2 border-black" : undefined}>
                <details name="landing-service" className="landing-acc group" open={index === 0}>
                  <summary className="lt-acc-title flex cursor-pointer list-none items-center justify-between gap-4 py-[clamp(20px,2.7vw,44px)] pr-1 pl-[clamp(12px,1.4vw,22px)] transition-colors hover:bg-black/[0.03] hover:text-(--landing-signal) [&::-webkit-details-marker]:hidden">
                    <span className="flex items-baseline gap-[0.6em]">
                      <span className="lt-body font-semibold text-black/40 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </span>
                    <Chevron />
                  </summary>
                  <div className="lt-acc-text space-y-5 pr-4 pb-[clamp(20px,2.7vw,44px)] pl-[clamp(12px,1.4vw,22px)]">
                    <p>{item.description}</p>
                    {item.links.length > 0 ? (
                      <ul className="divide-y divide-black/10 border-y border-black/10">
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group/link flex items-center justify-between gap-4 py-2.5"
                            >
                              <span className="flex flex-wrap gap-x-3">
                                <span className="font-bold group-hover/link:text-(--landing-signal)">
                                  {link.label}
                                </span>
                                <span className="text-black/55">{link.note}</span>
                              </span>
                              <span
                                aria-hidden
                                className="transition-transform group-hover/link:translate-x-1"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.tags ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="lt-chip rounded-full border-2 border-black px-[0.8em] py-[0.4em]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Link
                      href={item.cta.href}
                      className="lt-nav-cta inline-flex items-center gap-2 bg-black px-[1.1em] py-[0.8em] text-white transition-colors hover:bg-(--landing-signal)"
                    >
                      {item.cta.label} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}
