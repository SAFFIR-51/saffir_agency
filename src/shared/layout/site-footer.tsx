import Image from "next/image";
import Link from "next/link";
import { footerGroups, site } from "@/shared/config";
import { Container } from "@/shared/ui";

/** 하단: 사이트맵(서비스·회사·정책) + 사업자정보 */
export function SiteFooter() {
  const b = site.business;
  return (
    <footer className="border-t border-divider bg-surface py-10 text-xs leading-relaxed text-muted">
      <Container className="max-w-[1200px]! space-y-8">
        <Image
          src="/brand/saffir-logo.png"
          alt={site.name}
          width={1007}
          height={224}
          className="h-6 w-auto"
        />
        <nav
          aria-label="하단 메뉴"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"
        >
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-semibold text-foreground">
                {group.href ? (
                  <Link href={group.href} className="hover:opacity-70">
                    {group.title}
                  </Link>
                ) : (
                  group.title
                )}
              </p>
              <ul className="mt-2.5 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-foreground hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="space-y-1 border-t border-divider pt-5">
          <p>
            {site.legalName} · 대표 {b.ceo} · 사업자등록번호 {b.registrationNumber} · 통신판매업{" "}
            {b.mailOrderNumber}
          </p>
          <p>
            {b.address} · {b.email} · {b.phone}
          </p>
        </div>
      </Container>
    </footer>
  );
}
