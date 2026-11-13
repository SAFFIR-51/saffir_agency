import Image from "next/image";
import Link from "next/link";
import { footerGroups, site } from "@/shared/config";

/** 하단 (NHN Cloud 메인과 같은 검정 사이트맵) */
export function NcFooter() {
  const b = site.business;
  return (
    <footer className="nc-footer">
      <div className="nc-footer-top">
        <Image
          src="/brand/saffir-logo.png"
          alt={site.name}
          width={1007}
          height={224}
          className="nc-footer-logo"
        />
        <nav aria-label="하단 메뉴" className="nc-footer-map">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p>{group.href ? <Link href={group.href}>{group.title}</Link> : group.title}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="nc-footer-bottom">
        <p>
          {site.legalName} · 대표 {b.ceo} · 사업자등록번호 {b.registrationNumber} · 통신판매업{" "}
          {b.mailOrderNumber}
        </p>
        <p>
          {b.address} · {b.email} · {b.phone}
        </p>
        <p>© {site.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
