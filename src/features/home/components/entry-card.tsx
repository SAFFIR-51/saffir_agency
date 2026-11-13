import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { pretendard } from "../model/pretendard";

const linkClassName =
  "inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function EntryCard({
  title,
  headline,
  image,
  href,
  description,
  items,
  start,
  moreLabel,
}: {
  title: string;
  headline: readonly [string, string];
  image: string;
  href: Route;
  description: string;
  items: readonly string[];
  start: { label: string; href: Route };
  moreLabel: string;
}) {
  return (
    <article
      className={cn(
        pretendard.className,
        "relative isolate flex min-h-[28rem] items-center justify-end overflow-hidden bg-neutral-950 px-5 py-12 text-right text-white md:min-h-[clamp(30rem,36vw,40rem)] md:px-11 md:py-14",
      )}
    >
      {/* 스크롤 등장 효과: 사진은 아래에서 위로 걷히며 드러난다 (service-cards.tsx) */}
      <div data-reveal-media aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-l from-black/60 via-black/35 to-transparent md:from-black/70 md:via-black/30"
      />

      <div data-service-card-content className="max-w-full min-w-0">
        <h2
          data-reveal-item
          lang="en"
          className="text-[clamp(2.125rem,9vw,4.25rem)] leading-[1.08] font-bold tracking-[-0.035em] md:text-[clamp(3.25rem,6.875vw,6.5rem)]"
        >
          {headline[0]}
          <br />
          {headline[1]}
        </h2>

        <p
          data-reveal-item
          className="mt-5 text-xl leading-snug font-medium break-keep md:text-3xl"
        >
          {description}
        </p>

        <ul
          data-reveal-item
          role="list"
          className="mt-7 text-base leading-snug font-medium md:text-xl"
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div
          data-reveal-item
          className="mt-8 flex flex-wrap justify-end gap-x-6 border-t border-white/40 pt-2 text-base md:ml-auto md:w-full md:max-w-lg md:text-lg"
        >
          <Link href={start.href} className={linkClassName}>
            {start.label}
          </Link>
          <Link href={href} aria-label={`${title} ${moreLabel}`} className={linkClassName}>
            {moreLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
