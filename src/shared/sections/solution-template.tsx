import type { Route } from "next";
import Link from "next/link";
import { serviceGraph, JsonLd } from "@/shared/seo";
import {
  ButtonLink,
  GlassArt,
  IconArt,
  PageHeader,
  Section,
  WireBox,
  type GlassTone,
  type IconArtKind,
} from "@/shared/ui";
import "./solution.css";

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

/** 구역 바로가기 탭 (NHN Cloud 솔루션 페이지의 특징·연관 서비스… 줄) */
const TABS = [
  { id: "sol-problems", index: 0 },
  { id: "sol-features", index: 1 },
  { id: "sol-screens", index: 2 },
  { id: "sol-cases", index: 3 },
  { id: "sol-pricing", index: 4 },
  { id: "sol-process", index: 5 },
  { id: "sol-faq", index: 6 },
] as const;

/** 문제 카드 바탕색 (순서대로 돌려 쓴다) */
const TINTS = ["#f2f0ff", "#eef4ff", "#fff3ec", "#eef8f1"] as const;
/** 문제 카드 그림: 놓친 문의 · 떨어지는 그래프 · 시계 · 끊어진 연결 */
const PROBLEM_ART: IconArtKind[] = ["alert-chat", "chart-down", "clock", "broken-link"];

const TONES: GlassTone[] = ["blue", "violet", "teal", "graphite", "green"];

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

const no = (i: number) => String(i + 1).padStart(2, "0");

/**
 * 솔루션 상세 (NHN Cloud 솔루션 페이지 구성)
 * 검정 띠 → 구역 탭(따라옴) → 이런 상황이라면(그림 카드) → 주요 기능(서비스 카드) → 화면 미리보기
 * → 도입 사례(글 + 그림 줄) → 요금 → 도입 절차(번호 카드) → 자주 묻는 질문(Q·A) → 문의 띠
 */
export function SolutionTemplate({
  content,
  slots = {},
}: {
  content: SolutionPageContent;
  slots?: Slots;
}) {
  const c = content;
  const tone = TONES[c.name.length % TONES.length] ?? "blue";
  return (
    <>
      <JsonLd data={serviceGraph({ path: c.path, name: c.name, description: c.message })} />
      <PageHeader eyebrow={c.eyebrow} title={c.name} lead={c.message} tone={tone}>
        <Buttons content={c} />
      </PageHeader>

      <nav aria-label="이 페이지 구역" className="nc-tabs">
        <ul>
          {TABS.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`}>{SOLUTION_SECTION_ORDER[t.index].title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 이런 상황이라면: 그림 카드 */}
      <Section id="sol-problems" {...sector(0)}>
        <ul className="nc-feature-cards">
          {c.problems.map((p, i) => (
            <li key={p}>
              <div className="nc-feature-img" style={{ background: TINTS[i % TINTS.length] }}>
                <IconArt
                  kind={PROBLEM_ART[i % PROBLEM_ART.length] ?? "alert-chat"}
                  id={`problem-${i}`}
                  className="nc-problem-art"
                />
              </div>
              <p className="nc-feature-title">{p}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 주요 기능: 서비스 카드 */}
      <Section id="sol-features" {...sector(1)}>
        <ul className="nc-svc-cards">
          {c.features.map((f, i) => (
            <li key={f}>
              <span className="nc-svc-no">{no(i)}</span>
              <p>{f}</p>
            </li>
          ))}
        </ul>
        {slots.afterFeatures}
      </Section>

      <Section id="sol-screens" {...sector(2)}>
        {slots.screens}
        {c.screens.map((screen) => (
          <WireBox key={screen} label={screen} size="lg" className="min-h-[360px]" />
        ))}
      </Section>

      {/* 도입 사례: 글 + 그림 줄 (NHN Cloud "고객의 한마디" 자리) */}
      <Section id="sol-cases" {...sector(3)}>
        <ul className="nc-quotes">
          {c.cases.map((item, i) => (
            <li key={item.title}>
              <div className="nc-quote-text">
                <span className="nc-quote-mark" aria-hidden>
                  “
                </span>
                <p>
                  {item.title} 프로젝트를 사피어가 직접 설계하고 개발했습니다. 화면과 구성은
                  포트폴리오에서 볼 수 있습니다.
                </p>
                <strong>{item.title}</strong>
                {item.href ? (
                  <Link href={item.href} className="nc-quote-more">
                    사례 보기
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M2 8h11M9 4l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </Link>
                ) : null}
              </div>
              <GlassArt
                id={`case-${i}`}
                tone={TONES[(i + 1) % TONES.length] ?? "blue"}
                className="nc-quote-img"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sol-pricing" {...sector(4)} description="금액은 VAT 포함입니다.">
        {slots.pricing}
      </Section>

      {/* 도입 절차: 번호 카드 (NHN Cloud "컴플라이언스" 모양) */}
      <Section id="sol-process" {...sector(5)}>
        <ol className="nc-steps">
          {c.process.map((p, i) => (
            <li key={p.step}>
              <div>
                <span>{no(i)}</span>
                <strong>{p.step}</strong>
              </div>
              <p>{p.detail}</p>
            </li>
          ))}
        </ol>
        {slots.afterProcess}
      </Section>

      {/* 자주 묻는 질문: Q 회색 줄을 누르면 A가 열린다 */}
      <Section id="sol-faq" {...sector(6)}>
        {c.faq.length > 0 ? (
          <div className="nc-faq">
            {c.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <b>Q.</b>
                  {f.q}
                </summary>
                <div>
                  <b>A.</b>
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <WireBox label="질문과 답변 목록" />
        )}
      </Section>

      {/* 문의 띠 */}
      <section aria-labelledby="sol-cta" className="nc-cta">
        <div className="nc-w1280">
          <p className="nc-cta-label">{SOLUTION_SECTION_ORDER[7].title}</p>
          <h2 id="sol-cta">{c.name}, 지금 상담해 보세요.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={c.cta.href} className="nc-blue-btn">
              {c.cta.label}
            </Link>
            {c.secondaryCta ? (
              <ButtonLink href={c.secondaryCta.href} variant="secondary">
                {c.secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <span className="nc-cta-glass nc-cta-glass-1" aria-hidden />
        <span className="nc-cta-glass nc-cta-glass-2" aria-hidden />
      </section>
    </>
  );
}
