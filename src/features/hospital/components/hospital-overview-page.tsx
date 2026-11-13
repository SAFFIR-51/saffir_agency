import Link from "next/link";
import { hospitalDifferentiator, hospitalJourney } from "@/content/hospital";
import { geoPlans, hospitalGrowthBundle, solutionPlans } from "@/content/pricing";
import { listServices } from "@/content/services";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { BulletList, ButtonLink, Container, PageHeader, Reveal, Section } from "@/shared/ui";
import { hospitalOverviewContent as c } from "../model/content";

/**
 * 병원 솔루션 허브 (애플 스타일)
 * 첫 화면 → 서비스 4가지(큰 타일) → 고객 흐름(번호 단계) → 차별점(큰 문장) → 패키지(가격 비교)
 */
export function HospitalOverviewPage() {
  const bundle = hospitalGrowthBundle;
  const separate = [...geoPlans, ...solutionPlans]
    .filter((p) => bundle.includes.includes(p.id))
    .reduce((sum, p) => sum + (p.monthly ?? 0), 0);
  const services = listServices("hospital");

  return (
    <>
      <PageHeader eyebrow="병원 솔루션" title={c.title} lead={c.lead}>
        <div className="flex flex-wrap gap-3.5">
          <ButtonLink href={`${routes.hospital.geo}#diagnosis`}>무료 진단하기</ButtonLink>
          <ButtonLink href={routes.contactFor("hospital-bundle")} variant="secondary">
            패키지 상담
          </ButtonLink>
        </div>
      </PageHeader>

      {/* 서비스 4가지: 큰 타일 */}
      <Section label="S2 · 서비스" title={c.services}>
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="group flex h-full min-h-[340px] flex-col rounded-[28px] bg-background p-8 transition duration-300 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgb(0_0_0/0.10)] sm:p-10 [section:nth-of-type(odd)_&]:bg-surface"
              >
                <p className="text-sm font-semibold text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[28px] leading-tight font-semibold tracking-tight sm:text-[32px]">
                  {s.name}
                </h3>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{s.message}</p>
                {s.highlights.length > 0 ? (
                  <BulletList items={s.highlights.slice(0, 3)} className="mt-6 text-[15px]" />
                ) : null}
                <p aria-hidden className="mt-auto pt-8 text-[17px] text-link group-hover:underline">
                  자세히 보기 ›
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 고객 흐름: 번호 단계 */}
      <Section label="S3 · 고객 흐름" title={c.journey}>
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {hospitalJourney.map((j, i) => (
            <li key={j.step} className="border-t-2 border-foreground pt-5">
              <p className="text-[32px] leading-none font-semibold tracking-tight text-brand">
                {i + 1}
              </p>
              <p className="mt-4 text-[19px] font-semibold">{j.step}</p>
              <p className="mt-2 leading-relaxed text-muted">{j.detail}</p>
              <p className="mt-3 text-sm font-semibold text-muted">{j.service}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 차별점: 큰 문장 */}
      <section aria-labelledby="hp-why" className="bg-black! py-24 text-white sm:py-36">
        <Container className="text-center">
          <Reveal>
            <h2
              id="hp-why"
              className="text-gradient text-[36px] leading-[1.1] font-semibold tracking-tight sm:text-[72px] sm:leading-[1.05]"
            >
              {hospitalDifferentiator.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-white/70 sm:text-[24px]">
              {hospitalDifferentiator.description}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 패키지: 따로 쓸 때와 비교 */}
      <Section label="S5 · 패키지" title={c.bundle} description="금액은 VAT 포함입니다.">
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[28px] bg-surface p-8 sm:p-10 [section:nth-of-type(even)_&]:bg-background">
            <p className="text-sm font-semibold text-muted">구성</p>
            <p className="mt-2 text-[24px] font-semibold tracking-tight sm:text-[28px]">
              {bundle.includesLabel}
            </p>
            <p className="mt-6 inline-block rounded-full bg-brand/10 px-4 py-2 text-[15px] font-semibold text-brand">
              {bundle.benefit}
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-[28px] bg-surface p-8 sm:p-10 [section:nth-of-type(even)_&]:bg-background">
            <div>
              <p className="text-sm font-semibold text-muted">월 요금</p>
              <p className="mt-2 text-[44px] leading-none font-semibold tracking-tight">
                {formatKRW(bundle.monthly)}
              </p>
              {separate > bundle.monthly ? (
                <p className="mt-3 text-[17px] text-muted">
                  따로 쓸 때 <span className="line-through">{formatKRW(separate)}</span>
                </p>
              ) : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routes.contactFor("hospital-bundle")}>패키지 상담</ButtonLink>
              <ButtonLink href={`${routes.pricing}#bundle`} variant="secondary">
                요금 안내
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
