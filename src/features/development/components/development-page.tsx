import Link from "next/link";
import { modules } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { outsourcingDeposits, outsourcingNotes } from "@/content/pricing";
import { routes } from "@/shared/config";
import {
  ButtonLink,
  CardGrid,
  DataTable,
  IconTile,
  PageHeader,
  PlanTable,
  Section,
} from "@/shared/ui";
import { developmentContent as c } from "../model/content";

export function DevelopmentPage() {
  return (
    <>
      <PageHeader eyebrow="맞춤 개발" title={c.title} lead={c.lead}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
          <ButtonLink href={routes.development.process} variant="secondary">
            개발 프로세스
          </ButtonLink>
        </div>
      </PageHeader>

      <Section label="S2 · 개발 분야" title="이런 것을 만듭니다">
        <DataTable
          columns={["분야", "관련 프로젝트"]}
          rows={c.areas.map((area) => [
            area.name,
            <span key={area.name} className="flex flex-wrap gap-x-3 gap-y-1">
              {area.slugs
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
            </span>,
          ])}
        />
      </Section>

      <Section
        label="S3 · 보유 모듈"
        title="이미 갖춘 모듈"
        description="처음부터 짜지 않아서 빠릅니다."
      >
        <CardGrid>
          {modules.map((m) => (
            <IconTile key={m} label={m} />
          ))}
        </CardGrid>
      </Section>

      <Section label="S4 · 정찰가" title="정찰가 패키지" description="금액은 VAT 포함입니다.">
        <PlanTable
          plans={outsourcingDeposits}
          setupLabel="계약금"
          caption={outsourcingNotes.join(" ")}
          actions={{ consultFallback: "hospital-website" }}
        />
      </Section>

      <Section label="S5 · 진행 방식" title="단계마다 확인하고 승인합니다">
        <ButtonLink href={routes.development.process} variant="secondary">
          개발 프로세스 보기
        </ButtonLink>
      </Section>

      <Section label="S6 · 견적" title="만들고 싶은 것을 알려주세요">
        <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
      </Section>
    </>
  );
}
