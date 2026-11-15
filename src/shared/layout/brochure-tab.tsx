"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/shared/config";
import { cn } from "@/shared/lib";

/** 접혔을 때 남는 손잡이 너비 */
const HANDLE = 36;

/**
 * 회사 소개서 다운로드 탭: 헤더 바로 아래(간격 0) 오른쪽 끝에 붙어 좌우로 접고 편다.
 * 펼친 너비는 헤더 "로그인" 글자 왼쪽 끝부터 화면 오른쪽 끝까지.
 * 메인 화면 맨 위에서만 펼쳐져 있고, 스크롤하거나 다른 페이지에서는 접힌다. 손으로 열고 닫을 수 있다.
 */
export function BrochureTab() {
  const pathname = usePathname();
  /** 처음부터 펼쳐 두는 페이지 (맨 위에 있을 때만) */
  const home = pathname === "/" || pathname === "/contact";
  const [atTop, setAtTop] = useState(true);
  const [width, setWidth] = useState(220);
  /** 사용자가 직접 열고 닫은 상태. 다른 페이지로 가면 자동으로 돌아간다 */
  const [manual, setManualFor] = useState<{ path: string; open: boolean } | null>(null);
  const manualOpen = manual?.path === pathname ? manual.open : null;

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY < 24;
      setAtTop(top);
      if (!top) setManualFor(null);
    };
    const measure = () => {
      const anchor = document.querySelector("[data-brochure-anchor]");
      const left = anchor?.getBoundingClientRect().left;
      // 로그인이 보이지 않는 좁은 화면에서는 글자가 들어가는 너비로
      setWidth(left && left > 0 ? Math.max(170, window.innerWidth - left) : 220);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const open = manualOpen ?? (home && atTop);

  return (
    <div
      className="fixed top-16 right-0 z-30 flex h-11 overflow-hidden bg-black text-white motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out lg:top-20"
      style={{ width: open ? width : HANDLE }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="brochure-link"
        aria-label={open ? "회사 소개서 버튼 접기" : "회사 소개서 버튼 펴기"}
        onClick={() => setManualFor({ path: pathname, open: !open })}
        style={{ width: HANDLE }}
        className="grid h-full shrink-0 place-items-center hover:bg-neutral-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={cn(
            "size-4 motion-safe:transition-transform motion-safe:duration-300",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {/* 접혀 있으면 ‹ (펴기), 펴져 있으면 › (접기) */}
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <a
        id="brochure-link"
        href={site.brochure}
        download
        tabIndex={open ? undefined : -1}
        aria-hidden={!open || undefined}
        className="flex min-w-0 flex-1 items-center justify-between gap-1.5 pr-3.5 text-[0.8125rem] font-medium tracking-[-0.02em] whitespace-nowrap hover:underline hover:underline-offset-4"
      >
        회사 소개서 다운받기
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M8 2v9m-4-4 4 4 4-4M3 14h10" />
        </svg>
      </a>
    </div>
  );
}
