import Link from "next/link";
import { mainNav, routes, site } from "@/shared/config";
import { MobileNav } from "@/shared/layout";
import { LogoSlot, Wrap } from "./parts";

/** 메인 시안 헤더: 흰 바탕, 가운데 메뉴, 오른쪽 주황 문의 버튼 */
export function LandingHeader() {
  return (
    <header className="landing-header sticky top-0 z-40 bg-white">
      <Wrap className="relative flex h-[66px] items-center justify-between gap-6">
        <Link href={routes.home} aria-label={`${site.name} 홈`}>
          <LogoSlot />
        </Link>
        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="lt-nav flex gap-[clamp(14px,2.4vw,40px)] whitespace-nowrap">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-(--landing-signal)">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap sm:gap-4">
          <Link
            href={routes.auth.login}
            className="lt-nav hidden hover:text-(--landing-signal) md:block"
          >
            로그인
          </Link>
          <Link
            href={routes.contact}
            className="lt-nav-cta shrink-0 bg-(--landing-signal) px-[0.75em] py-[0.55em] text-white transition-colors hover:bg-black"
          >
            CONTACT
          </Link>
          <MobileNav />
        </div>
      </Wrap>
    </header>
  );
}
