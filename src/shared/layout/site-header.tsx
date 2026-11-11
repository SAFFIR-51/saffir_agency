import Link from "next/link";
import { mainNav, routes, site, utilityNav } from "@/shared/config";
import { Container } from "@/shared/ui";

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
          className="flex w-full gap-5 overflow-x-auto text-sm whitespace-nowrap md:w-auto"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
