"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, routes, site, utilityNav } from "@/shared/config";
import "./nc.css";

/**
 * 메인 헤더 (NHN Cloud 메인과 같은 구성)
 * - 첫 화면 위에서는 투명 + 흰 글자, 스크롤하거나 메뉴를 열면 흰 바탕 + 검정 글자
 * - 메뉴에 마우스를 올려도 큰 메뉴는 열지 않는다 (들어가면 갈래 하위 메뉴 줄이 보인다)
 * - 좁은 화면은 메뉴 버튼으로 펼친다
 * variant="sub": 하위 페이지. 처음부터 흰 바탕이고 화면 위에 붙어 따라오며,
 *   지금 갈래의 하위 메뉴 줄(64px)을 아래에 단다 (NHN Cloud 하위 페이지와 같은 구성)
 */
export function NcHeader({ variant = "home" }: { variant?: "home" | "sub" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = variant === "sub" || scrolled || mobile;
  /** 지금 주소가 속한 갈래 (하위 메뉴 줄에 쓴다) */
  const section =
    variant === "sub"
      ? mainNav.find(
          (item) =>
            item.children &&
            (pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              item.children.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))),
        )
      : undefined;
  /**
   * 하위 메뉴 중 지금 주소에 가장 길게 맞는 하나만 현재 위치로 본다
   * (/geo/ad-check에서 /geo와 /geo/ad-check가 함께 켜지지 않게)
   */
  const activeChild = section?.children
    ?.filter((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))
    .sort((x, y) => y.href.length - x.href.length)[0]?.href;

  return (
    <header
      className={
        variant === "sub" ? "nc-header sticky top-0 z-50" : "nc-header fixed inset-x-0 top-0 z-50"
      }
      data-solid={solid ? "" : undefined}
    >
      <div className="nc-header-bar">
        <Link href={routes.home} className="nc-logo" aria-label={site.name}>
          <Image src="/brand/saffir-logo.png" alt="" width={1007} height={224} preload />
        </Link>

        <nav aria-label="주요 메뉴" className="nc-gnb">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={section?.href === item.href ? "true" : undefined}
                  data-active={section?.href === item.href ? "" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nc-util">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={routes.contactFor("hospital-bundle")} className="nc-console">
            도입 상담
          </Link>
          <button
            type="button"
            className="nc-burger"
            aria-expanded={mobile}
            aria-controls="nc-mobile"
            aria-label={mobile ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMobile((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* 갈래 하위 메뉴 줄 (하위 페이지) */}
      {section?.children && !mobile ? (
        <nav aria-label={`${section.label} 메뉴`} className="nc-lnb">
          <ul>
            <li>
              <Link
                href={section.href}
                aria-current={pathname === section.href ? "page" : undefined}
              >
                전체
              </Link>
            </li>
            {section.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={child.href === activeChild ? "page" : undefined}
                >
                  {child.label.replace(/^사피어 /, "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {/* 좁은 화면 메뉴 */}
      {mobile ? (
        <nav id="nc-mobile" aria-label="주요 메뉴" className="nc-mobile">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobile(false)}>
                  {item.label}
                </Link>
                {item.children ? (
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setMobile(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
