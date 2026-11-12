import Link from "next/link";
import { footerGroups, mainNav, routes, site } from "@/shared/config";
import { LogoSlot, Wrap } from "./parts";

/** 아직 확정 안 된 사업자 정보는 [ 이름 ] 자리로 보인다 */
function value(v: string, label: string) {
  return v === "TODO" ? `[ ${label} ]` : v;
}

const companyNav = [
  { label: "회사 소개", href: routes.about },
  { label: "FAQ", href: routes.faq },
  { label: "문의", href: routes.contact },
  { label: "고객 포털", href: routes.auth.login },
] as const;

const policyNav = footerGroups.at(-1)?.items ?? [];

/** 메인 시안 푸터: 위 선, 회사 정보, 큰 글자 메뉴 두 묶음, 맨 위로 */
export function LandingFooter() {
  const b = site.business;
  return (
    <footer className="pb-[54px]">
      <Wrap>
        <div className="border-t border-black pt-[13px]">
          <div className="flex flex-wrap gap-x-[clamp(24px,5vw,90px)] gap-y-8">
            <LogoSlot className="self-start" />
            <ul className="lt-foot-info">
              <li>{site.legalName}</li>
              <li>{value(b.address, "주소")}</li>
              <li>{value(b.email, "이메일")}</li>
              <li>{value(b.phone, "전화")}</li>
              <li className="font-normal text-[#666]">
                대표 {value(b.ceo, "대표자")} · 사업자등록번호 {value(b.registrationNumber, "번호")}
              </li>
            </ul>
            <nav aria-label="하단 메뉴" className="flex gap-[clamp(32px,6vw,110px)] lg:ml-auto">
              {[mainNav, companyNav].map((group, i) => (
                <ul key={i} className="lt-foot-nav space-y-0.5">
                  {group.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-(--landing-signal)">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
            <a
              href="#top"
              className="self-start text-[22px] leading-none hover:text-(--landing-signal)"
              aria-label="맨 위로"
            >
              ↑
            </a>
          </div>
          <div className="lt-copy mt-16 flex flex-wrap justify-end gap-x-6 gap-y-2">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {policyNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>Copyright © {site.legalName}. All Rights Reserved.</p>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}
