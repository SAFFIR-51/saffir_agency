import type { Route } from "next";
import Link from "next/link";
import { faqForService } from "@/content/faq";
import { hospitalJourney } from "@/content/hospital";
import { geoPlans, hospitalGrowthBundle, solutionPlans } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { hospitalLandingContent as c, hospitalOverviewContent as o } from "../model/content";
import { HospitalGate } from "./hospital-gate";
import { HospitalHeroFlow } from "./hospital-hero-flow";
import { JourneyIcon } from "./journey-icon";
import { sectionSub, sectionTitle } from "./section-title";

/* 세부 페이지 틀: 꽉 찬 너비, 좌우 40 · 모바일 20, 12칸 */
const pad = "px-5 lg:px-10";
/**
 * 사피어 버튼 (delight.ai 실측: 높이 48, 좌우 25, 모서리 8, 1px 검정 테두리, 16px w500).
 * 평소에는 글자만, 마우스를 올리면 글자가 왼쪽으로 8px 밀리고 12px 화살표가 나타난다.
 * 버튼이 두 개면 왼쪽 흰 버튼, 오른쪽 검은 버튼.
 */
const button =
  "group/btn inline-flex h-12 items-center justify-center rounded-lg border border-black px-[25px] text-base leading-[22px] font-medium tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-colors motion-safe:duration-300";
const light = `${button} bg-white text-black`;
const dark = `${button} bg-black text-white hover:bg-black/90`;

function ButtonLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="group-hover/btn:-translate-x-2 group-focus-visible/btn:-translate-x-2 motion-safe:transition-transform motion-safe:duration-300">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 9"
        className="h-[9px] w-0 shrink-0 opacity-0 group-hover/btn:w-3 group-hover/btn:translate-x-2 group-hover/btn:opacity-100 group-focus-visible/btn:w-3 group-focus-visible/btn:translate-x-2 group-focus-visible/btn:opacity-100 motion-safe:transition-all motion-safe:duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 4.5h11M7 1l4 3.5L7 8" />
      </svg>
    </>
  );
}

/** 버튼 두 개: 왼쪽 흰 버튼, 오른쪽 검은 버튼 */
function Buttons({
  secondary,
  primary,
}: {
  secondary: { href: Route; label: string };
  primary: { href: Route; label: string };
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={secondary.href} className={light}>
        <ButtonLabel>{secondary.label}</ButtonLabel>
      </Link>
      <Link href={primary.href} className={dark}>
        <ButtonLabel>{primary.label}</ButtonLabel>
      </Link>
    </div>
  );
}

/** 섹션 머리: 영문 제목 + 한글 한 줄 (+ 설명, 버튼) */
function SectionHead({
  id,
  en,
  sub,
  children,
}: {
  id: string;
  en: string;
  sub: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <div className={pad}>
      <h2 id={id} className={sectionTitle}>
        {en}
      </h2>
      <p className={sectionSub}>
        {sub.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

/** 1. 첫 화면 (ANCORS 세부 첫 화면): 오른쪽 위 태그·소개·버튼, 가운데 큰 제목, 아래 흐름 그림 */
function Hero() {
  return (
    <section aria-labelledby="hospital-title" className="pt-12 lg:pt-20">
      {/* 위 문구 묶음의 왼쪽 끝을 큰 제목 글자의 왼쪽 끝에 맞춘다 (제목 너비만큼의 가운데 상자) */}
      <div className={pad}>
        <div className="mx-auto w-fit max-w-full">
          <div className="flex max-w-3xl flex-col items-start gap-4">
            {/* ANCORS 세부 첫 화면 서체(영문 Archivo 500 자간 -0.06em, 한글 Pretendard 500 자간 -0.03em)를 헤더 글자(14)에 맞춰: 영문 16, 한글 15 */}
            <p className="font-display text-sm leading-[1.45] font-medium tracking-[-0.06em] uppercase lg:text-base">
              {c.hero.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="text-sm leading-[1.55] font-medium tracking-[-0.03em] whitespace-pre-line text-black lg:text-[0.9375rem]">
              {o.hero.lead}
            </p>
          </div>
          <h1
            id="hospital-title"
            className="mt-10 -ml-[0.04em] text-[clamp(3rem,9vw,8.25rem)] leading-[0.95] font-extrabold tracking-[-0.05em] lg:mt-8"
          >
            <span className="sr-only">
              {o.hero.title[0]} {o.hero.title[1]}
            </span>
            <span aria-hidden="true">{c.hero.title}</span>
          </h1>
        </div>
      </div>
      <div className="mt-8 flex justify-center lg:mt-10">
        <Buttons
          secondary={{ href: routes.contactFor("hospital-bundle"), label: o.hero.secondary }}
          primary={{ href: routes.hospital.geo, label: o.hero.primary }}
        />
      </div>
      <div className="mt-10 lg:mt-14">
        <HospitalHeroFlow className="rounded-none!" />
      </div>
    </section>
  );
}

/** 표의 서비스 이름 → 해당 페이지 */
const serviceHref: Record<string, Route> = {
  "AI 검색 최적화": routes.hospital.geo,
  "의료광고 검사기": routes.hospital.adCheck,
  "의료광고 검사": routes.hospital.adCheck,
  "병원 홈페이지": routes.hospital.website,
  "병원 CRM": routes.hospital.crm,
};

/** 2. 병원 고객 흐름: 엑셀처럼 모든 칸에 선이 있는 표 (번호 · 단계 · 하는 일 · 서비스). 좁은 화면에서는 옆으로 밀어 본다 */
function Journey() {
  const cell = "border border-neutral-300 px-4 py-3.5 align-middle";
  const head = `${cell} bg-[#f3f3f3] py-3 text-left text-sm font-semibold`;
  return (
    <section aria-labelledby="hospital-journey" className="pt-28 lg:pt-40">
      <SectionHead id="hospital-journey" en={c.journey.title} sub={c.journey.sub} />
      <div className={`mt-12 lg:mt-20 ${pad}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-[0.9375rem] leading-[1.5]">
            <caption className="sr-only">병원 고객 흐름 여섯 단계</caption>
            <thead>
              <tr>
                <th scope="col" className={`${head} w-16 text-center!`}>
                  단계
                </th>
                <th scope="col" className={`${head} w-[18%]`}>
                  이름
                </th>
                <th scope="col" className={head}>
                  하는 일
                </th>
                <th scope="col" className={`${head} w-[22%]`}>
                  서비스
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitalJourney.map((step, i) => (
                <tr key={step.step} className="hover:bg-[#fafafa]">
                  <td className={`${cell} text-center text-sm text-neutral-500 tabular-nums`}>
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <th scope="row" className={`${cell} text-left font-semibold`}>
                    {step.step}
                  </th>
                  <td className={`${cell} text-neutral-700`}>{step.detail}</td>
                  <td className={`${cell} text-sm`}>
                    {step.service.split(" · ").map((name, k) => (
                      <span key={name}>
                        {k > 0 && " · "}
                        <Link
                          href={serviceHref[name] ?? routes.hospital.root}
                          className="underline decoration-1 underline-offset-4 hover:no-underline"
                        >
                          {name}
                        </Link>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. 솔루션 네 가지: 솔루션마다 연회색 판 하나. 판 안은 선 없이 흰 칸으로 나눈다.
 * 위: 큰 번호(1.–4.) · 이름 · 제목 · 밑줄 링크 / 아래: 세부 항목 2×2 흰 칸 + 화면 자리(흰 칸, 비워 둠)
 */
function Solutions() {
  const j = o.journey;
  return (
    <section aria-labelledby="hospital-solutions" className="pt-28 lg:pt-40">
      <SectionHead id="hospital-solutions" en={c.solutions.title} sub={j.description.split("\n")} />
      <ol className={`mt-12 flex flex-col gap-4 lg:mt-20 lg:gap-6 ${pad}`}>
        {j.stages.map((stage, index) => {
          const items = stage.items.flatMap((item) => {
            if ("title" in item) return [item];
            const step = hospitalJourney[item.journeyIndex];
            return step ? [{ title: step.step, detail: step.detail, icon: item.icon }] : [];
          });
          return (
            <li key={stage.title} className="bg-[#f3f3f3] p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-5 lg:gap-8">
                  <span
                    aria-hidden="true"
                    className="font-display text-[3.5rem] leading-[0.8] font-extrabold tracking-[-0.06em] lg:text-[5rem]"
                  >
                    {index + 1}.
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500">
                      {stage.link.label.replace(/ 보기$/, "")}
                    </p>
                    <h3 className="mt-1.5 text-[1.375rem] leading-[1.3] font-bold tracking-[-0.03em] lg:text-[1.75rem]">
                      {stage.title}
                    </h3>
                  </div>
                </div>
                <Link
                  href={stage.link.href as Route}
                  className="shrink-0 text-[0.9375rem] font-medium tracking-[-0.02em] underline decoration-1 underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  {stage.link.label}
                </Link>
              </div>
              <div className="mt-6 grid gap-2 lg:mt-8 lg:grid-cols-12">
                <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-9">
                  {items.map((item) => (
                    <li key={item.title} className="bg-white p-5 lg:p-6">
                      <p className="flex items-center gap-2.5 text-base leading-[1.4] font-semibold tracking-[-0.02em] lg:text-[1.0625rem]">
                        <JourneyIcon name={item.icon} />
                        {item.title}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-[1.6] text-neutral-700">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <div
                  aria-hidden="true"
                  className="aspect-[4/3] bg-white lg:col-span-3 lg:aspect-auto"
                />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** 4. 한 팀이 맡는 이유: 네 서비스가 한 줄로 이어지는 띠 */
function Together() {
  const t = o.trust.together;
  return (
    <section aria-labelledby="hospital-together" className="pt-28 lg:pt-40">
      <SectionHead id="hospital-together" en={c.together.title} sub={[t.title, t.description]} />
      <ol className={`mt-12 grid grid-cols-2 gap-2 lg:mt-20 lg:grid-cols-4 ${pad}`}>
        {t.steps.map((step) => (
          <li key={step.no}>
            {/* 카드 전체가 해당 서비스 페이지 링크. 번호는 Archivo, 이름은 메인 카드와 같은 28/500 */}
            <Link
              href={serviceHref[step.name] ?? routes.hospital.root}
              className="flex h-full min-h-44 flex-col bg-black p-6 text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-colors lg:min-h-64 lg:p-8"
            >
              <span className="font-display text-sm font-medium tracking-[-0.02em] text-white/50 tabular-nums">
                {step.no}
              </span>
              <span className="mt-auto text-xl leading-[1.2] font-medium tracking-[-0.02em] lg:text-[1.75rem]">
                {step.name}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 6. 패키지: 섹션 머리 + 금액 줄 */
function Bundle() {
  const bundle = hospitalGrowthBundle;
  const b = o.bundle;
  const separate = [...geoPlans, ...solutionPlans]
    .filter((p) => bundle.includes.includes(p.id))
    .reduce((sum, p) => sum + (p.monthly ?? 0), 0);
  return (
    <section aria-labelledby="hospital-bundle" className="pt-28 lg:pt-40">
      <SectionHead id="hospital-bundle" en={c.bundle.title} sub={[b.title, b.description]} />
      <div className={`mt-12 lg:mt-20 ${pad}`}>
        <div className="grid gap-8 bg-[#f5f5f5] p-6 md:grid-cols-12 md:gap-x-4 lg:p-10">
          <div className="md:col-span-6">
            <p className="text-[0.9375rem] font-semibold">{bundle.includesLabel}</p>
            <p className="mt-3 text-[2.75rem] leading-none font-extrabold tracking-[-0.04em] lg:text-[4rem]">
              {formatKRW(bundle.monthly)}
              <span className="text-xl font-medium">{b.monthlyUnit}</span>
            </p>
            {separate > 0 && (
              <p className="mt-3 text-[0.9375rem] text-neutral-500">
                {b.separateLabel} <s>{formatKRW(separate)}</s>
              </p>
            )}
          </div>
          <div className="flex flex-col items-start justify-end gap-6 md:col-span-6">
            <p className="text-[0.9375rem] leading-[1.6]">{bundle.benefit}</p>
            <Buttons
              secondary={{ href: `${routes.pricing}#bundle` as Route, label: b.pricing }}
              primary={{ href: routes.contactFor("hospital-bundle"), label: b.consult }}
            />
            <p className="text-sm text-neutral-500">{b.vat}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 7. 자주 묻는 질문 */
function Faq() {
  const faq = [
    ...faqForService("geo").slice(0, 1),
    ...faqForService("hospital-website"),
    ...faqForService("crm").filter((item) => /안전|써 볼/.test(item.q)),
  ];
  if (faq.length === 0) return null;
  return (
    <section aria-labelledby="hospital-faq" className="pt-28 lg:pt-40">
      <SectionHead id="hospital-faq" en={c.faq.title} sub={[o.faq.title]}>
        <Link href={routes.faq as Route} className={light}>
          <ButtonLabel>{o.faq.more}</ButtonLabel>
        </Link>
      </SectionHead>
      <div className={`mt-12 lg:mt-20 ${pad}`}>
        <div className="border-t border-black">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-neutral-200">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-6 py-5 text-[1.0625rem] font-semibold tracking-[-0.02em] md:grid-cols-12 md:gap-x-4 [&::-webkit-details-marker]:hidden">
                <span className="md:col-span-11">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="justify-self-end text-2xl leading-none font-light group-open:rotate-45 motion-safe:transition-transform"
                >
                  +
                </span>
              </summary>
              <p className="pr-10 pb-6 text-[0.9375rem] leading-[1.6] text-neutral-600 md:max-w-[60%]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 8. 마무리: 가운데 큰 문장 + 버튼 두 개 */
function Closing() {
  return (
    <section aria-labelledby="hospital-closing" className={`py-28 text-center lg:py-44 ${pad}`}>
      <h2
        id="hospital-closing"
        className="text-[2.25rem] leading-[1.2] font-extrabold tracking-[-0.04em] lg:text-[3.5rem]"
      >
        {o.cta.title}
      </h2>
      <p className="mt-5 text-[0.9375rem] leading-[1.6] text-neutral-700 lg:text-lg">
        {o.cta.description}
      </p>
      <div className="mt-10 flex justify-center">
        <Buttons
          secondary={{ href: routes.contactFor("hospital-bundle"), label: o.cta.secondary }}
          primary={{ href: routes.hospital.geo, label: o.cta.primary }}
        />
      </div>
    </section>
  );
}

/** 병원 솔루션 소개: ANCORS 세부 페이지 문법(큰 제목, 2단 섹션 머리, 분야별 행, 고정 가로 스크롤, 하단 알약 메뉴) */
export function HospitalLanding() {
  const s = o.trust.security;
  return (
    <div className="bg-white pb-16 text-black">
      <Hero />
      <Journey />
      <Solutions />
      <Together />
      <HospitalGate
        id="hospital-security"
        title={c.security.title}
        description={[s.title, s.description]}
        cards={c.security.cards}
      />
      <Bundle />
      <Faq />
      <Closing />
    </div>
  );
}
