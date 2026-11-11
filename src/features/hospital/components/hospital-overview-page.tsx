import { hospitalDifferentiator, hospitalJourney } from "@/content/hospital";
import { geoPlans, hospitalGrowthBundle, solutionPlans } from "@/content/pricing";
import { listServices } from "@/content/services";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { ButtonLink, CardGrid, DataTable, LinkCard, PageHeader, Section } from "@/shared/ui";
import { hospitalOverviewContent as c } from "../model/content";

export function HospitalOverviewPage() {
  const bundle = hospitalGrowthBundle;
  const separate = [...geoPlans, ...solutionPlans]
    .filter((p) => bundle.includes.includes(p.id))
    .reduce((sum, p) => sum + (p.monthly ?? 0), 0);

  return (
    <>
      <PageHeader eyebrow="병원 솔루션" title={c.title} lead={c.lead}>
        <ButtonLink href={routes.hospital.geo}>무료 진단하기</ButtonLink>
      </PageHeader>

      <Section label="S2 · 서비스" title={c.services}>
        <CardGrid columns={2}>
          {listServices("hospital").map((s) => (
            <LinkCard key={s.id} href={s.href} title={s.name} description={s.message} />
          ))}
        </CardGrid>
      </Section>

      <Section label="S3 · 고객 흐름" title={c.journey}>
        <DataTable
          columns={["단계", "하는 일", "서비스"]}
          rows={hospitalJourney.map((j, index) => [`${index + 1}. ${j.step}`, j.detail, j.service])}
        />
      </Section>

      <Section
        label="S4 · 차별점"
        title={hospitalDifferentiator.title}
        description={hospitalDifferentiator.description}
      />

      <Section label="S5 · 패키지" title={c.bundle} description="금액은 VAT 포함입니다.">
        <DataTable
          columns={["구성", "월 요금", "따로 쓸 때", "혜택"]}
          rows={[
            [bundle.includesLabel, formatKRW(bundle.monthly), formatKRW(separate), bundle.benefit],
          ]}
        />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contactFor("hospital-bundle")}>패키지 상담</ButtonLink>
          <ButtonLink href={`${routes.pricing}#bundle`} variant="secondary">
            요금 안내 보기
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
