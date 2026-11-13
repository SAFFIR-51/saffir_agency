"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, routes, site } from "@/shared/config";
import { brochure, landingNav } from "../../model/landing-content";
import { bigShoulders } from "../../model/big-shoulders";
import { pretendard } from "../../model/pretendard";
import "./landing.css";

const MOBILE = "(max-width: 1023px)";

/**
 * 회사소개서 카드. 맨 위에서는 두 줄로 펼쳐져 있고, 스크롤하면 얇은 띠로 접힌다.
 * 소개서가 아직 없어서 누르면 "준비 중" 안내만 잠깐 보인다 (다운로드 없음).
 */
function BrochureCard({ compact }: { compact: boolean }) {
  const [notice, setNotice] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function show() {
    setNotice(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(false), 2500);
  }

  return (
    <div className="lp-brochure" data-compact={compact}>
      <button type="button" className="lp-brochure-card" onClick={show}>
        <span className="lp-brochure-body">
          <span className="lp-brochure-line">{brochure.line}</span>
          <span className="lp-brochure-cta">
            {brochure.cta}
            <svg viewBox="0 0 12 14" aria-hidden="true">
              <path
                d="M6 1v9M2 6.5l4 4 4-4M1 13h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </span>
        </span>
        <svg className="lp-brochure-arrow" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 10L10 2M3.5 2H10v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {compact ? <span className="sr-only">{brochure.cta}</span> : null}
      </button>
      <p className="lp-brochure-notice" role="status" aria-live="polite">
        {notice ? brochure.pending : ""}
      </p>
    </div>
  );
}

/**
 * 메인 첫 화면 헤더. 배경 없이 화면 위에 고정된다.
 * 1024px 이상: 오른쪽에 회사소개서 카드 + 메뉴 한 줄. 1023px 이하: 두 줄 버튼으로 여는 전체 화면 메뉴.
 */
export function LandingHeader() {
  const navId = useId();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = usePathname() === routes.home;

  // 조금이라도 내려가면 소개서 카드를 접는다
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(MOBILE);
    const sync = () => {
      setMobile(query.matches);
      if (!query.matches) setOpen(false);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`lp-header ${bigShoulders.variable} ${pretendard.variable}`}
      data-scrolled={scrolled}
    >
      <Link href={routes.home} className="lp-logo" aria-label={`${site.name} 홈`}>
        <Image src="/brand/saffir-logo.png" alt="" width={1007} height={224} preload />
      </Link>
      <button
        type="button"
        className="lp-menu-toggle"
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
      </button>
      {/* 메인 맨 위에서만 펼쳐 두고, 그 밖에는 접어 두었다가 마우스를 올리면 펼친다 */}
      <BrochureCard compact={!isHome || scrolled} />
      <nav
        id={navId}
        className="lp-nav"
        aria-label="주요 메뉴"
        data-open={open}
        inert={mobile && !open}
      >
        <div className="lp-nav-panel">
          <ul>
            {landingNav.map((item) => {
              // 하위 메뉴: 기획서 메뉴(mainNav)의 children. 맨 위에 "전체"(갈래 첫 페이지)
              const children = mainNav.find((m) => m.href === item.href)?.children;
              return (
                <li key={item.label} className={children ? "lp-has-sub" : undefined}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                  {children ? (
                    <div className="lp-sub">
                      <ul>
                        <li>
                          <Link
                            href={item.href}
                            className="lp-sub-all"
                            onClick={() => setOpen(false)}
                          >
                            전체
                          </Link>
                        </li>
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={() => setOpen(false)}>
                              <span className="lp-sub-name">{child.label}</span>
                              {child.description ? (
                                <span className="lp-sub-desc">{child.description}</span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
