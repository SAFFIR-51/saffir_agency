"use client";

import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BrowserGroup = {
  group: string;
  name: string;
  items: {
    slug: string;
    href: Route;
    title: string;
    /** 대표 기술 (카드 아이콘) */
    tech: string;
    techNames: string;
    related?: string;
  }[];
};

/** 기술별 작은 선 아이콘 (NHN Cloud 서비스 카드처럼 단색) */
function TechIcon({ tech }: { tech: string }) {
  const paths: Record<string, React.ReactNode> = {
    web: (
      <>
        <rect x="3" y="5" width="22" height="18" rx="3" />
        <path d="M3 10h22M7 7.5h.01M10 7.5h.01" />
      </>
    ),
    app: (
      <>
        <rect x="8" y="3" width="12" height="22" rx="3" />
        <path d="M12.5 21h3" />
      </>
    ),
    ai: (
      <>
        <rect x="6" y="7" width="16" height="14" rx="4" />
        <path d="M11 13h.01M17 13h.01M14 3v4M10 17h8" />
      </>
    ),
    iot: (
      <>
        <circle cx="14" cy="16" r="3" />
        <path d="M8.5 10.5a8 8 0 0 1 11 0M5 7a13 13 0 0 1 18 0" />
      </>
    ),
    erp: (
      <>
        <rect x="4" y="4" width="8" height="8" rx="2" />
        <rect x="16" y="4" width="8" height="8" rx="2" />
        <rect x="4" y="16" width="8" height="8" rx="2" />
        <rect x="16" y="16" width="8" height="8" rx="2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="nc-browser-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[tech] ?? paths.web}
    </svg>
  );
}

/**
 * 포트폴리오 목록 (NHN Cloud 서비스 목록 구성)
 * 왼쪽: 검색 + 분야 체크 / 오른쪽: "총 N개" + 분야별 카드 2열
 */
export function PortfolioBrowser({ groups }: { groups: BrowserGroup[] }) {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const shown = useMemo(() => {
    const q = query.trim();
    return groups
      .filter((g) => checked.length === 0 || checked.includes(g.group))
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => !q || i.title.includes(q) || i.techNames.includes(q) || i.related?.includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query, checked]);

  const total = shown.reduce((n, g) => n + g.items.length, 0);
  const toggle = (g: string) =>
    setChecked((list) => (list.includes(g) ? list.filter((x) => x !== g) : [...list, g]));

  return (
    <div className="nc-browser">
      <aside className="nc-browser-side">
        <label className="nc-search">
          <span className="sr-only">프로젝트 검색</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요."
          />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </label>
        <div className="nc-filter-head">
          <p>분야</p>
          <button type="button" onClick={() => setChecked([])}>
            초기화 ↻
          </button>
        </div>
        <ul className="nc-filter">
          {groups.map((g) => (
            <li key={g.group}>
              <label>
                <input
                  type="checkbox"
                  checked={checked.includes(g.group)}
                  onChange={() => toggle(g.group)}
                />
                {g.name}
                <span>{g.items.length}</span>
              </label>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <p className="nc-browser-total" aria-live="polite">
          총 <b>{total}</b>개의 프로젝트가 있습니다.
        </p>
        {shown.map((g) => (
          <section key={g.group} aria-labelledby={`pf-${g.group}`} className="nc-browser-group">
            <h2 id={`pf-${g.group}`}>
              {g.name} ({g.items.length})
            </h2>
            <ul className="nc-browser-cards">
              {g.items.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="nc-card nc-browser-card">
                    <TechIcon tech={item.tech} />
                    <p className="nc-card-title">{item.title}</p>
                    <p className="nc-card-text">{item.techNames}</p>
                    {item.related ? <p className="nc-browser-related">{item.related}</p> : null}
                    <svg className="nc-card-arrow" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M3 12h17M14 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {total === 0 ? <p className="nc-browser-empty">찾는 프로젝트가 없습니다.</p> : null}
      </div>
    </div>
  );
}
