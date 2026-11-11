import Link from "next/link";
import { mainNav, routes, site, utilityNav, type NavItem } from "@/shared/config";
import { Container } from "@/shared/ui";

/**
 * 데스크톱(md 이상): 메뉴에 마우스를 올리거나 키보드로 포커스하면 하위 메뉴와 설명이 열린다.
 * 모바일: 상위 메뉴만 가로로 보인다 (모바일 메뉴는 docs/TODO.md).
 */
function SubMenu({ item }: { item: NavItem }) {
  return (
    <div className="invisible absolute top-full left-0 z-50 hidden w-80 max-w-[calc(100vw-2rem)] pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 md:block">
      <div className="rounded-lg border border-foreground/20 bg-background p-2 whitespace-normal shadow-sm">
        {item.description ? (
          <p className="px-3 pt-1 pb-2 text-xs text-foreground/60">{item.description}</p>
        ) : null}
        {item.children ? (
          <ul>
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block rounded-md px-3 py-2 hover:bg-foreground/5"
                >
                  <span className="block text-sm font-medium">{child.label}</span>
                  {child.description ? (
                    <span className="mt-0.5 block text-xs text-foreground/60">
                      {child.description}
                    </span>
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
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link href={routes.home} className="text-lg font-bold">
          {site.name}
        </Link>
        <div className="flex items-center gap-4 text-sm md:order-last">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </div>
        <nav
          aria-label="주요 메뉴"
          className="w-full overflow-x-auto text-sm whitespace-nowrap md:w-auto md:overflow-visible"
        >
          <ul className="flex gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link href={item.href} className="block rounded-md px-3 py-2 hover:bg-foreground/5">
                  {item.label}
                  {item.children ? (
                    <span aria-hidden className="ml-1 text-xs text-foreground/50">
                      ▾
                    </span>
                  ) : null}
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
