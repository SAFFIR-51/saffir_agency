import type { Route } from "next";
import Link from "next/link";
import { serviceGraph, JsonLd } from "@/shared/seo";
import { ButtonLink, Container, PageHeader, Reveal, Section, WireBox } from "@/shared/ui";

/**
 * 기획서: 모든 솔루션 페이지는 같은 순서를 따른다.
 * 해결하는 문제 → 주요 기능 → 화면·데모 → 도입 사례 → 요금 → 도입 절차 → FAQ → 신청 버튼
 * 페이지마다 다른 것은 신청 버튼(cta)이다. 기획 확인용 섹터 이름(S1~S9)은 숨겨 둔다.
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
  /** 이 페이지 주소. 구조화데이터(Service, 이동 경로)에 쓴다 */
  path: Route;
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

function Buttons({ content, center = false }: { content: SolutionPageContent; center?: boolean }) {
  return (
    <div className={center ? "flex flex-wrap justify-center gap-3.5" : "flex flex-wrap gap-3.5"}>
      <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
      {content.secondaryCta ? (
        <ButtonLink href={content.secondaryCta.href} variant="secondary">
          {content.secondaryCta.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

/** 카드 안 작은 번호 (01, 02 …) */
const no = (i: number) => String(i + 1).padStart(2, "0");

/**
 * 솔루션 상세 (애플 제품 페이지처럼)
 * 첫 화면(이름·한 줄·버튼·큰 화면 자리) → 문제(큰 카드) → 기능(번호 카드 격자) → 화면 미리보기
 * → 도입 사례 → 요금(카드) → 도입 절차(번호 단계) → FAQ(펼치기) → 신청(검정 구역)
 */
export function SolutionTemplate({
  content,
  slots = {},
}: {
  content: SolutionPageContent;
  slots?: Slots;
}) {
  const c = content;
  const [heroScreen, ...otherScreens] = c.screens;
  return (
    <>
      <JsonLd data={serviceGraph({ path: c.path, name: c.name, description: c.message })} />
      <PageHeader eyebrow={c.eyebrow} title={c.name} lead={c.message}>
        <Buttons content={c} center />
        {heroScreen ? (
          <WireBox
            label={heroScreen}
            size="fit"
            className="mt-14 aspect-[16/9] rounded-[28px]! sm:mt-16"
          />
        ) : null}
      </PageHeader>

      {/* 문제: 큰 글씨 카드 */}
      <Section {...sector(0)}>
        <ul className="grid gap-5 md:grid-cols-2">
          {c.problems.map((p, i) => (
            <li
              key={p}
              className="rounded-[28px] bg-background p-8 sm:p-10 [section:nth-of-type(odd)_&]:bg-surface"
            >
              <p className="text-sm font-semibold text-muted">{no(i)}</p>
              <p className="mt-3 text-[21px] leading-snug font-semibold tracking-tight sm:text-[24px]">
                {p}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 기능: 번호 카드 격자 */}
      <Section {...sector(1)}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => (
            <li
              key={f}
              className="flex flex-col rounded-[28px] bg-surface p-8 [section:nth-of-type(even)_&]:bg-background"
            >
              <p className="text-gradient text-[40px] leading-none font-semibold tracking-tight">
                {no(i)}
              </p>
              <p className="mt-6 text-[19px] leading-snug font-semibold">{f}</p>
            </li>
          ))}
        </ul>
        {slots.afterFeatures}
      </Section>

      <Section {...sector(2)}>
        {slots.screens}
        {otherScreens.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {otherScreens.map((screen) => (
              <WireBox
                key={screen}
                label={screen}
                size="fit"
                className="aspect-[4/3] rounded-[28px]!"
              />
            ))}
          </div>
        ) : null}
        {!slots.screens && otherScreens.length === 0 ? (
          <WireBox label="화면 미리보기" size="fit" className="aspect-[16/9] rounded-[28px]!" />
        ) : null}
      </Section>

      {/* 도입 사례: 포트폴리오 카드 */}
      <Section {...sector(3)}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.cases.map((item) => {
            const body = (
              <>
                <WireBox
                  label={`${item.title} 화면`}
                  size="fit"
                  className="aspect-[4/3] rounded-none! bg-divider/40!"
                />
                <div className="p-6">
                  <p className="text-[21px] font-semibold tracking-tight">{item.title}</p>
                  {item.href ? (
                    <p aria-hidden className="mt-3 text-link group-hover:underline">
                      사례 보기 ›
                    </p>
                  ) : null}
                </div>
              </>
            );
            const box =
              "group block h-full overflow-hidden rounded-[28px] bg-surface [section:nth-of-type(even)_&]:bg-background";
            return (
              <li key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${box} transition duration-300 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgb(0_0_0/0.10)]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={box}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section {...sector(4)} description="금액은 VAT 포함입니다.">
        {slots.pricing}
      </Section>

      {/* 도입 절차: 번호 단계 */}
      <Section {...sector(5)}>
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {c.process.map((p, i) => (
            <li key={p.step} className="border-t-2 border-foreground pt-5">
              <p className="text-[32px] leading-none font-semibold tracking-tight text-brand">
                {i + 1}
              </p>
              <p className="mt-4 text-[19px] font-semibold">{p.step}</p>
              <p className="mt-2 leading-relaxed text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
        {slots.afterProcess}
      </Section>

      {/* FAQ: 펼치기 */}
      <Section {...sector(6)}>
        {c.faq.length > 0 ? (
          <div className="divide-y divide-divider border-y border-divider">
            {c.faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-semibold sm:text-[21px]">
                  {f.q}
                  <span
                    aria-hidden
                    className="text-2xl font-light text-muted transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 text-[17px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        ) : (
          <WireBox label="질문과 답변 목록" />
        )}
      </Section>

      {/* 신청: 검정 구역 */}
      <section aria-labelledby="solution-cta" className="bg-black! py-24 text-white sm:py-32">
        <Container className="text-center">
          <Reveal>
            <h2
              id="solution-cta"
              className="text-[36px] leading-[1.1] font-semibold tracking-tight sm:text-[64px] sm:leading-[1.05]"
            >
              {SOLUTION_SECTION_ORDER[7].title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[19px] text-white/60 sm:text-[21px]">
              {c.name} · {c.message}
            </p>
            <div className="mt-10">
              <Buttons content={c} center />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
