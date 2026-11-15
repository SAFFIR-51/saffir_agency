import type { Route } from "next";
import Link from "next/link";
import { installedSolutionRows } from "@/content/company";
import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import {
  BlackCards,
  ButtonLabel,
  FaqList,
  NumberedPanels,
  SheetTable,
  SpecStrip,
  SubpageClosing,
  SubpageHero,
  SubpageSection,
  lightButton,
  underlineLink,
} from "@/shared/sections";
import {
  aiChatbotContent,
  connectContent,
  erpContent,
  solutionsLandingContent as c,
  solutionsOverviewContent as o,
} from "../model/content";

const solutions = [connectContent, erpContent, aiChatbotContent];
const shortName = (name: string) => name.replace(/^사피어\s/, "");

/** 비즈니스 솔루션 소개: /hospital과 같은 세부 페이지 구성 */
export function SolutionsLanding() {
  const faq = [
    ...faqForService("connect"),
    ...faqForService("erp"),
    ...faqForService("ai-chatbot"),
  ].filter((item, i, all) => all.findIndex((x) => x.q === item.q) === i);
  const cases = solutions.flatMap((s) =>
    s.cases.flatMap((k) =>
      k.href ? [{ name: k.title, tag: shortName(s.name), href: k.href }] : [],
    ),
  );

  return (
    <div className="bg-white pb-16 text-black">
      <SubpageHero
        tagline={c.hero.tagline}
        lead={o.lead}
        title={c.hero.title}
        srTitle={o.title}
        buttons={{
          secondary: { href: `${routes.pricing}#solutions` as Route, label: c.hero.secondary },
          primary: { href: routes.contact as Route, label: c.hero.primary },
        }}
      />

      <SubpageSection id="solutions-problems" en={c.problems.title} sub={c.problems.sub}>
        <SheetTable
          caption="문제별 솔루션과 시작 방법"
          columns={c.problems.columns}
          widths={["w-[40%]", "w-[30%]"]}
          rows={solutions.map((s) => [
            s.problems[0],
            <Link key={s.path} href={s.path} className={underlineLink}>
              {shortName(s.name)}
            </Link>,
            <Link key={s.cta.label} href={s.cta.href} className={underlineLink}>
              {s.cta.label}
            </Link>,
          ])}
        />
      </SubpageSection>

      <SubpageSection id="solutions-list" en={c.solutions.title} sub={c.solutions.sub}>
        <NumberedPanels
          panels={solutions.map((s) => ({
            name: shortName(s.name),
            title: s.message,
            note: s.features.join(" · "),
            link: { href: s.path, label: `${shortName(s.name)} 보기` },
            cells: s.process.map((p) => ({ title: p.step, detail: p.detail })),
          }))}
        />
      </SubpageSection>

      <SubpageSection id="solutions-delivery" en={c.delivery.title} sub={c.delivery.sub}>
        <SpecStrip items={installedSolutionRows.map((r) => ({ name: r.item, detail: r.detail }))} />
      </SubpageSection>

      {cases.length > 0 && (
        <SubpageSection id="solutions-cases" en={c.cases.title} sub={c.cases.sub}>
          <BlackCards cards={cases} />
        </SubpageSection>
      )}

      {faq.length > 0 && (
        <SubpageSection
          id="solutions-faq"
          en={c.faq.title}
          sub={c.faq.sub}
          action={
            <Link href={routes.faq as Route} className={lightButton}>
              <ButtonLabel>{c.faq.more}</ButtonLabel>
            </Link>
          }
        >
          <FaqList items={faq} />
        </SubpageSection>
      )}

      <SubpageClosing
        title={o.closing.title}
        description={o.closing.description}
        buttons={{
          secondary: { href: `${routes.pricing}#solutions` as Route, label: c.hero.secondary },
          primary: { href: routes.contact as Route, label: c.hero.primary },
        }}
      />
    </div>
  );
}
