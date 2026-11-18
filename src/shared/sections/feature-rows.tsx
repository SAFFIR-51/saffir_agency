import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib";
import { sectionSub, sectionTitle, subpagePad } from "./subpage";

const layouts = {
  standard: {
    width: "max-w-[21.5rem] md:max-w-[46rem]",
    sizes: "(min-width: 768px) 312px, (min-width: 384px) 344px, calc(100vw - 40px)",
  },
  medium: {
    width: "max-w-md md:max-w-[59.5rem]",
    sizes:
      "(min-width: 1048px) 407px, (min-width: 1024px) calc(44vw - 48px), (min-width: 768px) calc(44vw - 30px), (min-width: 488px) 448px, calc(100vw - 40px)",
  },
  wide: {
    width: "max-w-md md:max-w-none",
    sizes:
      "(min-width: 1088px) 431px, (min-width: 1024px) calc(44vw - 48px), (min-width: 768px) calc(44vw - 30px), (min-width: 488px) 448px, calc(100vw - 40px)",
  },
};

export type FeatureLayout = keyof typeof layouts;

export type FeatureRow = {
  title: string;
  label?: string;
  visual?: ReactNode;
  photo?: string;
  photoAlt?: string;
  photoClassName?: string;
  photoFrameClassName?: string;
  photoUnoptimized?: boolean;
  description?: string;
  points?: readonly string[];
};

export function FeatureRows({
  id,
  items,
  lead,
  note,
  layout = "standard",
}: {
  id?: string;
  items: readonly FeatureRow[];
  lead?: string;
  note?: string;
  layout?: FeatureLayout;
}) {
  return (
    <section
      id={id}
      aria-labelledby="features"
      className={`mt-[var(--section-gap,3.5rem)] lg:mt-[var(--section-gap,4rem)] ${subpagePad}`}
    >
      <h2 id="features" className={sectionTitle}>
        Features
      </h2>
      {lead && <p className={sectionSub}>{lead}</p>}
      <ul className="mt-[var(--section-content-gap,1.5rem)] grid gap-10 lg:mt-[var(--section-content-gap,2rem)] lg:gap-12">
        {items.map(
          ({
            title,
            label,
            visual,
            photo,
            photoAlt,
            photoClassName,
            photoFrameClassName,
            photoUnoptimized,
            description,
            points,
          }) => (
            <li
              key={title}
              className={cn(
                "grid w-full gap-5 md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] md:gap-7",
                layouts[layout].width,
              )}
            >
              {visual ? (
                <div className="min-w-0">{visual}</div>
              ) : (
                <div
                  className={cn(
                    "relative aspect-video self-start overflow-hidden bg-neutral-100 md:aspect-auto md:self-stretch",
                    photoFrameClassName ??
                      (layout !== "medium" && "md:before:block md:before:aspect-video"),
                  )}
                >
                  {photo && (
                    <Image
                      src={photo}
                      alt={photoAlt ?? ""}
                      fill
                      sizes={layouts[layout].sizes}
                      unoptimized={photoUnoptimized}
                      className={photoClassName ?? "object-cover md:max-lg:object-contain"}
                    />
                  )}
                </div>
              )}
              <div className="flex flex-col justify-between gap-5">
                <div>
                  {label && <p className="mb-2 text-sm font-semibold text-neutral-500">{label}</p>}
                  <h3 className="text-[1.375rem]/tight font-bold tracking-[-0.03em] lg:text-[1.75rem]/tight">
                    {title}
                  </h3>
                  {description && (
                    <p className="mt-2.5 text-base leading-relaxed text-neutral-600">
                      {description}
                    </p>
                  )}
                </div>
                {!!points?.length && (
                  <ul className="divide-y divide-neutral-200 border-y border-neutral-200 text-base font-medium">
                    {points.map((point) => (
                      <li key={point} className="py-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ),
        )}
      </ul>
      {note && <p className="mt-5 text-sm text-neutral-600">{note}</p>}
    </section>
  );
}
