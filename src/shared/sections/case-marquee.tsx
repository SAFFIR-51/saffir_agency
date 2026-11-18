import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

type Case = { title: string; href?: Route; image?: string };
type CaseMarqueeProps = { items?: readonly Case[]; id?: string; placeholderCount?: number };

const tileWidth = "w-[clamp(17.5rem,42vw,30rem)] shrink-0";
const tileSurface = "relative block aspect-[4/3] overflow-hidden bg-neutral-100";

export function CaseMarquee({ items = [], id, placeholderCount = 0 }: CaseMarqueeProps) {
  const renderRow = (repeat = false) => (
    <ul
      aria-hidden={repeat || undefined}
      className={
        repeat
          ? "flex shrink-0 group-has-[:focus-visible]:hidden motion-reduce:hidden"
          : "flex shrink-0"
      }
    >
      {items.map(({ title, href, image }) => {
        const photo = image && (
          <Image
            src={image}
            alt={href || repeat ? "" : title}
            fill
            sizes="(min-width: 1143px) 480px, (min-width: 667px) 42vw, 280px"
            className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/case:scale-[1.03]"
          />
        );

        return (
          <li key={href ?? title} className={tileWidth}>
            {href ? (
              <Link
                href={href}
                aria-label={title}
                tabIndex={repeat ? -1 : undefined}
                className={`group/case ${tileSurface} focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2`}
              >
                {photo}
              </Link>
            ) : (
              <div className={tileSurface}>{photo}</div>
            )}
          </li>
        );
      })}
      {Array.from({ length: placeholderCount }, (_, index) => (
        <li
          key={index}
          aria-hidden="true"
          className={`${tileWidth} aspect-[4/3] border-r border-white bg-neutral-100`}
        />
      ))}
    </ul>
  );

  return (
    <div
      id={id}
      aria-hidden={items.length === 0 || undefined}
      className="group scroll-mt-24 overflow-hidden has-[:focus-visible]:overflow-x-auto motion-reduce:overflow-x-auto"
    >
      <div className="portfolio-marquee-track flex w-max group-hover:[animation-play-state:paused] motion-safe:group-has-[:focus-visible]:animate-none">
        {renderRow()}
        {renderRow(true)}
      </div>
    </div>
  );
}
