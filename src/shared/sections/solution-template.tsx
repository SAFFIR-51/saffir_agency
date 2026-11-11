import type { Route } from "next";
import Link from "next/link";
import { BulletList, ButtonLink, PageHeader, Section, Todo } from "@/shared/ui";

/**
 * 기획서: 모든 솔루션 페이지는 같은 순서를 따른다.
 * 해결하는 문제 → 주요 기능 → 화면·데모 → 도입 사례 → 요금 → 도입 절차 → FAQ → 신청 버튼
 * 페이지마다 다른 것은 "다음 행동" 버튼(cta)이다.
 */
export const SOLUTION_SECTION_ORDER = [
  "해결하는 문제",
  "주요 기능",
  "화면·데모",
  "도입 사례",
  "요금",
  "도입 절차",
  "FAQ",
  "신청",
] as const;

export type SolutionPageContent = {
  /** 상단 작은 글씨: 병원 솔루션 / 비즈니스 솔루션 */
  eyebrow: string;
  name: string;
  message: string;
  problems: string[];
  features: string[];
  demo: string[];
  cases: { title: string; href?: Route }[];
  pricingNotes: string[];
  process: string[];
  faq: { q: string; a: string }[];
  cta: { label: string; href: Route };
  secondaryCta?: { label: string; href: Route };
};

/** 섹션마다 화면 전용 내용을 끼워 넣는 자리 (요금표, 입력창 자리, 보안 설명 등) */
type Slots = {
  afterFeatures?: React.ReactNode;
  demo?: React.ReactNode;
  pricing?: React.ReactNode;
  afterProcess?: React.ReactNode;
};

const title = (index: number) => `${index + 1}. ${SOLUTION_SECTION_ORDER[index]}`;

export function SolutionTemplate({
  content,
  slots = {},
}: {
  content: SolutionPageContent;
  slots?: Slots;
}) {
  const c = content;
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.name} lead={c.message}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={c.cta.href}>{c.cta.label}</ButtonLink>
          {c.secondaryCta ? (
            <ButtonLink href={c.secondaryCta.href} variant="secondary">
              {c.secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </PageHeader>

      <Section title={title(0)}>
        {c.problems.length > 0 ? <BulletList items={c.problems} /> : <Todo>해결하는 문제</Todo>}
      </Section>

      <Section title={title(1)}>
        {c.features.length > 0 ? <BulletList items={c.features} /> : <Todo>주요 기능</Todo>}
        {slots.afterFeatures}
      </Section>

      <Section title={title(2)}>
        {c.demo.length > 0 ? <BulletList items={c.demo} /> : null}
        {slots.demo}
        {c.demo.length === 0 && !slots.demo ? <Todo>화면 캡처·데모</Todo> : null}
      </Section>

      <Section title={title(3)}>
        {c.cases.length > 0 ? (
          <BulletList
            items={c.cases.map((item) =>
              item.href ? (
                <Link key={item.title} href={item.href} className="underline underline-offset-4">
                  {item.title}
                </Link>
              ) : (
                item.title
              ),
            )}
          />
        ) : (
          <Todo>도입 사례</Todo>
        )}
      </Section>

      <Section title={title(4)} description="금액은 VAT 포함입니다.">
        {slots.pricing}
        {c.pricingNotes.length > 0 ? <BulletList items={c.pricingNotes} /> : null}
        {!slots.pricing && c.pricingNotes.length === 0 ? <Todo>요금</Todo> : null}
      </Section>

      <Section title={title(5)}>
        {c.process.length > 0 ? <BulletList ordered items={c.process} /> : <Todo>도입 절차</Todo>}
        {slots.afterProcess}
      </Section>

      <Section title={title(6)}>
        {c.faq.length > 0 ? (
          <dl className="space-y-4">
            {c.faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 text-foreground/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <Todo>자주 묻는 질문 (기획서 미정)</Todo>
        )}
      </Section>

      <Section title={title(7)}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={c.cta.href}>{c.cta.label}</ButtonLink>
          {c.secondaryCta ? (
            <ButtonLink href={c.secondaryCta.href} variant="secondary">
              {c.secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </Section>
    </>
  );
}
