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
      className="block rounded-xl border border-foreground/15 p-5 transition hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm text-foreground/70">{description}</p> : null}
      {children ? <div className="mt-3 text-sm text-foreground/70">{children}</div> : null}
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
        "grid gap-4",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
