import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

/** 눌러서 이동하는 카드. 테두리가 진해지고 화살표가 움직인다 */
export function LinkCard({
  href,
  title,
  description,
  children,
}: {
  href: Route;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-[17px] font-semibold text-foreground">{title}</span>
        <span
          aria-hidden
          className="mt-0.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        >
          →
        </span>
      </span>
      {description ? (
        <span className="mt-2 block text-sm leading-relaxed text-muted">{description}</span>
      ) : null}
      {children ? <span className="mt-4 block text-sm text-muted">{children}</span> : null}
    </Link>
  );
}

export function CardGrid({
  columns = 3,
  children,
}: {
  columns?: 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
