import type { ReactNode } from "react";
import { modules, workflow } from "@/content/company";
import { geoPlans, outsourcingDeposits, solutionPlans } from "@/content/pricing";
import { listServices, serviceLines } from "@/content/services";
import { routes } from "@/shared/config";
import { cn, formatKRW } from "@/shared/lib";
import { ButtonLink } from "@/shared/ui";
import { homeContent as c } from "../model/content";
import { pretendard } from "../model/pretendard";

function minPrice(values: Array<number | null | undefined>) {
  const prices = values.filter((v): v is number => typeof v === "number" && v > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-b border-foreground/25">
      <header className="border-b border-foreground/25 px-5 pb-4 md:px-11">
        <h2
          id={id}
          lang="en"
          className="text-3xl leading-none font-bold tracking-[-0.04rem] text-home-hero-title md:text-[2.5625rem]"
        >
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

const rail = "md:grid md:grid-cols-[20%_1fr]";
const intro =
  "px-5 py-5 text-base leading-snug text-home-hero-copy md:border-r md:border-foreground/25 md:px-8 md:py-8 lg:px-11";
const gridCell = "min-w-0 px-5 py-6 lg:px-8 lg:py-9";

export function HomeDetails() {
  /** 시작 가격은 세 갈래에 한 줄씩 */
  const businessIds = listServices("business").map((s) => s.id as string);
  const startingPrices = [
    {
      name: serviceLines.hospital.name,
      value: minPrice(geoPlans.map((p) => p.monthly)),
      basis: "월 구독 (AI 검색 최적화)",
    },
    {
      name: serviceLines.business.name,
      value: minPrice(solutionPlans.filter((p) => businessIds.includes(p.id)).map((p) => p.setup)),
      basis: "도입 세팅비",
    },
    {
      name: "맞춤 개발",
      value: minPrice(outsourcingDeposits.map((p) => p.setup)),
      basis: "정찰가 계약금",
    },
  ];

  return (
    <div
      className={cn(pretendard.className, "mt-20 space-y-20 pb-20 md:mt-32 md:space-y-32 md:pb-32")}
    >
      <DetailSection id="home-process-title" title={c.workflow.title}>
        <div className={rail}>
          <p className={intro}>{c.workflow.description}</p>
          <ol
            role="list"
            className="grid grid-cols-2 border-t border-foreground/25 md:border-t-0 lg:grid-cols-4"
          >
            {workflow.map(({ step, detail }, index) => (
              <li
                key={step}
                className={cn(
                  gridCell,
                  "border-foreground/25 odd:border-r nth-[n+3]:border-t lg:not-last:border-r lg:nth-[n+3]:border-t-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="text-3xl leading-none font-medium tracking-tight text-foreground/55 tabular-nums lg:text-4xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight lg:text-2xl">{step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-home-hero-copy lg:text-base">
                  {detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </DetailSection>

      <DetailSection id="home-modules-title" title={c.modules.title}>
        <div className={rail}>
          <p className={intro}>{c.modules.description}</p>
          <ul
            role="list"
            className="grid grid-cols-2 border-t border-foreground/25 md:border-t-0 lg:grid-cols-3"
          >
            {modules.map((module) => (
              <li
                key={module}
                className={cn(
                  gridCell,
                  "flex items-center border-foreground/25 text-lg font-bold tracking-tight max-lg:odd:border-r max-lg:nth-[n+3]:border-t lg:text-2xl lg:not-nth-[3n]:border-r lg:nth-[n+4]:border-t",
                )}
              >
                {module}
              </li>
            ))}
          </ul>
        </div>
      </DetailSection>

      <DetailSection id="home-pricing-title" title={c.pricing.title}>
        <div className={rail}>
          <div className={intro}>
            <p>{c.pricing.description}</p>
            <p className="mt-2 text-sm text-foreground/70">{c.pricing.taxNote}</p>
            <ButtonLink href={routes.pricing} variant="secondary" className="mt-5">
              {c.pricing.link}
            </ButtonLink>
          </div>
          <table className="w-full table-fixed border-collapse border-t border-foreground/25 text-left md:border-t-0">
            <thead className="border-b border-foreground/25">
              <tr>
                {c.pricing.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-3 py-3 text-sm font-semibold first:pl-5 last:pr-5 lg:px-8 lg:first:pl-8 lg:last:pr-8"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/25">
              {startingPrices.map(({ name, value, basis }) => (
                <tr key={name}>
                  <th scope="row" className="py-5 pr-3 pl-5 text-sm font-bold lg:px-8 lg:text-lg">
                    {name}
                  </th>
                  <td className="px-3 py-5 text-base font-bold tabular-nums lg:px-8 lg:text-2xl">
                    {value === null ? c.pricing.onRequest : `${formatKRW(value)}부터`}
                  </td>
                  <td className="py-5 pr-5 pl-3 text-sm leading-snug text-home-hero-copy lg:px-8 lg:text-base">
                    {basis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DetailSection>

      <DetailSection id="home-contact-title" title={c.closing.title}>
        <div className={rail}>
          <div aria-hidden="true" className="hidden border-r border-foreground/25 md:block" />
          <div className="px-5 py-9 md:px-8 md:py-14">
            <h3 className="max-w-3xl text-2xl leading-tight font-bold tracking-tight text-balance md:text-4xl">
              {c.closing.question}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-home-hero-copy md:text-lg">
              {c.closing.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={routes.contact}>{c.closing.primaryCta}</ButtonLink>
              <ButtonLink href={routes.development.estimate} variant="secondary">
                {c.closing.estimateCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </DetailSection>
    </div>
  );
}
