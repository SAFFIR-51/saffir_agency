"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** 사진이 걷히는 시간 / 글자 하나가 올라오는 시간 / 글자 사이 간격 (ms) */
const MEDIA_MS = 1100;
const ITEM_MS = 700;
const ITEM_GAP_MS = 90;
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * 서비스 카드 묶음. 카드 위치는 그대로 두고, 화면에 들어올 때 한 번만 나타난다.
 * - 사진: 아래에서 위로 걷히며 드러나고(clip), 살짝 확대된 상태에서 제자리 크기로
 * - 글자: 사진이 반쯤 드러난 뒤 제목 → 설명 → 목록 → 버튼 순서로 아래에서 올라온다
 * JS가 없거나 움직임 줄이기 설정이면 처음부터 그대로 보인다.
 * 첫 화면에 이미 보이는 카드는 숨기지 않는다 (깜빡임 방지).
 */
export function ServiceCards({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const region = section.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!region || motion.matches || !("IntersectionObserver" in window)) return;

    const cards = [...region.querySelectorAll<HTMLElement>("article")];
    const animations: Animation[] = [];

    const parts = (card: HTMLElement) => ({
      media: card.querySelector<HTMLElement>("[data-reveal-media]"),
      image: card.querySelector<HTMLElement>("[data-reveal-media] img"),
      items: [...card.querySelectorAll<HTMLElement>("[data-reveal-item]")],
    });

    function hide(card: HTMLElement) {
      const { media, items } = parts(card);
      if (media) media.style.clipPath = "inset(100% 0 0 0)";
      items.forEach((item) => (item.style.opacity = "0"));
    }

    function reveal(card: HTMLElement) {
      const { media, image, items } = parts(card);
      if (media) {
        media.style.clipPath = "";
        animations.push(
          media.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], {
            duration: MEDIA_MS,
            easing: EASE,
          }),
        );
      }
      if (image) {
        animations.push(
          image.animate([{ transform: "scale(1.12)" }, { transform: "scale(1)" }], {
            duration: MEDIA_MS + 300,
            easing: EASE,
          }),
        );
      }
      items.forEach((item, i) => {
        item.style.opacity = "";
        animations.push(
          item.animate(
            [
              { opacity: 0, transform: "translateY(1.5rem)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: ITEM_MS,
              delay: MEDIA_MS * 0.4 + i * ITEM_GAP_MS,
              easing: EASE,
              fill: "backwards",
            },
          ),
        );
      });
    }

    // 아직 화면 아래에 있는 카드만 숨겨 둔다
    const waiting = cards.filter((card) => card.getBoundingClientRect().top > window.innerHeight);
    waiting.forEach(hide);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          reveal(target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );
    waiting.forEach((card) => observer.observe(card));

    // 키보드로 숨은 카드 안의 링크에 들어오면 바로 보여준다
    function onFocus(event: FocusEvent) {
      const card = (event.target as HTMLElement).closest("article");
      if (card && waiting.includes(card)) {
        observer.unobserve(card);
        reveal(card);
        waiting.splice(waiting.indexOf(card), 1);
      }
    }
    region.addEventListener("focusin", onFocus);

    return () => {
      observer.disconnect();
      region.removeEventListener("focusin", onFocus);
      animations.forEach((animation) => animation.cancel());
      cards.forEach((card) => {
        const { media, items } = parts(card);
        if (media) media.style.clipPath = "";
        items.forEach((item) => (item.style.opacity = ""));
      });
    };
  }, []);

  return (
    <section ref={section} aria-label="서비스">
      {children}
    </section>
  );
}
