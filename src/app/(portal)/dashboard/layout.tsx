import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortalSessionNav } from "@/features/auth";
import { routes, site } from "@/shared/config";

/**
 * 고객 포털 (NHN Cloud 콘솔처럼): 위 흰 줄(로고) + 왼쪽 흰 메뉴 + 회색 바탕 위 흰 카드.
 * 로그인 확인은 src/proxy.ts(1차)와 각 화면의 데이터 조회(server/portal requirePortal, 2차)에서 합니다.
 */
export default function PortalLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="nc nc-portal flex min-h-full flex-1 flex-col bg-[#f8f9fa]">
      <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e5eb] bg-white px-5 md:px-6">
        <div className="flex items-center gap-3">
          <Link href={routes.home} aria-label={site.name} className="flex">
            <Image
              src="/brand/saffir-logo.png"
              alt=""
              width={1007}
              height={224}
              className="h-5 w-auto"
            />
          </Link>
          <span className="rounded bg-[#eef3ff] px-2 py-0.5 text-[12px] font-semibold text-[#125de6]">
            고객 포털
          </span>
        </div>
        <Link href={routes.home} className="text-[14px] text-[#51565f] hover:text-[#111]">
          사이트로 가기
        </Link>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="shrink-0 border-b border-[#e2e5eb] bg-white p-4 md:w-60 md:border-r md:border-b-0 md:py-6">
          <Suspense fallback={<p className="px-3 text-sm text-[#9499a2]">불러오는 중…</p>}>
            <PortalSessionNav />
          </Suspense>
        </aside>
        <main className="nc-portal-main min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
