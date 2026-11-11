import Link from "next/link";
import { businessFlywheel, developmentClaim, modules } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { outsourcingDeposits, outsourcingNotes } from "@/content/pricing";
import { routes } from "@/shared/config";
import {
  BulletList,
  ButtonLink,
  Note,
  PageHeader,
  PlanTable,
  Section,
  Subheading,
} from "@/shared/ui";
import { developmentContent } from "../model/content";

export function DevelopmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="맞춤 개발"
        title={developmentContent.title}
        lead={developmentContent.lead}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
          <ButtonLink href={routes.development.process} variant="secondary">
            개발 프로세스
          </ButtonLink>
        </div>
      </PageHeader>

      <Section title="개발 분야">
        {developmentContent.areas.map((area) => (
          <div key={area.name} className="space-y-2">
            <Subheading>{area.name}</Subheading>
            <BulletList
              items={area.slugs
                .map((slug) => portfolioItems.find((item) => item.slug === slug))
                .filter((item) => item !== undefined)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={routes.portfolioDetail(item.slug)}
                    className="underline underline-offset-4"
                  >
                    {item.title}
                  </Link>
                ))}
            />
          </div>
        ))}
      </Section>

      <Section title="보유 모듈로 빠르게 만듭니다" description={developmentClaim.text}>
        <BulletList items={modules} />
        <Note title="확인 필요">
          <p>{developmentClaim.caution}</p>
        </Note>
      </Section>

      <Section title="정찰가 패키지" description="금액은 VAT 포함입니다.">
        <PlanTable plans={outsourcingDeposits} setupLabel="계약금" />
        <BulletList items={outsourcingNotes} />
      </Section>

      <Section title="외주가 솔루션이 됩니다">
        <BulletList items={businessFlywheel} />
      </Section>

      <Section title="견적 요청">
        <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
      </Section>
    </>
  );
}
