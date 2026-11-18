"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/lib";
import { sectionSub, sectionTitle, subpagePad } from "@/shared/sections";
import { Input } from "@/shared/ui";

type PricingGroup = {
  id: string;
  name: string;
  title?: string;
  note?: string;
  search: readonly string[];
  content: ReactNode;
};

const tab =
  "relative shrink-0 pt-1 pb-3 text-base font-semibold tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black sm:text-lg motion-safe:transition-colors";

// Keep precomposed syllables and disregard standalone jamo, including during an IME composition.
function searchTerm(value: string) {
  return value
    .normalize("NFC")
    .replace(/[\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff\uffa0-\uffdc]/g, "")
    .replace(/[\s,]/g, "")
    .toLowerCase();
}

export function PricingFilter({ groups }: { groups: readonly PricingGroup[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const query = active === null ? searchTerm(draft) : "";
  const visible = groups.filter((group) => {
    if (active !== null) return group.id === active;
    if (!query) return true;
    return [group.name, group.title ?? "", group.note ?? "", ...group.search].some((field) =>
      searchTerm(field).includes(query),
    );
  });

  return (
    <section
      aria-labelledby="pricing-title"
      className="pt-[var(--section-gap,5rem)] lg:pt-[var(--section-gap,7rem)]"
    >
      <div className={subpagePad}>
        <h2 id="pricing-title" className={sectionTitle}>
          Pricing
        </h2>
        <div className="mt-3.5 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <p className={cn(sectionSub, "mt-0!")}>
            <span className="block">모든 금액은 VAT 포함입니다.</span>
            <span className="block">
              파란 버튼 상품은 주문서에서 바로 결제하고, 나머지는 상담 후 결제합니다.
            </span>
          </p>
          {active === null && (
            <label className="block w-full sm:w-60 sm:shrink-0">
              <span className="sr-only">요금표 검색</span>
              <Input
                type="search"
                value={draft}
                placeholder="상품명 또는 내용 검색"
                aria-controls="pricing-groups"
                className="h-10"
                onChange={(event) => setDraft(event.currentTarget.value)}
                onCompositionEnd={(event) => setDraft(event.currentTarget.value)}
              />
            </label>
          )}
        </div>
      </div>
      <div
        className={`mt-[var(--section-content-gap,3rem)] lg:mt-[var(--section-content-gap,5rem)] ${subpagePad}`}
      >
        <div
          role="group"
          aria-label="요금 묶음"
          className="-mx-5 flex [scrollbar-width:none] gap-x-6 overflow-x-auto border-b border-black px-5 sm:mx-0 sm:px-0 lg:flex-wrap lg:gap-x-7 [&::-webkit-scrollbar]:hidden"
        >
          {[{ id: null, name: "전체" }, ...groups].map((group) => (
            <button
              key={group.name}
              type="button"
              aria-pressed={active === group.id}
              onClick={() => {
                setActive(group.id);
                if (group.id !== null) setDraft("");
              }}
              className={cn(
                tab,
                active === group.id
                  ? "text-black after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-black"
                  : "text-neutral-400 hover:text-black",
              )}
            >
              {group.name}
            </button>
          ))}
        </div>
        <div id="pricing-groups">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              hidden={!visible.includes(group)}
              className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20"
            >
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <h2
                  id={`${group.id}-title`}
                  className="text-xl leading-[1.3] font-bold tracking-[-0.03em] lg:text-[1.375rem]"
                >
                  {group.title ?? group.name}
                </h2>
                {group.note && <p className="text-sm text-neutral-600">{group.note}</p>}
              </div>
              {group.content}
            </section>
          ))}
          <p
            role="status"
            className={visible.length === 0 ? "py-12 text-sm text-neutral-600" : "sr-only"}
          >
            {visible.length === 0 && "검색 결과가 없습니다."}
          </p>
        </div>
      </div>
    </section>
  );
}
