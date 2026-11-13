"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef } from "react";
import { mainNav, routes } from "@/shared/config";
import { SiteHeaderBar } from "./site-header-bar";

const menuButtonClass =
  "inline-flex size-11 cursor-pointer items-center justify-center hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14";

function MenuIcon() {
  return (
    <span
      aria-hidden="true"
      className="site-menu-icon relative block h-[26px] w-[34px] md:scale-125"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-current" />
      <span className="absolute inset-x-0 top-3 h-0.5 bg-current" />
      <span className="absolute inset-x-0 top-6 h-0.5 bg-current" />
    </span>
  );
}

export function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  function closeMenu() {
    dialog.current?.close();
  }

  return (
    <>
      <SiteHeaderBar className="site-menu-trigger-bar">
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-haspopup="dialog"
          aria-controls={menuId}
          onClick={() => dialog.current?.showModal()}
          className={menuButtonClass}
        >
          <MenuIcon />
        </button>
      </SiteHeaderBar>

      <dialog
        ref={dialog}
        id={menuId}
        aria-label="사이트 메뉴"
        className="site-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain [color-scheme:dark]"
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="site-menu-panel site-menu-panel-left" />
          <div className="site-menu-panel site-menu-panel-right" />
        </div>
        <div className="sticky top-0 z-10">
          <SiteHeaderBar menuOpen onHomeNavigate={closeMenu}>
            <button
              type="button"
              aria-label="메뉴 닫기"
              autoFocus
              onClick={closeMenu}
              className={menuButtonClass}
            >
              <MenuIcon />
            </button>
          </SiteHeaderBar>
        </div>

        <div className="relative grid min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)] md:grid-cols-[24%_1fr]">
          <nav
            aria-label="회사 메뉴"
            className="site-menu-copy order-2 flex flex-wrap items-end gap-x-6 gap-y-2 px-5 py-6 text-sm font-medium md:order-0 md:content-end md:px-11 md:pb-12"
          >
            <Link href={routes.about} onNavigate={closeMenu} className="hover:underline">
              회사 소개
            </Link>
            <Link href={routes.faq} onNavigate={closeMenu} className="hover:underline">
              FAQ
            </Link>
          </nav>
          <div className="flex flex-col justify-end px-5 pt-12 pb-8 md:px-[8%] md:pt-16 md:pb-12">
            <nav aria-label="주요 메뉴" className="site-menu-copy">
              <ul className="space-y-2 text-[clamp(1.75rem,5vw,4rem)] leading-[1.12] font-medium tracking-tight">
                <li>
                  <Link
                    href={routes.home}
                    onNavigate={closeMenu}
                    aria-current={pathname === routes.home ? "page" : undefined}
                    className="site-menu-current inline-block py-1 hover:text-menu-muted"
                  >
                    홈
                  </Link>
                </li>
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onNavigate={closeMenu}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="site-menu-current inline-block py-1 hover:text-menu-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={routes.auth.login}
                    onNavigate={closeMenu}
                    aria-current={pathname === routes.auth.login ? "page" : undefined}
                    className="site-menu-current inline-block py-1 hover:text-menu-muted"
                  >
                    로그인
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              href={routes.contact}
              onNavigate={closeMenu}
              className="site-menu-copy site-menu-surface relative isolate mt-10 flex min-h-20 w-full max-w-2xl items-center justify-between gap-4 px-5 text-lg font-semibold text-background hover:underline md:mt-20"
            >
              <Image
                src="/images/site-menu/project-inquiry-waves.webp"
                alt=""
                fill
                sizes="(max-width: 767px) calc(100vw - 40px), 672px"
                className="pointer-events-none -z-10 object-cover object-[center_58%] opacity-80"
              />
              프로젝트 문의
              <span aria-hidden="true" className="text-2xl font-normal">
                →
              </span>
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
