import Link from "next/link";
import { routes, site } from "@/shared/config";
import { PortalSidebar } from "@/shared/layout";

/**
 * 고객 포털: 사이드바 레이아웃. 로그인 확인은 src/proxy.ts(1차)와
 * 각 화면의 데이터 조회(server/auth, 2차)에서 합니다.
 */
export default function PortalLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="shrink-0 border-b border-foreground/10 p-4 md:w-60 md:border-r md:border-b-0">
        <Link href={routes.home} className="mb-4 block px-3 text-lg font-bold">
          {site.name}
        </Link>
        <PortalSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
