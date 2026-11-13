import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { serviceGraph, JsonLd } from "@/shared/seo";
import { ArrowIcon, ImageSlot } from "@/shared/ui";
import "./sales-page.css";

/**
 * 서비스 세부 페이지 — 노션 문서처럼: 커버 이미지, 가운데 좁은 본문, 제목·목록·콜아웃·토글.
 * 기획서 순서는 그대로: 문제 → 기능 → 화면 → 사례 → 요금 → 절차 → FAQ → 신청.
 * 갈래 첫 페이지(/hospital 등)는 메인과 같은 디자인을 쓴다.
 * 참고: 토스페이먼츠 블로그(아티클 + 중간 신청) + Linear Method(흑백, 각진 영문 라벨).
 */
export type SalesPageContent = {
  /** 구조화데이터(Service)에 쓰는 주소·이름·설명 */
  path: Route;
  name: string;
  message: string;
  /** 위 경로 표시 (병원 솔루션 등)와 그 주소 */
  parent: { label: string; href: Route };
  /** 첫 콜아웃의 굵은 한 줄 (두 줄이면 이어 붙인다) */
  headline: readonly [string, string];
  lead: string;
  /** 제목 아래 작은 태그로 보이는 핵심 3가지 */
  points: readonly string[];
  problems: readonly string[];
  features: ReadonlyArray<{ title: string; detail: string }>;
  /** 화면 미리보기 이미지 칸 설명. 첫 번째는 커버로도 쓴다 */
  screens: readonly string[];
  cases: ReadonlyArray<{ title: string; href?: Route }>;
  process: ReadonlyArray<{ step: string; detail: string }>;
  faq: ReadonlyArray<{ q: string; a: string }>;
  cta: { label: string; href: Route };
  secondaryCta?: { label: string; href: Route };
  /** 마지막 신청 콜아웃 문구 */
  closing: { title: string; text: string };
};

type Slots = {
  /** 바로 써 보는 칸 (진단 입력, 문구 검사 등). 첫 콜아웃 아래 */
  hero?: ReactNode;
  afterFeatures?: ReactNode;
  screens?: ReactNode;
  /** 요금 위 한 줄 (요금 원칙 등) */
  pricingLead?: string;
  pricing?: ReactNode;
  afterProcess?: ReactNode;
};

function Buttons({ c }: { c: SalesPageContent }) {
  return (
    <div className="sp-actions">
      <Link href={c.cta.href} className="sp-btn">
        {c.cta.label}
        <ArrowIcon />
      </Link>
      {c.secondaryCta ? (
        <Link href={c.secondaryCta.href} className="sp-btn" data-variant="line">
          {c.secondaryCta.label}
        </Link>
      ) : null}
    </div>
  );
}

/** 소제목: 위에 작은 영문 번호 라벨 (우리 글꼴) + 한글 제목 */
function H2({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="sp-h2-wrap">
      <p className="sp-h2-label" aria-hidden="true">
        {label}
      </p>
      <h2 id={id} className="sp-h2">
        {children}
      </h2>
    </div>
  );
}

/** 글 분량으로 읽는 시간(분)을 어림한다 (한글 분당 500자 기준) */
function readMinutes(c: SalesPageContent) {
  const text = [
    c.lead,
    ...c.problems,
    ...c.features.flatMap((f) => [f.title, f.detail]),
    ...c.process.flatMap((p) => [p.step, p.detail]),
    ...c.faq.flatMap((f) => [f.q, f.a]),
  ].join("");
  return Math.max(1, Math.round(text.length / 500));
}

export function SalesPage({
  content: c,
  slots = {},
}: {
  content: SalesPageContent;
  slots?: Slots;
}) {
  const toc = [
    { id: "sp-problems", label: "이런 고민 있으세요?" },
    { id: "sp-features", label: "이렇게 해결합니다" },
    ...(slots.screens || c.screens.length > 0
      ? [{ id: "sp-screens", label: "화면 미리보기" }]
      : []),
    ...(c.cases.length > 0 ? [{ id: "sp-cases", label: "도입 사례" }] : []),
    ...(slots.pricing ? [{ id: "sp-pricing", label: "요금" }] : []),
    { id: "sp-process", label: "진행 절차" },
    ...(c.faq.length > 0 ? [{ id: "sp-faq", label: "자주 묻는 질문" }] : []),
  ];
  const tocList = (
    <ol>
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.label}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <article className="sp">
      <JsonLd data={serviceGraph({ path: c.path, name: c.name, description: c.message })} />

      <div className="sp-cover">
        <ImageSlot label={c.screens[0] ?? `${c.name} 커버 이미지`} />
      </div>

      <div className="sp-layout">
        <div className="sp-doc">
          <nav className="sp-crumb" aria-label="위치">
            <Link href={c.parent.href}>{c.parent.label}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.name}</span>
          </nav>

          <h1 className="sp-title">{c.name}</h1>
          <p className="sp-meta">
            <span>{c.parent.label}</span>
            <span aria-hidden="true">·</span>
            <span>사피어</span>
            <span aria-hidden="true">·</span>
            <span>{readMinutes(c)}분 읽기</span>
          </p>

          <ul className="sp-tags">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="sp-callout">
            <p className="sp-callout-title">
              {c.headline[0]} {c.headline[1]}
            </p>
            <p>{c.lead}</p>
            <Buttons c={c} />
          </div>

          {slots.hero ? <div className="sp-try">{slots.hero}</div> : null}

          {/* 목차 (좁은 화면: 본문 안 접는 상자, 넓은 화면: 오른쪽에 고정) */}
          <details className="sp-toc-inline">
            <summary>목차</summary>
            {tocList}
          </details>

          <section aria-labelledby="sp-problems">
            <H2 id="sp-problems" label="문제">
              이런 고민 있으세요?
            </H2>
            <ul className="sp-ul">
              {c.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sp-features">
            <H2 id="sp-features" label="해결">
              이렇게 해결합니다
            </H2>
            <ol className="sp-ol">
              {c.features.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong>
                  <p>{f.detail}</p>
                </li>
              ))}
            </ol>
            {slots.afterFeatures}
          </section>

          {/* 글 중간 신청 띠 (토스페이먼츠 블로그처럼 읽다가 바로 신청) */}
          <aside className="sp-inline-cta" aria-label="신청">
            <p>{c.closing.title}</p>
            <Link href={c.cta.href} className="sp-btn">
              {c.cta.label}
              <ArrowIcon />
            </Link>
          </aside>

          {slots.screens || c.screens.length > 0 ? (
            <section aria-labelledby="sp-screens">
              <H2 id="sp-screens" label="화면">
                화면 미리보기
              </H2>
              {slots.screens}
              {c.screens.map((s, i) => (
                <figure key={s} className="sp-figure">
                  <div className="sp-figure-media">
                    <ImageSlot label={s} tone={i + 1} />
                  </div>
                  <figcaption>{s}</figcaption>
                </figure>
              ))}
            </section>
          ) : null}

          {c.cases.length > 0 ? (
            <section aria-labelledby="sp-cases">
              <H2 id="sp-cases" label="사례">
                도입 사례
              </H2>
              <ul className="sp-links">
                {c.cases.map((item) => (
                  <li key={item.title}>
                    {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {slots.pricing ? (
            <section aria-labelledby="sp-pricing" id="pricing">
              <H2 id="sp-pricing" label="요금">
                요금
              </H2>
              {slots.pricingLead ? (
                <blockquote className="sp-quote">{slots.pricingLead}</blockquote>
              ) : null}
              {slots.pricing}
              <p className="sp-muted">금액은 VAT 포함입니다.</p>
            </section>
          ) : null}

          <section aria-labelledby="sp-process">
            <H2 id="sp-process" label="진행">
              진행 절차
            </H2>
            <ol className="sp-steps">
              {c.process.map((p) => (
                <li key={p.step}>
                  <strong>{p.step}</strong>
                  <span>{p.detail}</span>
                </li>
              ))}
            </ol>
            {slots.afterProcess}
          </section>

          {c.faq.length > 0 ? (
            <section aria-labelledby="sp-faq">
              <H2 id="sp-faq" label="질문">
                자주 묻는 질문
              </H2>
              <div className="sp-toggles">
                {c.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <hr className="sp-hr" />

          <div className="sp-callout sp-callout-end">
            <p className="sp-callout-title">{c.closing.title}</p>
            <p>{c.closing.text}</p>
            <Buttons c={c} />
          </div>
        </div>
        <aside className="sp-toc" aria-label="목차">
          <p className="sp-toc-title">목차</p>
          {tocList}
        </aside>
      </div>
    </article>
  );
}
