import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

export function SubpageNavigation({
  label,
  items,
  current,
  className,
}: {
  label: string;
  items: readonly { href: Route; label: string }[];
  current?: Route;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn("text-base md:self-end md:justify-self-end md:text-right", className)}
    >
      <p className="mb-1 font-semibold text-black">{label}</p>
      <ul className="flex items-center gap-x-3 sm:gap-x-4 md:justify-end">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current === item.href ? "page" : undefined}
              className="inline-flex min-h-8 items-center font-medium whitespace-nowrap text-neutral-700 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=page]:font-semibold aria-[current=page]:text-black aria-[current=page]:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
