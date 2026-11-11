import Link from "next/link";
import { mainNav, routes, site, utilityNav } from "@/shared/config";
import { Container } from "@/shared/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href={routes.home} className="text-lg font-bold">
          {site.name}
        </Link>
        <nav aria-label="주요 메뉴" className="hidden gap-6 text-sm md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}
