import Image from "next/image";
import { underlineLink } from "@/shared/sections";
import type { PortfolioCaseStudy } from "../model/case-studies";

type Props = {
  feature: PortfolioCaseStudy["features"][number];
  note?: string;
};

export function PortfolioCaseStudyFigure({ feature, note }: Props) {
  const images = [feature.image, ...(feature.additionalImages ?? [])];
  const isScreenGallery = feature.presentation === "screens";
  const isScrollable = feature.presentation === "page";

  return (
    <figure className="mt-8 lg:mt-12">
      <div
        className={
          isScreenGallery
            ? "grid gap-6 bg-neutral-50 p-5 sm:grid-cols-2 sm:gap-8 sm:p-10 lg:gap-12"
            : "space-y-6"
        }
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            role={isScrollable ? "region" : undefined}
            aria-label={isScrollable ? `${feature.caption} · ${index + 1}번 화면` : undefined}
            tabIndex={isScrollable ? 0 : undefined}
            className={
              isScrollable
                ? "max-h-[32rem] overflow-y-auto overscroll-y-contain border border-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:max-h-[42rem]"
                : isScreenGallery
                  ? "mx-auto w-full max-w-80 self-start"
                  : undefined
            }
          >
            <Image
              {...image}
              alt={image.alt}
              sizes={
                isScreenGallery
                  ? "(min-width: 640px) 320px, (min-width: 375px) 295px, 100vw"
                  : "(min-width: 1088px) 1008px, 100vw"
              }
              className={`h-auto w-full${isScrollable ? "" : "border border-neutral-200"}`}
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 text-sm text-neutral-500">
        <span>
          {feature.caption}
          {note && ` · ${note}`}
          {isScrollable && " · 스크롤해 전체 화면을 확인할 수 있습니다."}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {images.map((image, index) => (
            <a
              key={image.src}
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${feature.caption} ${index + 1}번 원본 크게 보기`}
              className={`text-neutral-700 ${underlineLink}`}
            >
              {images.length > 1 ? `${index + 1}번 화면 크게 보기` : "화면 크게 보기"}
            </a>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
