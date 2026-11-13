"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { GlassArt, type GlassTone } from "@/shared/ui";

export type SolutionPanel = {
  key: string;
  en: string;
  name: string;
  href: Route;
  tone: GlassTone;
  points: { title: string; text: string }[];
};

/**
 * 주요 솔루션: 가로로 펼쳐지는 패널 (NHN Cloud 메인과 같은 움직임).
 * 하나가 넓게 열리고 나머지는 세로 글자의 좁은 패널. 마우스를 올리거나 누르면 열린다.
 * 좁은 화면에서는 모두 펼친 카드로 세로로 쌓인다.
 */
export function Solutions({ panels }: { panels: SolutionPanel[] }) {
  const [active, setActive] = useState(0);
  return (
    <ul className="nc-sol">
      {panels.map((p, i) => (
        <li
          key={p.key}
          className="nc-sol-panel"
          data-active={i === active ? "" : undefined}
          onMouseEnter={() => setActive(i)}
        >
          <GlassArt id={`sol-${p.key}`} tone={p.tone} className="nc-sol-art" />
          <button
            type="button"
            className="nc-sol-tab"
            aria-expanded={i === active}
            aria-controls={`sol-${p.key}-body`}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span>{p.en}</span>
          </button>
          <div id={`sol-${p.key}-body`} className="nc-sol-body">
            <div className="nc-sol-head">
              <p className="nc-sol-en" lang="en">
                {p.en}
              </p>
              <h3>{p.name}</h3>
              <Link href={p.href} className="nc-sol-more" aria-label={`${p.name} 자세히 보기`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 12h17M14 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>
            <ul className="nc-sol-points">
              {p.points.map((pt) => (
                <li key={pt.title}>
                  <strong>{pt.title}</strong>
                  <span>{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
