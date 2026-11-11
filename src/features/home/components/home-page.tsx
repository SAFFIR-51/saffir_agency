import { businessModels, developmentAreas, modules, workflow } from "@/content/company";
import { portfolioGroups, portfolioItems } from "@/content/portfolio";
import { geoPlans, hospitalWebsitePlans, solutionPlans } from "@/content/pricing";
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
  WireInput,
} from "@/shared/ui";
import { homeContent as c } from "../model/content";

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
  const featured = c.featuredSlugs
    .map((slug) => portfolioItems.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
  const startingPrices = [
    { name: "AI 검색 최적화", value: minPrice(geoPlans.map((p) => p.monthly)), basis: "월 구독" },
    {
      name: "병원 홈페이지",
      value: minPrice(hospitalWebsitePlans.map((p) => p.setup)),
      basis: "제작비",
    },
    {
      name: "구축형 솔루션",
      value: minPrice(solutionPlans.map((p) => p.setup)),
      basis: "도입 세팅비",
    },
  ];

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
          <LinkCard
            href={routes.hospital.root}
            title={serviceLines.hospital.name}
            description={c.entry.hospital}
          >
            <BulletList items={listServices("hospital").map((s) => s.name)} />
          </LinkCard>
          <LinkCard
            href={routes.solutions.root}
            title={serviceLines.business.name}
            description={c.entry.business}
          >
            <BulletList items={listServices("business").map((s) => s.name)} />
          </LinkCard>
          <LinkCard
            href={routes.development.root}
            title="맞춤 개발"
            description={c.entry.development}
          >
            <BulletList items={developmentAreas} />
          </LinkCard>
        </CardGrid>
      </Section>

      <Section
        label="S3 · 무료 진단"
        title={c.diagnosis.title}
        description={c.diagnosis.description}
      >
        <WireInput label="홈페이지 주소" placeholder="https://" />
        <ButtonLink href={routes.hospital.geo}>무료 진단하기</ButtonLink>
      </Section>

      <Section label="S4 · 일하는 방식" title={c.models.title}>
        <DataTable
          columns={["방식", "대표 상품", "제공 방식", "요금 방식", "소스·데이터"]}
          rows={businessModels.map((m) => [m.type, m.products, m.delivery, m.revenue, m.ownership])}
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

      <Section label="S7 · 대표 사례" title={c.cases.title}>
        <CardGrid>
          {featured.map((item) => (
            <LinkCard key={item.slug} href={routes.portfolioDetail(item.slug)} title={item.title}>
              <WireBox label="이미지" size="sm" />
            </LinkCard>
          ))}
        </CardGrid>
        <ButtonLink href={routes.portfolio} variant="secondary">
          포트폴리오 전체 보기
        </ButtonLink>
      </Section>

      <Section label="S8 · 요금" title={c.pricing.title} description="금액은 VAT 포함입니다.">
        <DataTable
          columns={["서비스", "시작 가격", "기준"]}
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

      <Section label="S9 · 상담" title={c.closing.title} description={c.closing.description}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact}>무료 상담</ButtonLink>
          <ButtonLink href={routes.development.estimate} variant="secondary">
            맞춤 개발 견적
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
