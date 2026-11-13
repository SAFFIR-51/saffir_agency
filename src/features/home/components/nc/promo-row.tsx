"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ncContent as c } from "../../model/nc-content";
import { GlassArt, IconArt, type GlassTone } from "@/shared/ui";

/** 바로가기 아이콘 (단순 선 그림) */
function QuickIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="13" cy="13" r="7" />
        <path d="M18 18l6 6" />
      </>
    ),
    price: (
      <>
        <rect x="5" y="7" width="20" height="16" rx="3" />
        <path d="M5 12h20M10 18h4" />
      </>
    ),
    doc: (
      <>
        <path d="M9 4h9l6 6v15H9z" />
        <path d="M18 4v6h6M13 16h7M13 20h7" />
      </>
    ),
    chat: (
      <>
        <path d="M5 7h20v13H13l-6 5v-5H5z" />
        <path d="M10 13h10" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 30 30"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

/**
 * 첫 화면 아래 한 줄: 넘기는 큰 카드(자동 넘김) · 포트폴리오 카드 · 바로가기 4개
 */
export function PromoRow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = c.promos.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  return (
    <section id="nc-promos" aria-label="바로 보기" className="nc-promos">
      <div
        className="nc-promo-main"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {c.promos.map((p, i) => (
          <article
            key={p.key}
            className="nc-promo-slide"
            aria-hidden={i !== index}
            data-active={i === index ? "" : undefined}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            <GlassArt id={`promo-${p.key}`} tone={p.tone as GlassTone} className="nc-promo-art" />
            <div className="nc-promo-copy">
              <p className="nc-promo-title">
                {p.title[0]}
                <br />
                {p.title[1]}
              </p>
              <p className="nc-promo-text">
                {p.text[0]}
                <br />
                {p.text[1]}
              </p>
              <Link href={p.cta.href} className="nc-line-btn" tabIndex={i === index ? 0 : -1}>
                {p.cta.label}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
        <div className="nc-promo-nav">
          <button
            type="button"
            aria-label="이전"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
          >
            ‹
          </button>
          <span aria-live="polite">
            {index + 1} / {count}
          </span>
          <button type="button" aria-label="다음" onClick={() => setIndex((i) => (i + 1) % count)}>
            ›
          </button>
        </div>
      </div>

      <Link href={c.news.href} className="nc-news">
        <p className="nc-news-title">{c.news.title}</p>
        <p className="nc-news-text">
          {c.news.text[0]}
          <br />
          {c.news.text[1]}
        </p>
        {/* 화면 여러 장 그림 (포트폴리오) */}
        <IconArt kind="screens" id="news-screens" className="nc-news-art" />
      </Link>

      <ul className="nc-quick">
        {c.quick.map((q) => (
          <li key={q.label}>
            <Link href={q.href}>
              <span className="nc-quick-icon">
                <QuickIcon name={q.icon} />
              </span>
              {q.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
