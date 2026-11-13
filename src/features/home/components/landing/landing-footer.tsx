import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/shared/config";
import { bigShoulders } from "../../model/big-shoulders";
import { brochure } from "../../model/landing-content";
import { pretendard } from "../../model/pretendard";

/** 값이 아직 정해지지 않았으면(TODO) 빈 칸 표시 */
function filled(value: string, placeholder: string) {
  return value && value !== "TODO" ? value : placeholder;
}

const menu: ReadonlyArray<{ label: string; href: Route }> = [
  { label: "About", href: routes.about },
  { label: "Hospital", href: routes.hospital.root },
  { label: "Business", href: routes.solutions.root },
  { label: "Development", href: routes.development.root },
  { label: "Portfolio", href: routes.portfolio },
  { label: "Pricing", href: routes.pricing },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

const policies: ReadonlyArray<{ label: string; href: Route }> = [
  { label: "이용약관", href: routes.legal.terms },
  { label: "개인정보처리방침", href: routes.legal.privacy },
  { label: "취소 및 환불 규정", href: routes.legal.refund },
  { label: "보안·데이터 정책", href: routes.legal.security },
];

/**
 * 메인·회사 소개 하단.
 * 위 여백 → 굵은 선 아래 네 칸(로고·메뉴·연락처·회사 정보) → 저작권·정책 한 줄.
 */
export function LandingFooter() {
  const b = site.business;
  return (
    <footer className={`lp-footer ${bigShoulders.variable} ${pretendard.variable}`}>
      <div className="lp-footer-cols">
        <div className="lp-footer-brand">
          <Image src="/brand/saffir-logo.png" alt={site.name} width={1007} height={224} />
          <p>{brochure.line}</p>
        </div>

        <nav className="lp-footer-col" aria-label="하단 메뉴">
          <p className="lp-footer-label" lang="en">
            Menu
          </p>
          <ul className="lp-footer-menu" lang="en">
            {menu.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lp-footer-col">
          <p className="lp-footer-label" lang="en">
            Contact
          </p>
          <dl className="lp-footer-dl">
            <div>
              <dt>이메일</dt>
              <dd>{filled(b.email, "[ 이메일 ]")}</dd>
            </div>
            <div>
              <dt>전화</dt>
              <dd>{filled(b.phone, "[ 전화 ]")}</dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>{filled(b.address, "[ 주소 ]")}</dd>
            </div>
          </dl>
          <Link href={routes.contact} className="lp-footer-cta">
            문의하기
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M2 10L10 2M3.5 2H10v6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </Link>
        </div>

        <div className="lp-footer-col">
          <p className="lp-footer-label" lang="en">
            Company
          </p>
          <dl className="lp-footer-dl">
            <div>
              <dt>상호</dt>
              <dd>{site.legalName}</dd>
            </div>
            <div>
              <dt>대표</dt>
              <dd>{filled(b.ceo, "[ 대표자 ]")}</dd>
            </div>
            <div>
              <dt>사업자등록번호</dt>
              <dd>{filled(b.registrationNumber, "[ 번호 ]")}</dd>
            </div>
            <div>
              <dt>통신판매업</dt>
              <dd>{filled(b.mailOrderNumber, "[ 번호 ]")}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="lp-footer-bottom">
        <p lang="en">© Saffir Technology Inc. All rights reserved</p>
        <ul className="lp-footer-policy">
          {policies.map((p) => (
            <li key={p.label}>
              <Link href={p.href}>{p.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
