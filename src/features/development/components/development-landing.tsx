import type { Route } from "next";
import Link from "next/link";
import { modules, projectStages } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { outsourcingDeposits } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  BlackCards,
  ButtonLabel,
  SheetTable,
  SpecStrip,
  SubpageClosing,
  SubpageHero,
  SubpageSection,
  lightButton,
  underlineLink,
} from "@/shared/sections";
import {
  developmentContent as o,
  developmentLandingContent as c,
  processContent,
} from "../model/content";

/** 맞춤 개발 소개: /hospital과 같은 세부 페이지 구성 */
export function DevelopmentLanding() {
  const buttons = {
    secondary: { href: routes.development.process as Route, label: c.hero.secondary },
    primary: { href: routes.development.estimate as Route, label: c.hero.primary },
  };
  return (
    <div className="bg-white pb-16 text-black">
      <SubpageHero
        tagline={c.hero.tagline}
        lead={o.lead}
        title={c.hero.title}
        srTitle={o.title}
        buttons={buttons}
      />

      <SubpageSection id="development-areas" en={c.areas.title} sub={c.areas.sub}>
        <SheetTable
          caption="개발 분야와 관련 프로젝트"
          columns={c.areas.columns}
          widths={["w-[20%]"]}
          rows={o.areas.map((area) => [
            area.name,
            <span key={area.name} className="flex flex-wrap gap-x-4 gap-y-1">
              {area.slugs
                .map((slug) => portfolioItems.find((item) => item.slug === slug))
                .filter((item) => item !== undefined)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={routes.portfolioDetail(item.slug)}
                    className={underlineLink}
                  >
                    {item.title}
                  </Link>
                ))}
            </span>,
          ])}
        />
      </SubpageSection>

      <SubpageSection id="development-modules" en={c.modules.title} sub={c.modules.sub}>
        <BlackCards cards={modules.map((name) => ({ name }))} columns={3} />
      </SubpageSection>

      <SubpageSection
        id="development-process"
        en={c.process.title}
        sub={c.process.sub}
        action={
          <Link href={routes.development.process as Route} className={lightButton}>
            <ButtonLabel>{c.process.more}</ButtonLabel>
          </Link>
        }
      >
        <SpecStrip
          numbered
          items={projectStages.map((st) => ({ name: st.stage, detail: st.detail }))}
        />
      </SubpageSection>

      <SubpageSection id="development-pricing" en={c.pricing.title} sub={c.pricing.sub}>
        <SheetTable
          caption="정찰가 패키지"
          columns={c.pricing.columns}
          widths={["w-[30%]", undefined, "w-[20%]", "w-[16%]"]}
          rows={[
            ...outsourcingDeposits.map((p) => [
              p.name,
              p.includes,
              p.setup != null ? formatKRW(p.setup) : "",
              <Link key={p.id} href={routes.order(p.id)} className={underlineLink}>
                {c.pricing.order}
              </Link>,
            ]),
            [
              c.pricing.custom.name,
              c.pricing.custom.includes,
              <span key="price" className="text-neutral-600">
                {c.pricing.custom.price}
              </span>,
              <span key="cta" className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href={routes.development.estimate as Route} className={underlineLink}>
                  {c.pricing.custom.estimate}
                </Link>
                <Link href={routes.contactFor("development-estimate")} className={underlineLink}>
                  {c.pricing.custom.contact}
                </Link>
              </span>,
            ],
          ]}
        />
        <div className="mt-14">
          <SpecStrip
            items={processContent.contract.map((r) => ({ name: r.item, detail: r.detail }))}
          />
        </div>
      </SubpageSection>

      <SubpageClosing
        title={c.closing.title}
        description={c.closing.description}
        buttons={buttons}
      />
    </div>
  );
}
