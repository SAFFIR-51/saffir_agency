import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

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
      className="group block rounded-[18px] bg-surface p-7 transition hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [section:nth-of-type(even)_&]:bg-background"
    >
      <p className="text-xl font-semibold tracking-tight">{title}</p>
      {description ? <p className="mt-2 leading-relaxed text-muted">{description}</p> : null}
      {children ? <div className="mt-4 text-sm leading-relaxed text-muted">{children}</div> : null}
      <p aria-hidden className="mt-5 text-link group-hover:underline">
        자세히 보기 ›
      </p>
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
        "grid gap-5",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
