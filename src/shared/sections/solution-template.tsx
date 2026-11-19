import type { Route } from "next";
import Link from "next/link";
import { routes } from "@/shared/config";
import { serviceGraph, JsonLd } from "@/shared/seo";
import { DetailTabs } from "./detail-tabs";
import {
  ButtonPair,
  detailPageWidth,
  FaqList,
  SpecStrip,
  subpagePad,
  underlineLink,
} from "./subpage";

/**
 * 세부(서비스) 페이지 공통 틀. 상위 페이지(/hospital 등)와 달리 "상품 상세"처럼 구성한다.
 * 상단: 이동 경로 · 서비스 이름 · 한 줄 소개 · 버튼 | 요약 상자 → 페이지 안 메뉴(고정) →
 * 기획서 순서: 이런 상황이라면 → 주요 기능 → 화면 → 도입 사례 → 요금 → 도입 절차 → FAQ → 신청 띠
 */
export const SOLUTION_SECTION_ORDER = [
  { id: "problems", label: "개요", title: "이런 상황이라면" },
  { id: "features", label: "기능", title: "주요 기능" },
  { id: "screens", label: "화면", title: "화면 미리보기" },
  { id: "cases", label: "사례", title: "도입 사례" },
  { id: "pricing", label: "요금", title: "요금" },
  { id: "process", label: "절차", title: "도입 절차" },
  { id: "faq", label: "FAQ", title: "자주 묻는 질문" },
] as const;

export type SolutionPageContent = {
  /** 이 페이지 주소. 구조화데이터(Service, 이동 경로)에 쓴다 */
  path: Route;
  /** 상위 묶음: 병원 솔루션 / 비즈니스 솔루션 */
  eyebrow: string;
  name: string;
  message: string;
  problems: string[];
  features: string[];
  /** 화면 미리보기 자리 이름 (예: 대시보드 화면) */
  screens: string[];
  cases: { title: string; href?: Route; image?: string }[];
  process: { step: string; detail: string }[];
  faq: { q: string; a: string }[];
  cta: { label: string; href: Route };
  secondaryCta?: { label: string; href: Route };
};

/** 섹션마다 화면 전용 내용을 끼워 넣는 자리 (요금표, 입력창, 보안 설명 등) */
type Slots = {
  afterFeatures?: React.ReactNode;
  screens?: React.ReactNode;
  pricing?: React.ReactNode;
  afterProcess?: React.ReactNode;
};

/** 오른쪽 요약 상자 한 줄 (예: 시작 요금 · 월 49,000원부터) */
export type SolutionSummary = { label: string; value: string }[];

/** 요금표·보조 표를 엑셀식으로 (모든 칸에 옅은 선, 회색 머리줄) */
const sheet =
  "space-y-6 [&_caption]:mb-3 [&_caption]:text-sm [&_caption]:text-neutral-600 [&_table]:min-w-[40rem] [&_table]:border-collapse [&_table]:text-[0.9375rem] [&_td]:border [&_td]:border-neutral-300 [&_td]:px-4 [&_td]:py-3.5 [&_td]:align-middle [&_td:not(:nth-child(2))]:whitespace-nowrap [&_th]:border [&_th]:border-neutral-300 [&_th]:bg-[#f3f3f3] [&_th]:px-4 [&_th]:py-3 [&_th]:text-sm [&_tr]:border-0";

function Block({
  index,
  description,
  children,
}: {
  index: number;
  description?: string;
  children: React.ReactNode;
}) {
  const s = SOLUTION_SECTION_ORDER[index];
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="grid scroll-mt-36 gap-6 border-b border-neutral-200 py-14 lg:grid-cols-12 lg:gap-x-4 lg:py-20"
    >
      <div className="lg:col-span-3">
        <h2
          id={`${s.id}-title`}
          className="text-2xl leading-[1.3] font-bold tracking-[-0.03em] lg:text-[1.75rem]"
        >
          {s.title}
        </h2>
        {description && <p className="mt-2 text-sm text-neutral-600">{description}</p>}
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}

function buttons(c: SolutionPageContent) {
  return {
    secondary: c.secondaryCta ?? { label: "문의하기", href: routes.contact as Route },
    primary: c.cta,
  };
}

export function SolutionTemplate({
  content,
  slots = {},
  summary = [],
}: {
  content: SolutionPageContent;
  slots?: Slots;
  summary?: SolutionSummary;
}) {
  const c = content;
  const rows: SolutionSummary = [
    ...summary,
    { label: "도입 절차", value: `${c.process.length}단계` },
    ...(c.cases.length > 0 ? [{ label: "관련 사례", value: `${c.cases.length}건` }] : []),
  ];
  const price = summary[0];

  return (
    <div className={`${detailPageWidth} bg-white pb-28 text-black lg:pb-40`}>
      <JsonLd
        data={serviceGraph({ path: c.path, name: c.name, description: c.message, faq: c.faq })}
      />

      {/* 상단: 이동 경로 · 이름 · 소개 · 버튼 | 요약 상자 */}
      <header className={`pt-8 pb-14 lg:pt-12 lg:pb-20 ${subpagePad}`}>
        <nav aria-label="이동 경로" className="text-sm text-neutral-500">
          {c.eyebrow}
          <span aria-hidden="true" className="mx-2">
            ›
          </span>
          <span className="text-black">{c.name.replace(/^사피어\s/, "")}</span>
        </nav>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-x-4">
          <div className="lg:col-span-7">
            <h1 className="text-[2.25rem] leading-[1.15] font-bold tracking-[-0.04em] lg:text-[3.25rem]">
              {c.name}
            </h1>
            <p className="mt-4 text-lg leading-[1.5] text-neutral-700 lg:text-xl">{c.message}</p>
            <div className="mt-8">
              <ButtonPair {...buttons(c)} />
            </div>
          </div>
          {rows.length > 0 && (
            <dl className="self-end border-t border-black lg:col-span-4 lg:col-start-9">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-baseline justify-between gap-6 border-b border-neutral-200 py-3.5"
                >
                  <dt className="text-sm text-neutral-500">{r.label}</dt>
                  <dd className="text-right text-[0.9375rem] font-semibold">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <DetailTabs items={SOLUTION_SECTION_ORDER.map((s) => ({ id: s.id, label: s.label }))} />

      <div className={subpagePad}>
        <Block index={0}>
          <ul className="border-t border-black">
            {c.problems.map((p) => (
              <li
                key={p}
                className="flex items-start gap-4 border-b border-neutral-200 py-5 text-lg leading-[1.5] font-medium tracking-[-0.02em]"
              >
                <span aria-hidden="true" className="mt-0.5 text-neutral-400">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Block>

        <Block index={1}>
          <ol className="grid gap-x-4 border-t border-black sm:grid-cols-2">
            {c.features.map((f, i) => (
              <li
                key={f}
                className="flex gap-4 border-b border-neutral-200 py-5 text-[0.9375rem] leading-[1.6]"
              >
                <span className="font-display text-sm font-medium text-neutral-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ol>
          {slots.afterFeatures && <div className={`mt-8 ${sheet}`}>{slots.afterFeatures}</div>}
        </Block>

        <Block index={2}>
          {slots.screens && <div className={`mb-8 ${sheet}`}>{slots.screens}</div>}
          <div className="grid gap-2 sm:grid-cols-2">
            {c.screens.map((screen) => (
              <div
                key={screen}
                className="flex aspect-video items-end bg-[#f3f3f3] p-4 text-sm text-neutral-500"
              >
                {screen}
              </div>
            ))}
          </div>
        </Block>

        <Block index={3}>
          <ul className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.cases.map((item) => {
              const body = (
                <>
                  <div className="relative aspect-square overflow-hidden bg-[#f3f3f3]">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element -- 작은 사례 썸네일, 원본이 이미 webp
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover group-hover:scale-[1.02] motion-safe:transition-transform motion-safe:duration-500"
                      />
                    )}
                  </div>
                  <p className="mt-3 text-base font-bold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                    {item.title}
                  </p>
                </>
              );
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} className="group block">
                      {body}
                    </Link>
                  ) : (
                    <div className="group">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Block>

        <Block index={4} description="금액은 VAT 포함입니다.">
          <div className={sheet}>{slots.pricing}</div>
        </Block>

        <Block index={5}>
          <SpecStrip numbered items={c.process.map((p) => ({ name: p.step, detail: p.detail }))} />
          {slots.afterProcess && <div className={`mt-12 ${sheet}`}>{slots.afterProcess}</div>}
        </Block>

        <Block index={6}>
          {c.faq.length > 0 ? (
            <FaqList items={c.faq} />
          ) : (
            <p className="text-sm text-neutral-500">질문을 준비하고 있습니다.</p>
          )}
          <Link href={routes.faq as Route} className={`mt-6 inline-block text-sm ${underlineLink}`}>
            전체 질문 보기
          </Link>
        </Block>

        {/* 맨 아래 신청 띠 */}
        <div className="mt-16 flex flex-col gap-6 border-t border-black pt-8 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xl font-bold tracking-[-0.03em] lg:text-2xl">{c.name}</p>
            {price && (
              <p className="mt-1 text-[0.9375rem] text-neutral-600">
                {price.label} {price.value}
              </p>
            )}
          </div>
          <ButtonPair {...buttons(c)} />
        </div>
      </div>
    </div>
  );
}
