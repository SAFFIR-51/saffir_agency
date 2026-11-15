"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isPortalMenuVisible, portalNav, routes, type MemberKind } from "@/shared/config";
import { cn } from "@/shared/lib";

/**
 * 가입한 서비스에 맞는 메뉴만 보여 준다 (기획서: 포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨진다).
 * kinds는 로그인 세션에서 온다. 지금 보고 있는 메뉴는 검게 채운다.
 */
export function PortalSidebar({
  kinds = ["member", "subscriber", "project", "solution"],
  counts = {},
}: {
  kinds?: readonly MemberKind[];
  counts?: Partial<Record<string, number>>;
}) {
  const pathname = usePathname();
  return (
    <nav aria-label="포털 메뉴">
      <ul className="flex gap-1 overflow-x-auto md:flex-col">
        {portalNav
          .filter((item) => isPortalMenuVisible(item, kinds))
          .map((item) => {
            const active =
              item.href === routes.portal.home
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-10 items-center rounded-lg px-3 text-[0.9375rem] font-semibold whitespace-nowrap",
                    active
                      ? "bg-black text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-black",
                  )}
                >
                  <span className="flex-1">{item.label}</span>
                  {counts[item.href] ? (
                    <span
                      className={cn(
                        "ml-3 min-w-6 rounded-full px-1.5 text-center text-xs font-semibold tabular-nums",
                        active ? "bg-white text-black" : "bg-neutral-200 text-neutral-700",
                      )}
                    >
                      {counts[item.href]}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
