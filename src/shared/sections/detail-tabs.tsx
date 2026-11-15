"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";

/** 세부 페이지 안 메뉴: 헤더 아래 고정, 지금 보고 있는 섹션 아래에 검은 막대 */
export function DetailTabs({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="이 페이지 메뉴"
      className="sticky top-16 z-20 border-b border-black bg-white px-5 lg:top-20 lg:px-10"
    >
      <ul className="flex gap-7 overflow-x-auto">
        {items.map((item) => {
          const on = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "relative block py-4 text-base font-semibold tracking-[-0.02em] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black motion-safe:transition-colors",
                  on
                    ? "text-black after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:bg-black"
                    : "text-neutral-400 hover:text-black",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
