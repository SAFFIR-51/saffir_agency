"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isPortalMenuVisible, portalNav, routes, type MemberKind } from "@/shared/config";

/**
 * 가입한 서비스에 맞는 메뉴만 보여 준다 (기획서: 포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨진다).
 * kinds는 로그인 세션에서 온다. 지금 있는 메뉴는 파란 바탕 (NHN Cloud 콘솔 왼쪽 메뉴처럼).
 */
export function PortalSidebar({
  kinds = ["member", "subscriber", "project", "solution"],
}: {
  kinds?: readonly MemberKind[];
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === routes.portal.home
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav aria-label="포털 메뉴" className="flex flex-wrap gap-1 md:flex-col">
      {portalNav
        .filter((item) => isPortalMenuVisible(item, kinds))
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className="rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-[#51565f] hover:bg-[#f3f4f6] hover:text-[#111] aria-[current=page]:bg-[#eef3ff] aria-[current=page]:font-semibold aria-[current=page]:text-[#125de6]"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
}
