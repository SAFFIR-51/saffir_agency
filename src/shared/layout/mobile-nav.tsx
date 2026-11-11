"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/shared/config";

/**
 * 모바일(md 미만) 메뉴: 메뉴 버튼 → 상위 메뉴 5개 → 누르면 하위 메뉴가 열리는 아코디언.
 * 한 번에 하나만 열린다(details name). 링크를 누르거나 Esc를 누르면 닫힌다.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm"
      >
        {open ? "닫기" : "메뉴"}
      </button>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="주요 메뉴"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-foreground/10 bg-background px-4 pb-4 text-sm"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <ul className="divide-y divide-foreground/10">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <details name="mobile-nav" className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium">
                      {item.label}
                      <span
                        aria-hidden
                        className="text-xs text-foreground/50 group-open:rotate-180"
                      >
                        ▾
                      </span>
                    </summary>
                    <ul className="space-y-1 pb-3">
                      <li>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 hover:bg-foreground/5"
                        >
                          <span className="block font-medium">{item.label} 전체 보기</span>
                          {item.description ? (
                            <span className="mt-0.5 block text-xs text-foreground/60">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-2 hover:bg-foreground/5"
                          >
                            <span className="block">{child.label}</span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs text-foreground/60">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 font-medium">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
