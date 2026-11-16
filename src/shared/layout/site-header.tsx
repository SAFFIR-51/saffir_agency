"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { headerNav, routes, site } from "@/shared/config";
import { cn } from "@/shared/lib";
import { MobileNav } from "./mobile-nav";

/** 드롭다운 카드 사진: 메인 세 카드와 같은 이미지 */
const menuImage: Record<string, string> = {
  [routes.hospital.root]: "url(/home/hospital-card.webp)",
  [routes.solutions.root]: "url(/home/business-card.webp)",
  [routes.development.root]: "url(/home/development-card.webp)",
};

export function SiteHeader() {
  const desktopNav = useRef<HTMLElement>(null);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [menu, setMenu] = useState<{ key: string; pinned: boolean } | null>(null);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /*
   * 드롭다운은 연 메뉴 바로 아래에서 열린다. 왼쪽 목록 글자가 그 메뉴 글자와 같은 선에 오고,
   * 오른쪽 여백(40)을 넘지 않도록 너비를 줄인다(최대 600).
   */
  useLayoutEffect(() => {
    if (!menu) return;
    const nav = desktopNav.current;
    const panel = nav?.querySelector<HTMLElement>("[data-menu-panel]:not([inert])");
    const item = panel?.closest("li");
    if (!panel || !item) return;
    const target = item.getBoundingClientRect().left - 28;
    const anchor = panel.offsetParent?.getBoundingClientRect().left ?? 0;
    panel.style.left = `${target - anchor}px`;
    panel.style.width = panel.dataset.listOnly
      ? "max-content"
      : `${Math.min(600, window.innerWidth - 40 - target)}px`;
  }, [menu]);

  useEffect(() => {
    if (!menu) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !desktopNav.current?.contains(event.target)) {
        setMenu(null);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [menu]);

  return (
    /* kolonworkwear.com 헤더: 흰 바탕, 선 없음, 높이 80, 12칸 그리드 (로고 1–6칸, 메뉴 7칸부터, 오른쪽 끝 링크) */
    <header className="sticky top-0 z-40 bg-white text-black">
      <div className="relative flex h-16 w-full items-center gap-3 px-5 lg:h-20 lg:gap-10 lg:px-10 xl:gap-14">
        <Link
          href={routes.home}
          className="mr-auto shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label={site.name}
        >
          <Image
            src="/brand/saffir-logo.png"
            alt=""
            width={1007}
            height={224}
            sizes="(min-width: 640px) 112px, 96px"
            className="h-auto w-24 sm:w-28"
            preload
          />
        </Link>

        <nav
          ref={desktopNav}
          aria-label="주요 메뉴"
          className="hidden self-stretch lg:block"
          onPointerEnter={() => clearTimeout(closeTimer.current)}
          onPointerLeave={(event) => {
            if (event.pointerType !== "mouse") return;
            clearTimeout(closeTimer.current);
            closeTimer.current = setTimeout(() => {
              setMenu((current) => (current?.pinned ? current : null));
            }, 120);
          }}
        >
          <ul className="flex h-full gap-6 text-sm leading-[1.4] font-medium tracking-[-0.008em] xl:gap-10">
            {headerNav.map((item, index) => {
              const active = menu?.key === item.href;
              const panelId = `${menuId}-${index}`;
              const links = item.children;
              const listOnly = item.href === routes.development.root;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    setMenu((current) =>
                      links
                        ? current?.key === item.href
                          ? current
                          : { key: item.href, pinned: false }
                        : null,
                    );
                  }}
                  onBlur={(event) => {
                    if (event.currentTarget.contains(event.relatedTarget)) return;
                    setMenu((current) => (current?.key === item.href ? null : current));
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape" || !active) return;
                    event.preventDefault();
                    setMenu(null);
                    event.currentTarget.querySelector("button")?.focus();
                  }}
                >
                  {links ? (
                    <>
                      <button
                        type="button"
                        aria-controls={panelId}
                        aria-expanded={active}
                        onClick={() =>
                          setMenu((current) =>
                            current?.key === item.href && current.pinned
                              ? null
                              : { key: item.href, pinned: true },
                          )
                        }
                        className="peer group relative flex h-full cursor-pointer items-center gap-2 whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:-outline-offset-4"
                      >
                        {item.label}
                      </button>

                      <div
                        id={panelId}
                        data-menu-panel
                        data-list-only={listOnly || undefined}
                        inert={!active}
                        className={cn(
                          "group absolute top-full max-h-[calc(100dvh-80px)] max-w-[calc(100vw-5rem)] overflow-y-auto overscroll-contain border border-black/10 bg-white shadow-[0_20px_32px_-24px_rgb(0_0_0/0.25)] not-inert:z-10 inert:pointer-events-none inert:invisible inert:opacity-0 motion-safe:transition-[opacity,visibility] motion-safe:duration-240 motion-safe:ease-menu motion-safe:not-inert:duration-280 motion-safe:not-inert:peer-focus-visible:transition-none motion-safe:not-inert:peer-focus-visible:[&>div]:transition-none",
                        )}
                      >
                        <div
                          className={cn(
                            listOnly ? "grid grid-cols-1" : "grid grid-cols-2",
                            "motion-safe:transition-transform motion-safe:duration-240 motion-safe:ease-menu motion-safe:group-not-inert:duration-280 motion-safe:group-inert:-translate-y-1.5",
                          )}
                        >
                          <ul className="flex flex-col gap-0.5 px-4 py-6 xl:px-5 xl:py-7">
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => setMenu(null)}
                                  className="block px-3 py-2 text-[0.9375rem] leading-[1.4] font-medium tracking-[-0.01em] text-black/75 hover:text-black hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:-outline-offset-2"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          {/* 맞춤 개발은 오른쪽 카드 없이 목록만 */}
                          {!listOnly && (
                            <div className="border-l border-black/10 p-5">
                              {item.quickLinks.slice(0, 1).map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  onClick={() => setMenu(null)}
                                  className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4"
                                >
                                  <div
                                    aria-hidden="true"
                                    className="aspect-[16/10] bg-[#f4f4f4] bg-cover bg-center"
                                    style={{ backgroundImage: menuImage[item.href] }}
                                  />
                                  <span className="mt-3 block text-[0.9375rem] leading-[1.4] font-semibold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                                    {link.label}
                                  </span>
                                  <span className="mt-1 block text-[0.8125rem] leading-[1.5] font-normal text-black/55">
                                    {link.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenu(null)}
                      className="flex h-full items-center whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:-outline-offset-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-4 sm:gap-6 lg:gap-8">
          <Link
            href={routes.auth.login}
            data-brochure-anchor
            className="hidden rounded-sm py-2 text-sm font-medium tracking-[-0.008em] whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:outline-offset-4 lg:block"
          >
            로그인
          </Link>
          <Link
            href={routes.contact}
            className="rounded-sm py-2 text-sm font-medium tracking-[-0.008em] whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            프로젝트 문의
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
