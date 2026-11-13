"use client";

import { useEffect, useState } from "react";

/** 왼쪽 요금 바로 가기. 지금 보고 있는 묶음을 파랗게 표시한다 (NHN Cloud 요금 페이지처럼) */
export function PricingNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    els.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="요금 바로 가기" className="nc-pricing-nav">
      <p>서비스별</p>
      <ul>
        {items.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined}>
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
