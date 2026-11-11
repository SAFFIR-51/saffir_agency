import { businessModels, modules, workflow } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { geoPlans, hospitalWebsitePlans, solutionPlans } from "@/content/pricing";
import { listServices, serviceLines } from "@/content/services";
import { routes, site } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import {
  BulletList,
  ButtonLink,
  CardGrid,
  DataTable,
  LinkCard,
  PageHeader,
  Section,
  Todo,
} from "@/shared/ui";
import { homeContent } from "../model/content";

function minPrice(values: Array<number | null | undefined>) {
  const prices = values.filter((v): v is number => typeof v === "number" && v > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function HomePage() {
  const medicalCount = portfolioItems.filter((item) => item.group === "medical").length;
  const featured = homeContent.featuredSlugs
    .map((slug) => portfolioItems.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
  const startingPrices = [
    { label: "AI 검색 최적화", value: minPrice(geoPlans.map((p) => p.monthly)), unit: "월" },
    {
      label: "병원 홈페이지",
      value: minPrice(hospitalWebsitePlans.map((p) => p.setup)),
      unit: "제작",
    },
    {
      label: "구축형 솔루션 세팅비",
      value: minPrice(solutionPlans.map((p) => p.setup)),
      unit: "1회",
    },
  ];

  return (
    <>
      <PageHeader eyebrow={site.legalName} title={site.tagline} lead={site.description}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.hospital.geo}>병원 홈페이지 무료 진단</ButtonLink>
          <ButtonLink href={routes.development.estimate} variant="secondary">
            맞춤 개발 견적
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <li>포트폴리오 {portfolioItems.length}건</li>
          <li>의료·헬스케어 {medicalCount}건</li>
          <li>운영 중인 고객사 수 (확인 후 표시)</li>
        </ul>
      </PageHeader>

      <Section title="세 갈래로 찾아오세요" description={homeContent.entryIntro}>
        <CardGrid>
          {(["hospital", "business"] as const).map((line) => (
            <LinkCard
              key={line}
              href={line === "hospital" ? routes.hospital.root : routes.solutions.root}
              title={serviceLines[line].name}
              description={serviceLines[line].description}
            >
              <BulletList items={listServices(line).map((s) => s.name)} />
            </LinkCard>
          ))}
          <LinkCard
            href={routes.development.root}
            title="맞춤 개발"
            description={homeContent.developmentCard}
          >
            <BulletList items={homeContent.developmentAreas} />
          </LinkCard>
        </CardGrid>
      </Section>

      <Section title={homeContent.geoBand.title} description={homeContent.geoBand.description}>
        <Todo>홈페이지 주소 입력창 (진단 기능 연결 예정)</Todo>
        <ButtonLink href={routes.hospital.geo}>무료 진단하기</ButtonLink>
      </Section>

      <Section title="사피어가 일하는 세 가지 방식">
        <DataTable
          columns={["판매 방식", "대표 상품", "제공 방식", "요금 방식", "소스 소유권"]}
          rows={businessModels.map((m) => [m.type, m.products, m.delivery, m.revenue, m.ownership])}
        />
      </Section>

      <Section title="만들고, 돌리고, 보여드립니다">
        <BulletList ordered items={workflow} />
      </Section>

      <Section title="보유 모듈로 빠르게 만듭니다" description={homeContent.modulesDescription}>
        <BulletList items={modules} />
      </Section>

      <Section title="대표 사례">
        <CardGrid>
          {featured.map((item) => (
            <LinkCard key={item.slug} href={routes.portfolioDetail(item.slug)} title={item.title} />
          ))}
        </CardGrid>
        <ButtonLink href={routes.portfolio} variant="secondary">
          포트폴리오 전체 보기
        </ButtonLink>
      </Section>

      <Section title="모든 요금을 공개합니다" description="금액은 VAT 포함입니다.">
        <BulletList
          items={startingPrices.map(
            (p) =>
              `${p.label}: ${p.value === null ? "별도 견적" : `${p.unit} ${formatKRW(p.value)}부터`}`,
          )}
        />
        <ButtonLink href={routes.pricing} variant="secondary">
          요금 안내 보기
        </ButtonLink>
      </Section>

      <Section title={homeContent.closing.title} description={homeContent.closing.description}>
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
