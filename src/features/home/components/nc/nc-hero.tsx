"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/shared/config";
import { ncContent as c } from "../../model/nc-content";
import { GlassArt } from "@/shared/ui";

/**
 * 첫 화면: 화면 가득 찬 그림 위 가운데 제목·설명·버튼.
 * 스크롤하면 그림이 양옆·위로 줄어들며 둥근 카드가 된다 (NHN Cloud 메인과 같은 움직임).
 */
export function NcHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const s = Math.min(360, Math.max(0, window.scrollY));
      el.style.setProperty("--p", (s / 360).toFixed(3));
      el.style.setProperty("--s", `${s}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby="nc-hero-title" className="nc-hero">
      <div className="nc-hero-frame">
        <GlassArt id="hero" tone="blue" animate className="nc-hero-art" />
        <div className="nc-hero-copy">
          <h1 id="nc-hero-title">
            {c.hero.title[0]}
            <br />
            {c.hero.title[1]}
          </h1>
          <p>{site.description}</p>
          <Link href={c.hero.cta.href} className="nc-line-btn">
            {c.hero.cta.label}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <a href="#nc-promos" className="nc-hero-down" aria-label="아래로">
          <svg viewBox="0 0 24 14" aria-hidden="true">
            <path d="M2 2l10 10L22 2" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
