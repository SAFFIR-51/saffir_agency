"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";

const items: { label: string; href: Route; exact?: boolean }[] = [
  { label: "대시보드", href: routes.admin.home, exact: true },
  { label: "프로젝트", href: routes.admin.projects },
  { label: "요청함", href: routes.admin.requests },
  { label: "고객사", href: routes.admin.clients },
  { label: "팀", href: routes.admin.team },
];

export function AdminNav({ counts = {} }: { counts?: Partial<Record<string, number>> }) {
  const pathname = usePathname();
  return (
    <nav aria-label="어드민 메뉴">
      <ul className="flex gap-1 md:flex-col">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center rounded-lg px-3 text-[0.9375rem] font-semibold",
                  active
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black",
                )}
              >
                <span className="flex-1">{item.label}</span>
                {counts[item.href] ? (
                  <span
                    className={cn(
                      "min-w-6 rounded-full px-1.5 text-center text-xs font-semibold tabular-nums",
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
