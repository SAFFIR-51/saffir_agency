import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

export function EntryCard({
  title,
  href,
  moreLabel,
  className,
  description,
  descriptionClassName,
  preview,
}: {
  title: string;
  href: Route;
  moreLabel: string;
  className: string;
  description: string;
  descriptionClassName?: string;
  preview: React.ReactElement;
}) {
  return (
    <article
      className={cn(
        "group/card relative isolate flex min-h-120 flex-col overflow-hidden rounded-3xl bg-cover bg-center px-6 pt-7 lg:min-h-170 lg:px-10 lg:pt-10",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col items-start gap-6 md:gap-5 lg:flex-row lg:justify-between">
        <div>
          <h2 className="text-[2rem] leading-none font-medium tracking-[-0.02em] lg:text-4xl lg:leading-none">
            {title}
          </h2>
          <p
            className={cn(
              "mt-4 text-base leading-[1.4] font-normal tracking-[-0.02em] lg:mt-6 lg:text-lg lg:leading-[1.4] lg:whitespace-pre-line",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </div>
        <Link
          href={href}
          className="relative inline-flex h-13 w-32.5 shrink-0 items-center justify-center rounded-lg bg-white text-lg leading-[22px] font-bold text-black focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="sr-only">{title} </span>
          <span className="group-focus-within/card:-translate-x-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-menu lg:group-hover/card:-translate-x-3">
            {moreLabel}
          </span>
          <svg
            aria-hidden="true"
            className="absolute right-4 size-5 translate-x-1.5 opacity-0 group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100 motion-safe:transition-[translate,opacity] motion-safe:duration-300 motion-safe:ease-menu lg:group-hover/card:translate-x-0 lg:group-hover/card:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 12h17m-7-7 7 7-7 7" />
          </svg>
        </Link>
      </div>
      {preview}
    </article>
  );
}
