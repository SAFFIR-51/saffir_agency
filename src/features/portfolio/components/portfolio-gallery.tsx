"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PortfolioCardType } from "@/content/portfolio";
import { cn } from "@/shared/lib";

type Item = {
  slug: string;
  href: Route;
  title: string;
  group: string;
  cardType?: PortfolioCardType;
  summary?: string;
  image?: string;
};

/** 분야 글자 단추: 18/600, 고른 것은 아래 검은 선 위에 굵은 막대 */
const tab =
  "relative py-1 text-lg font-semibold tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-colors";

/**
 * 사례 목록: 위 분야 단추(건수)로 거르고, 아래 카드 3열.
 * 카드: 대표 이미지(4:3) 위에 프로젝트 이름과 유형, 이미지 아래에 한 줄 소개.
 */
export function PortfolioGallery({
  items,
  groups,
}: {
  items: Item[];
  groups: { key: string; name: string; count: number }[];
}) {
  const [group, setGroup] = useState<string | null>(null);
  const shown = items.filter((item) => !group || item.group === group);

  return (
    <div>
      {/* 분야: 검은 선 위에 글자로. 고른 것은 검정 + 밑줄, 나머지는 회색 */}
      <div role="group" aria-label="분야" className="flex flex-wrap gap-x-7 gap-y-2 pb-2">
        {[{ key: null, name: "전체", count: items.length }, ...groups].map((g) => {
          const on = group === g.key;
          return (
            <button
              key={g.name}
              type="button"
              aria-pressed={on}
              onClick={() => setGroup(g.key)}
              className={cn(
                tab,
                on
                  ? "text-black after:absolute after:inset-x-0 after:-bottom-[10px] after:h-[3px] after:bg-black"
                  : "text-neutral-400 hover:text-black",
              )}
            >
              {g.name}
              <span className="ml-1.5 tabular-nums">{g.count}</span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-black" />

      <p aria-live="polite" className="mt-8 text-sm text-neutral-500">
        {shown.length}건
      </p>
      <ul className="mt-4 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.slug} className="group relative">
            <Link
              href={item.href}
              className="block after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f3f3]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-linear-to-t from-black/85 via-black/60 to-transparent px-4 pt-9 pb-4 text-lg/tight font-semibold text-white md:px-5 md:text-xl/tight">
                  <h3 className="break-keep">{item.title}</h3>
                  {item.cardType && (
                    <span className="shrink-0 tracking-wider whitespace-nowrap">
                      {item.cardType}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            {item.summary && (
              <p className="mt-2 text-[0.9375rem] leading-[1.55] text-neutral-700">
                {item.summary}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
