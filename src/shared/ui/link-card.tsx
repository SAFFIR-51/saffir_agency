import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";
import "./nc-ui.css";

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
      className="nc-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#125de6]"
    >
      <p className="nc-card-title">{title}</p>
      {description ? <p className="nc-card-text">{description}</p> : null}
      {children ? <div className="nc-card-extra">{children}</div> : null}
      <svg className="nc-card-arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
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
