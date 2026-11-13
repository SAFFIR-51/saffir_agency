"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/shared/config";

/** 오른쪽 아래 떠 있는 버튼: 문의 · 요금 · 맨 위로 (NHN Cloud 메인과 같은 자리) */
export function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="nc-float">
      <Link href={routes.contact} aria-label="문의하기" className="nc-float-dark">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v11h-9l-5 4v-4H4z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Link>
      <Link href={routes.pricing} aria-label="요금 안내" className="nc-float-blue">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Link>
      <button
        type="button"
        aria-label="맨 위로"
        className="nc-float-top"
        data-show={show ? "" : undefined}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
