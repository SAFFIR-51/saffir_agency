import Link from "next/link";
import { routes } from "@/shared/config";
import { processContent } from "../model/content";

export function AiDevelopmentBanner() {
  const { title, description, points, label } = processContent.aiBanner;

  return (
    <div className="relative isolate mt-12 grid items-center gap-8 overflow-hidden bg-linear-to-r from-development-banner-start to-development-banner-end px-6 py-8 text-white sm:p-9 md:grid-cols-2 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[8%] -z-10 hidden aspect-square w-[37%] -translate-y-1/2 rounded-full bg-development-banner-glow opacity-80 blur-[2px] md:block"
      />
      <div>
        <h3 className="text-[1.625rem] leading-snug font-extrabold tracking-tight lg:text-[1.875rem]">
          {title}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/90">
          {description[0]}
          <br />
          {description[1]}
        </p>
        <ul className="mt-7 grid gap-x-5 gap-y-3 text-[0.9375rem] font-semibold sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2.5">
              <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className="size-3.5 shrink-0 text-black"
              >
                <path
                  d="m2 7.5 3.2 3L12 3.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center md:text-right">
        <p className="text-[2.125rem] leading-none font-extrabold lg:text-[2.5rem]">AI NATIVE</p>
        <p className="text-[4.5rem] leading-none font-extrabold lg:text-[5.375rem]">DEV</p>
        <Link
          href={routes.development.estimate}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/70 px-7 py-3 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-safe:transition-colors"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
