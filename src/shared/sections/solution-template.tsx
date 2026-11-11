import type { Route } from "next";
import Link from "next/link";
import { BulletList, ButtonLink, DataTable, PageHeader, Section, WireBox } from "@/shared/ui";

/**
 * 기획서: 모든 솔루션 페이지는 같은 순서를 따른다.
 * 해결하는 문제 → 주요 기능 → 화면·데모 → 도입 사례 → 요금 → 도입 절차 → FAQ → 신청 버튼
 * 페이지마다 다른 것은 신청 버튼(cta)이다. 화면에는 S1 히어로 + 위 8개 = S1~S9 섹터로 보인다.
 */
export const SOLUTION_SECTION_ORDER = [
  { label: "문제", title: "이런 상황이라면" },
  { label: "기능", title: "주요 기능" },
  { label: "화면", title: "화면 미리보기" },
  { label: "사례", title: "도입 사례" },
  { label: "요금", title: "요금" },
  { label: "절차", title: "도입 절차" },
  { label: "FAQ", title: "자주 묻는 질문" },
  { label: "신청", title: "지금 시작하세요" },
] as const;

export type SolutionPageContent = {
  /** 상단 작은 글씨: 병원 솔루션 / 비즈니스 솔루션 */
  eyebrow: string;
  name: string;
  message: string;
  problems: string[];
  features: string[];
  /** 화면 미리보기 자리 이름 (예: 대시보드 화면) */
  screens: string[];
  cases: { title: string; href?: Route }[];
  process: { step: string; detail: string }[];
  faq: { q: string; a: string }[];
  cta: { label: string; href: Route };
  secondaryCta?: { label: string; href: Route };
};

/** 섹터마다 화면 전용 내용을 끼워 넣는 자리 (요금표, 입력창, 보안 설명 등) */
type Slots = {
  afterFeatures?: React.ReactNode;
  screens?: React.ReactNode;
  pricing?: React.ReactNode;
  afterProcess?: React.ReactNode;
};

const sector = (index: number) => {
  const s = SOLUTION_SECTION_ORDER[index];
  return { label: `S${index + 2} · ${s.label}`, title: s.title };
};

function Buttons({ content }: { content: SolutionPageContent }) {
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
      {content.secondaryCta ? (
        <ButtonLink href={content.secondaryCta.href} variant="secondary">
          {content.secondaryCta.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

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
        <Buttons content={c} />
      </PageHeader>

      <Section {...sector(0)}>
        <BulletList items={c.problems} />
      </Section>

      <Section {...sector(1)}>
        <BulletList items={c.features} />
        {slots.afterFeatures}
      </Section>

      <Section {...sector(2)}>
        {slots.screens}
        {c.screens.map((screen) => (
          <WireBox key={screen} label={screen} size="lg" />
        ))}
      </Section>

      <Section {...sector(3)}>
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
      </Section>

      <Section {...sector(4)} description="금액은 VAT 포함입니다.">
        {slots.pricing}
      </Section>

      <Section {...sector(5)}>
        <DataTable
          columns={["단계", "내용"]}
          rows={c.process.map((p, index) => [`${index + 1}. ${p.step}`, p.detail])}
        />
        {slots.afterProcess}
      </Section>

      <Section {...sector(6)}>
        {c.faq.length > 0 ? (
          <DataTable columns={["질문", "답변"]} rows={c.faq.map((f) => [f.q, f.a])} />
        ) : (
          <WireBox label="질문과 답변 목록" />
        )}
      </Section>

      <Section {...sector(7)}>
        <Buttons content={c} />
      </Section>
    </>
  );
}
