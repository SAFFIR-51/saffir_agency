import { businessModels, developmentAreas, modules, workflow } from "@/content/company";
import { portfolioGroups, portfolioItems } from "@/content/portfolio";
import { geoPlans, outsourcingDeposits, solutionPlans } from "@/content/pricing";
import { listServices, serviceLines } from "@/content/services";
import { routes, site } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  BulletList,
  ButtonLink,
  CardGrid,
  DataTable,
  IconTile,
  LinkCard,
  PageHeader,
  Section,
  WireBox,
} from "@/shared/ui";
import { homeContent as c } from "../model/content";
import { EntryCard } from "./entry-card";

function minPrice(values: Array<number | null | undefined>) {
  const prices = values.filter((v): v is number => typeof v === "number" && v > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function HomePage() {
  /** 한 업종에 치우치지 않게 업종별 건수를 모두 보여준다 */
  const groupCounts = Object.entries(portfolioGroups)
    .map(([group, label]) => ({
      label,
      count: portfolioItems.filter((item) => item.group === group).length,
    }))
    .filter((g) => g.count > 0);
  const featured = c.featured.flatMap((f) => {
    const item = portfolioItems.find((p) => p.slug === f.slug);
    return item ? [{ ...item, tag: f.tag }] : [];
  });
  /** 시작 가격은 세 갈래에 한 줄씩 */
  const businessIds = listServices("business").map((s) => s.id as string);
  const startingPrices = [
    {
      name: serviceLines.hospital.name,
      value: minPrice(geoPlans.map((p) => p.monthly)),
      basis: "월 구독 (AI 검색 최적화)",
    },
    {
      name: serviceLines.business.name,
      value: minPrice(solutionPlans.filter((p) => businessIds.includes(p.id)).map((p) => p.setup)),
      basis: "도입 세팅비",
    },
    {
      name: "맞춤 개발",
      value: minPrice(outsourcingDeposits.map((p) => p.setup)),
      basis: "정찰가 계약금",
    },
  ];
  const lines = c.entry.lines;

  return (
    <>
      <PageHeader eyebrow={site.legalName} title={site.tagline} lead={site.description}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact}>{c.hero.primaryCta}</ButtonLink>
          <ButtonLink href={routes.portfolio} variant="secondary">
            {c.hero.secondaryCta}
          </ButtonLink>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <li>포트폴리오 {portfolioItems.length}건</li>
          <li>{groupCounts.map((g) => `${g.label} ${g.count}`).join(" · ")}</li>
          <li>운영 중인 고객사 [ 숫자 ]</li>
        </ul>
        <WireBox label="이미지 · 대표 화면" size="lg" />
      </PageHeader>

      <Section label="S2 · 세 갈래" title={c.entry.title}>
        <CardGrid>
          <EntryCard
            title={serviceLines.hospital.name}
            href={routes.hospital.root}
            description={lines.hospital.description}
            start={lines.hospital.start}
            moreLabel={c.entry.more}
          >
            <BulletList items={listServices("hospital").map((s) => s.name)} />
          </EntryCard>
          <EntryCard
            title={serviceLines.business.name}
            href={routes.solutions.root}
            description={lines.business.description}
            start={lines.business.start}
            moreLabel={c.entry.more}
          >
            <BulletList items={listServices("business").map((s) => s.name)} />
          </EntryCard>
          <EntryCard
            title="맞춤 개발"
            href={routes.development.root}
            description={lines.development.description}
            start={lines.development.start}
            moreLabel={c.entry.more}
          >
            <BulletList items={developmentAreas} />
          </EntryCard>
        </CardGrid>
      </Section>

      <Section label="S3 · 대표 사례" title={c.cases.title}>
        <CardGrid>
          {featured.map((item) => (
            <LinkCard
              key={item.slug}
              href={routes.portfolioDetail(item.slug)}
              title={item.title}
              description={item.tag}
            >
              <WireBox label="이미지" size="sm" />
            </LinkCard>
          ))}
        </CardGrid>
        <ButtonLink href={routes.portfolio} variant="secondary">
          포트폴리오 전체 보기
        </ButtonLink>
      </Section>

      <Section label="S4 · 제공 방식" title={c.models.title} description={c.models.note}>
        <DataTable
          columns={["방식", "대표 상품", "제공 방식", "요금 방식"]}
          rows={businessModels.map((m) => [m.type, m.products, m.delivery, m.revenue])}
        />
      </Section>

      <Section label="S5 · 진행 순서" title={c.workflow.title}>
        <DataTable
          columns={["단계", "내용"]}
          rows={workflow.map((w, index) => [`${index + 1}. ${w.step}`, w.detail])}
        />
      </Section>

      <Section label="S6 · 보유 모듈" title={c.modules.title} description={c.modules.description}>
        <CardGrid>
          {modules.map((m) => (
            <IconTile key={m} label={m} />
          ))}
        </CardGrid>
      </Section>

      <Section label="S7 · 요금" title={c.pricing.title} description="금액은 VAT 포함입니다.">
        <DataTable
          columns={["갈래", "시작 가격", "기준"]}
          rows={startingPrices.map((p) => [
            p.name,
            p.value === null ? "별도 견적" : `${formatKRW(p.value)}부터`,
            p.basis,
          ])}
        />
        <ButtonLink href={routes.pricing} variant="secondary">
          요금 안내 보기
        </ButtonLink>
      </Section>

      <Section label="S8 · 상담" title={c.closing.title} description={c.closing.description}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact}>{c.hero.primaryCta}</ButtonLink>
          <ButtonLink href={routes.development.estimate} variant="secondary">
            맞춤 개발 견적
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
