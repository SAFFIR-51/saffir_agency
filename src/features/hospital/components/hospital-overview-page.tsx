import { hospitalDifferentiator, hospitalJourney } from "@/content/hospital";
import { growthBundleNotes } from "@/content/pricing";
import { listServices } from "@/content/services";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, CardGrid, LinkCard, PageHeader, Section } from "@/shared/ui";
import { hospitalOverviewContent } from "../model/content";

export function HospitalOverviewPage() {
  return (
    <>
      <PageHeader title={hospitalOverviewContent.title} lead={hospitalOverviewContent.lead}>
        <ButtonLink href={routes.hospital.geo}>무료 진단하기</ButtonLink>
      </PageHeader>

      <Section title="병원 솔루션">
        <CardGrid columns={2}>
          {listServices("hospital").map((s) => (
            <LinkCard key={s.id} href={s.href} title={s.name} description={s.message} />
          ))}
        </CardGrid>
      </Section>

      <Section title="병원 고객 흐름">
        <ol className="space-y-4">
          {hospitalJourney.map((step, index) => (
            <li key={step.title}>
              <p className="font-semibold">
                {index + 1}. {step.title}
              </p>
              <p className="mt-1 text-foreground/70">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="왜 한 곳에 맡겨야 하나요">
        <BulletList items={hospitalDifferentiator} />
      </Section>

      <Section title="병원 성장 패키지">
        <BulletList items={growthBundleNotes} />
        <ButtonLink href={`${routes.pricing}#bundle`} variant="secondary">
          요금 안내 보기
        </ButtonLink>
      </Section>
    </>
  );
}
