"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRef } from "react";

export type CaseCard = { slug: string; href: Route; group: string; title: string; text: string };

/** 포트폴리오: 옆으로 넘기는 카드 + 오른쪽 위 이전·다음 (NHN Cloud "고객 사례"와 같은 모양) */
export function Cases({ title, lead, cards }: { title: string; lead: string; cards: CaseCard[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <>
      <div className="nc-w1280 nc-cases-head">
        <div>
          <h2 id="nc-cases" className="nc-h2">
            {title}
          </h2>
          <p className="nc-lead">{lead}</p>
        </div>
        <div className="nc-arrows">
          <button type="button" aria-label="이전 프로젝트" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12H4M10 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button type="button" aria-label="다음 프로젝트" onClick={() => move(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
      <ul ref={ref} className="nc-cases" aria-labelledby="nc-cases">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link href={card.href}>
              <span className="nc-case-logo">
                <small>IMAGE</small>
                {card.title} 대표 화면
              </span>
              <span className="nc-case-body">
                <span className="nc-case-group">{card.group}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className="nc-case-more">
                  자세히 보기
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2 8h11M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
