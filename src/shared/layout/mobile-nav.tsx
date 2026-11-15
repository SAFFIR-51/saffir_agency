"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { headerNav, routes } from "@/shared/config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus();
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((value) => !value)}
        className="peer group relative grid size-11 cursor-pointer place-items-center rounded-lg hover:bg-black/5 focus-visible:outline-2 motion-safe:[&>span]:transition-[opacity,rotate,translate] motion-safe:[&>span]:duration-260 motion-safe:[&>span]:ease-menu"
      >
        <span
          aria-hidden="true"
          className="absolute h-0.5 w-5 -translate-y-[5px] bg-current group-aria-expanded:translate-y-0 group-aria-expanded:rotate-45"
        />
        <span
          aria-hidden="true"
          className="absolute h-0.5 w-5 bg-current group-aria-expanded:opacity-0"
        />
        <span
          aria-hidden="true"
          className="absolute h-0.5 w-5 translate-y-[5px] bg-current group-aria-expanded:translate-y-0 group-aria-expanded:-rotate-45"
        />
      </button>
      <nav
        id={navId}
        inert={!open}
        aria-label="모바일 주요 메뉴"
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain bg-white px-4 pt-2 pb-5 shadow-lg inert:pointer-events-none inert:invisible inert:opacity-0 motion-safe:transition-[opacity,translate,visibility] motion-safe:duration-240 motion-safe:ease-menu motion-safe:not-inert:duration-280 motion-safe:not-inert:peer-focus-visible:transition-none motion-safe:inert:-translate-y-1.5 sm:px-8"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
        }}
      >
        <ul className="space-y-1">
          {headerNav.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <details name="mobile-header-nav" className="group">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-md px-3 text-nav hover:bg-black/5 focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="mb-1 size-1.5 rotate-45 border-r border-b group-open:mt-1 group-open:mb-0 group-open:rotate-225"
                    />
                  </summary>
                  <ul className="py-1 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex min-h-11 items-center rounded-md px-3 text-menu-caption hover:bg-black/5 focus-visible:outline-2"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-3 ml-3 grid grid-cols-2 gap-2">
                    {item.quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex min-h-11 items-center justify-center rounded-lg bg-black/5 px-2 text-center text-menu-caption font-medium focus-visible:outline-2"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-3 text-nav hover:bg-black/5 focus-visible:outline-2"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href={routes.auth.login}
              className="flex min-h-11 items-center rounded-md px-3 text-nav hover:bg-black/5 focus-visible:outline-2"
            >
              로그인
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
