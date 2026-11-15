"use client";

import { useState } from "react";
import { cn } from "@/shared/lib";

/** 포트폴리오 분야와 같은 글자 단추: 18/600, 고른 것은 아래 검은 선 위에 굵은 막대 */
const tab =
  "relative shrink-0 pt-1 pb-3 text-base font-semibold tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black sm:text-lg motion-safe:transition-colors";

/**
 * 요금 묶음 거르기: "전체"(기본)는 모든 요금표를 보여 준다(심사 때 한 화면에서 모두 확인).
 * 묶음을 고르면 그 묶음만 보인다. 아래 요금표는 서버에서 그린 그대로 두고 숨김만 바꾼다.
 */
export function PricingFilter({
  groups,
  children,
}: {
  groups: readonly { id: string; name: string }[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const hide = groups
    .map(
      (g) =>
        `#pricing-groups[data-active="${g.id}"] > [data-group]:not([data-group="${g.id}"]){display:none}`,
    )
    .join("");
  return (
    <>
      <style>{hide}</style>
      <div
        role="group"
        aria-label="요금 묶음"
        className="-mx-5 flex [scrollbar-width:none] gap-x-6 overflow-x-auto border-b border-black px-5 sm:mx-0 sm:px-0 lg:flex-wrap lg:gap-x-7 [&::-webkit-scrollbar]:hidden"
      >
        {[{ id: null, name: "전체" }, ...groups].map((g) => {
          const on = active === g.id;
          return (
            <button
              key={g.name}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(g.id)}
              className={cn(
                tab,
                on
                  ? "text-black after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-black"
                  : "text-neutral-400 hover:text-black",
              )}
            >
              {g.name}
            </button>
          );
        })}
      </div>
      <div id="pricing-groups" data-active={active ?? undefined}>
        {children}
      </div>
    </>
  );
}
