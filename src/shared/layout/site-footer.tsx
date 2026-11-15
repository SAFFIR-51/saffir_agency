import Image from "next/image";
import Link from "next/link";
import { footerNav, footerPolicyNav, routes, site } from "@/shared/config";
import { Container } from "@/shared/ui";

/**
 * 하단: 로고·한 줄 소개 + 주요 메뉴 / 정책 링크 / 사업자정보 / 저작권.
 * 사업자정보는 통신판매(토스 심사)에 필요한 항목만 둔다.
 */
export function SiteFooter() {
  const b = site.business;
  const lines = [
    [
      site.legalName,
      `대표 ${b.ceo}`,
      `사업자등록번호 ${b.registrationNumber}`,
      `통신판매업 신고번호 ${b.mailOrderNumber}`,
    ],
    [b.address, `Tel ${b.phone}`, b.email],
    [
      `개인정보 보호책임자 ${b.privacyOfficer}`,
      `호스팅 제공 ${b.hosting}`,
      `결제대행 ${b.paymentAgent}`,
    ],
  ];
  return (
    <footer className="bg-black py-16 text-white lg:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div>
            <Link href={routes.home} aria-label={site.name} className="inline-block">
              <Image
                src="/brand/saffir-logo.png"
                alt=""
                width={1007}
                height={224}
                className="h-auto w-32 invert"
              />
            </Link>
            <p className="mt-6 text-[0.9375rem] leading-[1.7] text-white/80">
              일하는 방식에 알맞게 만들고,
              <br />
              운영까지 함께하는 사피어 테크놀로지입니다.
            </p>
          </div>
          <nav aria-label="하단 메뉴">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem] text-white/80">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
            {footerPolicyNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    item.href === routes.legal.privacy
                      ? "font-bold text-white hover:underline"
                      : "hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <address className="mt-6 flex flex-col gap-1.5 text-[0.8125rem] leading-[1.7] text-white/50 not-italic">
            {lines.map((line) => (
              <p key={line[0]}>
                {line.map((part, i) => (
                  <span key={part}>
                    {i > 0 ? (
                      <span aria-hidden="true" className="mx-2 text-white/25">
                        |
                      </span>
                    ) : null}
                    {part}
                  </span>
                ))}
              </p>
            ))}
          </address>
          <p className="mt-6 text-[0.8125rem] text-white/50">
            Copyright © 2026 {site.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
