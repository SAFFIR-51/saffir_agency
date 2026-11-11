import Link from "next/link";
import { routes, site } from "@/shared/config";
import { PortalSidebar } from "@/shared/layout";

/**
 * 고객 포털: 사이드바 레이아웃. 로그인 확인은 src/proxy.ts(1차)와
 * 각 화면의 데이터 조회(server/auth, 2차)에서 합니다.
 */
export default function PortalLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex flex-1">
      <aside className="hidden w-60 shrink-0 border-r border-foreground/10 p-4 md:block">
        <Link href={routes.home} className="mb-6 block px-3 text-lg font-bold">
          {site.name}
        </Link>
        <PortalSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
