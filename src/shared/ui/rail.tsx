"use client";

import { useRef } from "react";
import "./rail.css";

/** 옆으로 넘기는 카드 줄 + 아래 오른쪽 이전·다음 버튼 (애플 "더 알아보기" 줄) */
export function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  function move(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 360;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div>
      <ul ref={ref} className="rail" aria-label={label}>
        {children}
      </ul>
      <div className="rail-nav">
        <button type="button" onClick={() => move(-1)} aria-label="이전 카드">
          <svg viewBox="0 0 9 16" aria-hidden="true">
            <path d="M8 1L1 8l7 7" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button type="button" onClick={() => move(1)} aria-label="다음 카드">
          <svg viewBox="0 0 9 16" aria-hidden="true">
            <path d="M1 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
