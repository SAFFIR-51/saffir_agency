"use client";

import { useEffect, useRef } from "react";
import { sectionSub, sectionTitle } from "./section-title";

type Card = { label: string; name: string; text: string };

/**
 * 고정 가로 스크롤 (ANCORS 품질 관문 참고).
 * 데스크톱에서는 섹션이 헤더 아래에 멈춘 채 세로 스크롤만큼 카드 줄이 왼쪽으로 지나간다.
 * 모바일·움직임 줄이기 설정에서는 손으로 옆으로 넘겨 본다.
 */
export function HospitalGate({
  id,
  title,
  description,
  cards,
}: {
  id: string;
  title: string;
  description: readonly string[];
  cards: readonly Card[];
}) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sec = section.current;
    const view = viewport.current;
    const row = track.current;
    if (!sec || !view || !row) return;
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );

    let distance = 0;
    const measure = () => {
      if (!desktop.matches) {
        sec.style.height = "";
        row.style.transform = "";
        return;
      }
      distance = Math.max(0, row.scrollWidth - view.clientWidth);
      sec.style.height = `${window.innerHeight + distance}px`;
      update();
    };
    const update = () => {
      if (!desktop.matches) return;
      const top = sec.getBoundingClientRect().top - 80;
      const range = sec.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(Math.max(-top / range, 0), 1) : 0;
      row.style.transform = `translateX(${-progress * distance}px)`;
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={section} aria-labelledby={id} className="relative mt-28 lg:mt-40">
      <div className="flex flex-col justify-center lg:sticky lg:top-20 lg:h-[calc(100svh-80px)] lg:overflow-hidden">
        <div className="px-5 lg:px-10">
          <h2 id={id} className={sectionTitle}>
            {title}
          </h2>
          <p className={sectionSub}>
            {description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div
          ref={viewport}
          className="mt-10 overflow-x-auto px-5 lg:mt-14 lg:overflow-visible lg:px-10"
        >
          <ol ref={track} className="flex w-max gap-2 will-change-transform">
            {cards.map((card, i) => (
              <li
                key={card.name}
                className="flex aspect-[649/413] w-[78vw] flex-col bg-[#f5f5f5] p-6 sm:w-[60vw] lg:w-[45vw] lg:p-10"
              >
                <p className="flex items-baseline justify-between text-sm font-semibold tracking-[0.04em]">
                  <span>GATE {i + 1}</span>
                  <span className="text-neutral-400">{card.label}</span>
                </p>
                <h3 className="mt-auto text-[1.75rem] leading-[1.15] font-bold tracking-[-0.03em] lg:text-[2.5rem]">
                  {card.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.5] text-neutral-600 lg:mt-4">
                  {card.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
