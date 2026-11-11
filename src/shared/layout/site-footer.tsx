import Link from "next/link";
import { footerNav, site } from "@/shared/config";
import { Container } from "@/shared/ui";

export function SiteFooter() {
  const b = site.business;
  return (
    <footer className="border-t border-foreground/10 py-10 text-sm text-foreground/60">
      <Container className="space-y-4">
        <nav aria-label="하단 메뉴" className="flex flex-wrap gap-4">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <p>
          {site.legalName} · 대표 {b.ceo} · 사업자등록번호 {b.registrationNumber} · 통신판매업{" "}
          {b.mailOrderNumber}
        </p>
        <p>
          {b.address} · {b.email} · {b.phone}
        </p>
      </Container>
    </footer>
  );
}
