import { businessModels } from "@/content/company";
import { cn } from "@/shared/lib";
import { homeContent } from "../model/content";
import { pretendard } from "../model/pretendard";

export function DeliveryModels() {
  const { title, note } = homeContent.models;

  return (
    <section aria-labelledby="home-delivery-title" className={cn(pretendard.className, "mt-60")}>
      <header className="border-b border-foreground/25 px-5 py-4 md:px-11 md:pt-0 md:pb-4">
        <h2
          id="home-delivery-title"
          lang="en"
          className="text-3xl leading-none font-bold tracking-[-0.04rem] text-home-hero-title md:text-[2.5625rem]"
        >
          {title}
        </h2>
      </header>

      <div className="border-b border-foreground/25 md:grid md:grid-cols-[20%_1fr]">
        <div aria-hidden="true" className="hidden border-r border-foreground/25 md:block" />
        <ul
          role="list"
          className="grid divide-y divide-foreground/25 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {businessModels.map(({ type, products, delivery, revenue }) => (
            <li key={type} className="flex flex-col px-5 py-7 lg:px-8 lg:py-10">
              <h3 className="text-xl leading-tight font-bold tracking-tight text-home-hero-title lg:text-2xl">
                {type}
              </h3>
              <p className="mt-3 text-base leading-snug font-medium text-home-hero-copy lg:text-lg">
                {delivery}
              </p>
              <dl className="mt-6 grid gap-4 text-sm leading-relaxed text-home-hero-copy">
                <div className="border-t border-foreground/20 pt-3">
                  <dt className="font-semibold">대표 상품</dt>
                  <dd className="mt-1">{products}</dd>
                </div>
                <div className="border-t border-foreground/20 pt-3">
                  <dt className="font-semibold">요금 방식</dt>
                  <dd className="mt-1">{revenue}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-5 pt-4 text-sm text-home-hero-copy md:ml-[20%] lg:px-8">{note}</p>
    </section>
  );
}
