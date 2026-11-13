import Image from "next/image";
import Link from "next/link";
import { mainNav, routes, site, utilityNav, type NavItem } from "@/shared/config";
import { Container } from "@/shared/ui";
import { MobileNav } from "./mobile-nav";

/**
 * 데스크톱(md 이상): 메뉴에 마우스를 올리거나 키보드로 포커스하면 하위 메뉴와 설명이 열린다.
 * 모바일(md 미만): 메뉴 버튼으로 여는 아코디언 (mobile-nav.tsx).
 */
function SubMenu({ item }: { item: NavItem }) {
  return (
    <div className="invisible absolute top-full left-0 z-50 hidden w-80 max-w-[calc(100vw-2rem)] pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 md:block">
      <div className="rounded-2xl bg-background/95 p-2 whitespace-normal shadow-[0_8px_32px_rgb(0_0_0/0.12)] backdrop-blur-xl">
        {item.description ? (
          <p className="px-3 pt-2 pb-2 text-xs text-muted">{item.description}</p>
        ) : null}
        {item.children ? (
          <ul>
            {item.children.map((child) => (
              <li key={child.href}>
                <Link href={child.href} className="block rounded-xl px-3 py-2.5 hover:bg-surface">
                  <span className="block text-sm font-medium">{child.label}</span>
                  {child.description ? (
                    <span className="mt-0.5 block text-xs text-muted">{child.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#fafafc]/80 backdrop-blur-xl backdrop-saturate-150">
      <Container className="relative flex h-16 max-w-[1200px]! items-center justify-between gap-x-6">
        <Link href={routes.home} className="flex shrink-0 items-center" aria-label={site.name}>
          <Image
            src="/brand/saffir-logo.png"
            alt=""
            width={1007}
            height={224}
            preload
            className="h-7 w-auto"
          />
        </Link>
        <div className="flex items-center gap-6 text-sm text-foreground/80 md:order-last">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <MobileNav />
        </div>
        <nav
          aria-label="주요 메뉴"
          className="hidden text-sm whitespace-nowrap text-foreground/80 md:block"
        >
          <ul className="flex gap-4 lg:gap-6">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link href={item.href} className="block px-2 py-5 hover:text-foreground">
                  {item.label}
                </Link>
                <SubMenu item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
