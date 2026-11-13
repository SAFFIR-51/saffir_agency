"use client";

import Link from "next/link";
import { useState } from "react";
import { portfolioGroups, type PortfolioGroup } from "@/content/portfolio";
import { routes } from "@/shared/config";
import { ImageSlot } from "@/shared/ui";
import { portfolioContent as c } from "../model/content";

export type GridItem = { slug: string; title: string; group: PortfolioGroup; techNames: string[] };

/** 분야 버튼으로 거르는 카드 목록. 4열, 마우스를 올리면 살짝 떠오른다 */
export function PortfolioGrid({
  items,
  groups,
}: {
  items: GridItem[];
  groups: { group: PortfolioGroup; name: string; count: number }[];
}) {
  const [active, setActive] = useState<PortfolioGroup | "all">("all");
  const shown = active === "all" ? items : items.filter((item) => item.group === active);
  const filters = [{ group: "all" as const, name: c.all, count: items.length }, ...groups];

  return (
    <>
      {/* groups가 비어 있으면 (상세 아래 같은 분야 목록) 분야 버튼을 그리지 않는다 */}
      {groups.length > 0 ? (
        <div className="pf-filters" role="group" aria-label="분야">
          {filters.map((f) => (
            <button
              key={f.group}
              type="button"
              className="pf-filter"
              aria-pressed={active === f.group}
              onClick={() => setActive(f.group)}
            >
              {f.name}
              <span>{f.count}</span>
            </button>
          ))}
        </div>
      ) : null}
      <ul className="pf-grid">
        {shown.map((item, i) => (
          <li key={item.slug}>
            <Link href={routes.portfolioDetail(item.slug)} className="pf-card">
              <div className="pf-card-media">
                <ImageSlot label={`${item.title} 대표 화면`} tone={i % 2} />
              </div>
              <p className="pf-card-group">{portfolioGroups[item.group]}</p>
              <h3 className="pf-card-title">{item.title}</h3>
              <p className="pf-card-tech">{item.techNames.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
