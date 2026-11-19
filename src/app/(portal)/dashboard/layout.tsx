import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortalSessionNav } from "@/features/auth";
import type { Metadata } from "next";
import { routes, site } from "@/shared/config";
import { noIndex } from "@/shared/seo";

/** 고객 포털은 검색에 나오지 않게 */
export const metadata: Metadata = { robots: noIndex };

/**
 * 고객 포털: 왼쪽 메뉴 + 본문 (흰 배경 고정). 로그인 확인은 src/proxy.ts(1차)와
 * 각 화면의 데이터 조회(server/portal requirePortal, 2차)에서 합니다.
 */
export default function PortalLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="site-cursor flex min-h-dvh flex-1 flex-col bg-white text-black [--background:#ffffff] [--foreground:#171717] md:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-neutral-200 p-4 md:sticky md:top-0 md:h-dvh md:w-60 md:border-r md:border-b-0 md:p-5">
        <Link
          href={routes.portal.home}
          className="flex items-center gap-2"
          aria-label={`${site.name} 포털 홈`}
        >
          <Image
            src="/brand/saffir-logo.png"
            alt=""
            width={1007}
            height={224}
            className="h-auto w-24"
          />
          <span className="rounded-full border border-black px-2 py-0.5 text-[0.6875rem] font-bold">
            고객 포털
          </span>
        </Link>
        <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-lg bg-neutral-50" />}>
          <PortalSessionNav />
        </Suspense>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
