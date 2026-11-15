"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { headerNav, routes, site } from "@/shared/config";
import { cn } from "@/shared/lib";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const desktopNav = useRef<HTMLElement>(null);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [menu, setMenu] = useState<{ key: string; pinned: boolean } | null>(null);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
    <header className="sticky top-0 z-40 border-b border-b-black/12 bg-white text-black">
      <div className="relative mx-auto flex h-16 w-full max-w-[1680px] items-center gap-3 px-4 sm:gap-6 sm:px-8 lg:h-[72px] lg:gap-8 xl:gap-12 xl:px-10 2xl:px-16">
        <Link
          href={routes.home}
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
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
          <ul className="flex h-full gap-3 text-nav xl:gap-7">
            {headerNav.map((item, index) => {
              const active = menu?.key === item.href;
              const panelId = `${menuId}-${index}`;
              const links = item.children;

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
                        className="peer group relative flex h-full cursor-pointer items-center gap-2 px-2 whitespace-nowrap after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-black after:opacity-0 hover:text-black/65 focus-visible:outline-2 focus-visible:-outline-offset-4 aria-expanded:after:opacity-100 motion-safe:after:transition-opacity motion-safe:after:duration-240 motion-safe:after:ease-menu"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="size-1.5 -translate-y-0.5 rotate-45 border-r border-b group-aria-expanded:translate-y-0.5 group-aria-expanded:rotate-225 motion-safe:transition-[translate,rotate] motion-safe:duration-260 motion-safe:ease-menu"
                        />
                      </button>

                      <div
                        id={panelId}
                        inert={!active}
                        className={cn(
                          "group absolute top-full -left-[26px] max-h-[calc(100dvh-73px)] max-w-[calc(100vw-28rem)] overflow-y-auto overscroll-contain rounded-b-2xl border-t border-black/10 bg-white shadow-[0_16px_40px_-12px_rgb(0_0_0/0.2)] not-inert:z-10 inert:pointer-events-none inert:invisible inert:opacity-0 motion-safe:transition-[opacity,visibility] motion-safe:duration-240 motion-safe:ease-menu motion-safe:not-inert:duration-280 motion-safe:not-inert:peer-focus-visible:transition-none motion-safe:not-inert:peer-focus-visible:[&>div]:transition-none",
                          item.href === routes.hospital.root && "w-[60rem]",
                          item.href === routes.solutions.root && "w-[56rem]",
                          item.href === routes.development.root && "w-[50rem]",
                        )}
                      >
                        <div className="grid grid-cols-[minmax(11rem,1fr)_minmax(0,2.35fr)] motion-safe:transition-transform motion-safe:duration-240 motion-safe:ease-menu motion-safe:group-not-inert:duration-280 motion-safe:group-inert:-translate-y-1.5">
                          <ul className="space-y-1 px-6 py-5 xl:px-8 xl:py-6">
                            {links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => setMenu(null)}
                                  className="block rounded-md px-2 py-2.5 text-nav hover:bg-black/4 focus-visible:outline-2 focus-visible:-outline-offset-2"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <div className="grid grid-cols-2 content-start gap-4 border-l border-black/10 px-4 py-6 xl:gap-6 xl:px-7">
                            {item.quickLinks.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenu(null)}
                                className="group block min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
                              >
                                <div
                                  aria-hidden="true"
                                  className="aspect-2/1 rounded-lg bg-black/5"
                                />
                                <span className="mt-3 block text-nav group-hover:underline group-hover:underline-offset-4">
                                  {link.label}
                                </span>
                                <span className="mt-1 block text-menu-caption font-normal text-black/60">
                                  {link.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenu(null)}
                      className="flex h-full items-center px-2 whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:-outline-offset-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-5 lg:gap-7">
          <Link
            href={routes.auth.login}
            className="hidden rounded-sm py-2 text-nav whitespace-nowrap hover:text-black/65 focus-visible:outline-2 focus-visible:outline-offset-4 lg:block"
          >
            로그인
          </Link>
          <Link
            href={routes.contact}
            className="inline-flex h-[42px] items-center justify-center rounded-lg bg-black px-3 text-menu-caption font-medium whitespace-nowrap text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-6 sm:text-nav-action"
          >
            프로젝트 문의
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
