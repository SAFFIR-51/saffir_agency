import type { Route } from "next";
import Link from "next/link";
import { businessModels, modules, workflow } from "@/content/company";
import { portfolioGroups, portfolioItems } from "@/content/portfolio";
import {
  geoPlans,
  hospitalWebsitePlans,
  outsourcingDeposits,
  serverTiers,
  solutionPlans,
} from "@/content/pricing";
import { listServices, serviceLines } from "@/content/services";
import { routes, site } from "@/shared/config";
import { cn, formatKRW } from "@/shared/lib";
import { ButtonLink, Container, Rail, Reveal, WireBox } from "@/shared/ui";
import { CountUp } from "./count-up";
import { ScrollText } from "./scroll-text";
import { homeContent as c } from "../model/content";

function minPrice(values: Array<number | null | undefined>) {
  const prices = values.filter((v): v is number => typeof v === "number" && v > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

/** 애플식 글 링크: 파란 글자 + 꺾쇠 */
function MoreLink({
  href,
  dark = false,
  children,
}: {
  href: Route;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn("text-[17px] hover:underline", dark ? "text-[#2997ff]" : "text-link")}
    >
      {children}
      <span aria-hidden> ›</span>
    </Link>
  );
}

/** 구역 머리: 큰 제목 (+ 오른쪽 링크) */
function Head({
  id,
  title,
  description,
  center = false,
}: {
  id: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2
        id={id}
        className="text-[32px] leading-[1.125] font-semibold tracking-tight text-balance sm:text-[56px] sm:leading-[1.07]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted sm:text-[21px]">{description}</p>
      ) : null}
    </Reveal>
  );
}

/**
 * 서비스 타일 (apple.com 첫 화면의 제품 타일): 가운데 큰 제목·부제·버튼 두 개, 아래 큰 이미지.
 */
function Tile({
  id,
  name,
  headline,
  description,
  start,
  href,
  more,
  image,
  dark = false,
}: {
  id: string;
  name: string;
  headline: string;
  description: string;
  start: { label: string; href: Route };
  href: Route;
  more: string;
  image: string;
  dark?: boolean;
}) {
  return (
    <article
      aria-labelledby={id}
      className={cn(
        "flex flex-col items-center overflow-hidden px-6 pt-12 text-center sm:pt-14",
        dark ? "bg-black text-white" : "bg-surface",
        "min-h-[560px] sm:min-h-[620px]",
      )}
    >
      <Reveal className="flex flex-col items-center">
        <h3 id={id} className={cn("font-semibold tracking-tight", "text-[32px] sm:text-[40px]")}>
          {name}
        </h3>
        <p className={cn("mt-1 font-normal", "text-[19px] sm:text-[21px]")}>{headline}</p>
        <p className={cn("mt-2 text-[15px]", dark ? "text-white/60" : "text-muted")}>
          {description}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href={start.href} className="h-10 px-5 text-[15px]">
            {start.label}
          </ButtonLink>
          <ButtonLink href={href} variant="secondary" className="h-10 px-5 text-[15px]">
            {more}
          </ButtonLink>
        </div>
      </Reveal>
      <div className="mt-10 w-full max-w-[480px] flex-1">
        <WireBox
          label={image}
          size="fit"
          className={cn(
            "h-full min-h-[240px] rounded-t-[28px]! rounded-b-none!",
            dark ? "bg-white/10! text-white/50!" : "bg-background!",
          )}
        />
      </div>
    </article>
  );
}

/**
 * 메인 (애플 스타일)
 * 첫 화면 → 서비스 타일(병원·비즈니스·맞춤 개발 세 장 나란히) → 큰 문장(스크롤하면 밝아짐)
 * + 숫자(올라감) → 포트폴리오(옆으로 넘기기) → 왜 사피어인가(격자) → 진행 순서(검정) → 요금 → 상담(검정).
 * 구역마다 바탕을 직접 정한다 (globals.css의 번갈아 칠하기보다 우선).
 */
export function HomePage() {
  const groupCount = Object.keys(portfolioGroups).filter((g) =>
    portfolioItems.some((item) => item.group === g),
  ).length;
  const priceCount = [
    ...geoPlans,
    ...solutionPlans,
    ...hospitalWebsitePlans,
    ...serverTiers,
    ...outsourcingDeposits,
  ].length;
  const stats = [
    { value: portfolioItems.length, unit: "건", label: c.stats.portfolio },
    { value: groupCount, unit: "개", label: c.stats.groups },
    { value: priceCount, unit: "개", label: c.stats.prices },
    { value: 3, unit: "갈래", label: c.stats.lines },
  ];

  const b = c.bento;
  const featured = c.featured.flatMap((f) => {
    const item = portfolioItems.find((p) => p.slug === f.slug);
    return item ? [{ ...item, tag: f.tag }] : [];
  });

  const lines = c.entry.lines;
  const businessIds = listServices("business").map((s) => s.id as string);
  const prices = [
    {
      name: serviceLines.hospital.name,
      value: minPrice(geoPlans.map((p) => p.monthly)),
      prefix: "월 ",
      basis: "AI 검색 최적화 월 구독",
      href: `${routes.pricing}#geo` as Route,
    },
    {
      name: serviceLines.business.name,
      value: minPrice(solutionPlans.filter((p) => businessIds.includes(p.id)).map((p) => p.setup)),
      prefix: "",
      basis: "도입 세팅비",
      href: `${routes.pricing}#solutions` as Route,
    },
    {
      name: "맞춤 개발",
      value: minPrice(outsourcingDeposits.map((p) => p.setup)),
      prefix: "",
      basis: "정찰가 계약금",
      href: `${routes.pricing}#development` as Route,
    },
  ];

  return (
    <>
      {/* 첫 화면 */}
      <section
        aria-labelledby="home-title"
        className="bg-background! pt-16 pb-16 sm:pt-28 sm:pb-24"
      >
        <Container className="text-center">
          <Reveal>
            <p className="text-[19px] font-semibold text-muted sm:text-[21px]">{site.legalName}</p>
            <h1
              id="home-title"
              className="mt-3 text-[44px] leading-[1.08] font-semibold tracking-tight sm:text-[80px] sm:leading-[1.05]"
            >
              {c.hero.title[0]}
              <br />
              <span className="text-gradient">{c.hero.title[1]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-snug text-muted sm:text-[28px] sm:leading-[1.25]">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <ButtonLink href={routes.contact}>{c.hero.primaryCta}</ButtonLink>
              <ButtonLink href={routes.portfolio} variant="secondary">
                {c.hero.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 서비스 타일: 세 갈래를 같은 크기로 나란히 */}
      <section aria-label={c.entry.title} className="bg-background! px-3 pb-3">
        <div className="grid gap-3 lg:grid-cols-3">
          <Tile
            id="tile-hospital"
            name={serviceLines.hospital.name}
            headline={c.tiles.hospital.headline}
            description={lines.hospital.description}
            start={lines.hospital.start}
            href={routes.hospital.root}
            more={c.entry.more}
            image={c.tiles.hospital.image}
          />
          <Tile
            id="tile-business"
            name={serviceLines.business.name}
            headline={c.tiles.business.headline}
            description={lines.business.description}
            start={lines.business.start}
            href={routes.solutions.root}
            more={c.entry.more}
            image={c.tiles.business.image}
            dark
          />
          <Tile
            id="tile-development"
            name="맞춤 개발"
            headline={c.tiles.development.headline}
            description={lines.development.description}
            start={lines.development.start}
            href={routes.development.root}
            more={c.entry.more}
            image={c.tiles.development.image}
          />
        </div>
      </section>

      {/* 큰 문장(스크롤하면 밝아짐) + 숫자 */}
      <section aria-label="사피어 소개" className="bg-background! py-28 sm:py-44">
        <Container>
          <ScrollText
            text={c.statement}
            className="mx-auto max-w-[920px] text-[32px] leading-[1.2] font-semibold tracking-tight sm:text-[56px] sm:leading-[1.15]"
          />
          <dl className="mt-20 grid grid-cols-2 gap-y-12 text-center sm:mt-28 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <dt className="text-[15px] text-muted sm:text-[17px]">{s.label}</dt>
                <dd className="mt-1 text-[56px] leading-none font-semibold tracking-tight sm:text-[72px]">
                  <CountUp value={s.value} />
                  <span className="ml-1 text-2xl font-medium text-muted sm:text-[28px]">
                    {s.unit}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* 포트폴리오 */}
      <section aria-labelledby="home-cases" className="bg-surface! py-20 sm:py-28">
        <Container className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <Head id="home-cases" title={c.cases.title} />
          <MoreLink href={routes.portfolio}>{c.cases.all}</MoreLink>
        </Container>
        <div className="mt-10 sm:mt-12">
          <Rail label={c.cases.title}>
            {featured.map((item) => (
              <li key={item.slug}>
                <Link
                  href={routes.portfolioDetail(item.slug)}
                  className="flex h-[500px] flex-col overflow-hidden rounded-[28px] bg-background shadow-[0_2px_12px_rgb(0_0_0/0.04)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgb(0_0_0/0.10)]"
                >
                  <div className="p-7">
                    <p className="text-xs font-semibold tracking-wide text-muted">{item.tag}</p>
                    <p className="mt-2 text-[28px] leading-tight font-semibold tracking-tight">
                      {item.title}
                    </p>
                  </div>
                  <WireBox
                    label={`${item.title} 대표 화면`}
                    size="fit"
                    className="mx-7 mb-7 flex-1 rounded-[18px]! bg-surface!"
                  />
                </Link>
              </li>
            ))}
          </Rail>
        </div>
      </section>

      {/* 왜 사피어인가: 크기가 다른 칸 격자 */}
      <section aria-labelledby="home-bento" className="bg-background! py-20 sm:py-28">
        <Container>
          <Head id="home-bento" title={b.title} />
          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-6">
            {/* 요금 공개: 넓은 칸, 큰 숫자 */}
            <Reveal className="flex flex-col justify-between rounded-[28px] bg-surface p-8 sm:p-10 md:col-span-4">
              <div>
                <h3 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[40px]">
                  {b.prices.title}
                </h3>
                <p className="mt-2 text-[17px] text-muted sm:text-[19px]">{b.prices.text}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                <p className="text-gradient text-[80px] leading-none font-semibold tracking-tight sm:text-[120px]">
                  {priceCount}
                  <span className="ml-1 text-[28px] sm:text-[40px]">개 상품</span>
                </p>
                <MoreLink href={routes.pricing}>{c.pricing.all}</MoreLink>
              </div>
            </Reveal>
            {/* 데이터는 고객사 소유: 검정 칸 */}
            <Reveal
              delay={90}
              className="flex flex-col justify-between rounded-[28px] bg-black p-8 text-white sm:p-10 md:col-span-2"
            >
              <svg viewBox="0 0 48 48" aria-hidden="true" className="size-12 text-[#2997ff]">
                <path
                  d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path d="M17 24l5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              <div className="mt-10">
                <h3 className="text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                  {b.ownership.title}
                </h3>
                <p className="mt-2 text-[17px] text-white/60">{b.ownership.text}</p>
              </div>
            </Reveal>
            {/* 보유 모듈: 알약 목록 */}
            <Reveal className="rounded-[28px] bg-surface p-8 sm:p-10 md:col-span-3">
              <h3 className="text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                {b.modules.title}
              </h3>
              <p className="mt-2 text-[17px] text-muted">{b.modules.text}</p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {modules.map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-background px-4 py-2 text-[15px] font-medium"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            {/* 세 가지 제공 방식 */}
            <Reveal delay={90} className="rounded-[28px] bg-surface p-8 sm:p-10 md:col-span-3">
              <h3 className="text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                {b.models.title}
              </h3>
              <ul className="mt-6 divide-y divide-divider">
                {businessModels.map((m) => (
                  <li key={m.type} className="py-4 first:pt-0 last:pb-0">
                    <p className="text-[17px] font-semibold">{m.type}</p>
                    <p className="mt-1 text-[15px] text-muted">{m.revenue}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            {/* 포털 · 운영 */}
            {[b.portal, b.operate].map((cell, i) => (
              <Reveal
                key={cell.title}
                delay={i * 90}
                className="rounded-[28px] bg-surface p-8 sm:p-10 md:col-span-3"
              >
                <p className="text-gradient text-[40px] leading-none font-semibold">
                  {i === 0 ? "◎" : "∞"}
                </p>
                <h3 className="mt-6 text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                  {cell.title}
                </h3>
                <p className="mt-2 text-[17px] text-muted">{cell.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 진행 순서 (검정) */}
      <section aria-labelledby="home-workflow" className="bg-black! py-20 text-white sm:py-28">
        <Container>
          <Reveal className="max-w-3xl">
            <h2
              id="home-workflow"
              className="text-[32px] leading-[1.125] font-semibold tracking-tight sm:text-[56px] sm:leading-[1.07]"
            >
              {c.workflow.title}
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((w, i) => (
              <li key={w.step}>
                <Reveal delay={i * 90} className="h-full rounded-[28px] bg-[#1d1d1f] p-8">
                  <p className="text-gradient text-[56px] leading-none font-semibold tracking-tight">
                    {i + 1}
                  </p>
                  <h3 className="mt-6 text-[21px] font-semibold">{w.step}</h3>
                  <p className="mt-2 text-[17px] leading-relaxed text-white/60">{w.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 요금 */}
      <section aria-labelledby="home-pricing" className="bg-background! py-20 sm:py-28">
        <Container>
          <Head id="home-pricing" title={c.pricing.title} description={c.pricing.note} center />
          <ul className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
            {prices.map((p, i) => (
              <li key={p.name}>
                <Reveal
                  delay={i * 90}
                  className="flex h-full flex-col items-center rounded-[28px] bg-surface px-8 py-12 text-center"
                >
                  <h3 className="text-[21px] font-semibold">{p.name}</h3>
                  <p className="mt-8 text-[40px] leading-none font-semibold tracking-tight">
                    {p.value === null ? "별도 견적" : `${p.prefix}${formatKRW(p.value)}`}
                  </p>
                  <p className="mt-2 text-[17px] text-muted">{p.value === null ? "" : "부터"}</p>
                  <p className="mt-8 text-[15px] text-muted">{p.basis}</p>
                  <div className="mt-6">
                    <MoreLink href={p.href}>자세히 보기</MoreLink>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <ButtonLink href={routes.pricing} variant="secondary">
              {c.pricing.all}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 상담 (검정) */}
      <section aria-labelledby="home-closing" className="bg-black! py-28 text-white sm:py-40">
        <Container className="text-center">
          <Reveal>
            <h2
              id="home-closing"
              className="text-[36px] leading-[1.1] font-semibold tracking-tight sm:text-[72px] sm:leading-[1.05]"
            >
              {c.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[19px] text-white/60 sm:text-[24px]">
              {c.closing.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <ButtonLink href={routes.contact}>{c.hero.primaryCta}</ButtonLink>
              <MoreLink href={routes.development.estimate} dark>
                {c.closing.estimate}
              </MoreLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
