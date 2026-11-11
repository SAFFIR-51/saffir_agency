import { installedSolutionRows } from "@/content/company";
import { listServices } from "@/content/services";
import { routes } from "@/shared/config";
import { ButtonLink, CardGrid, DataTable, LinkCard, PageHeader, Section } from "@/shared/ui";
import { solutionsOverviewContent as c } from "../model/content";

export function SolutionsOverviewPage() {
  return (
    <>
      <PageHeader eyebrow="비즈니스 솔루션" title={c.title} lead={c.lead} />
      <Section label="S2 · 솔루션" title="솔루션 3가지">
        <CardGrid>
          {listServices("business").map((s) => (
            <LinkCard key={s.id} href={s.href} title={s.name} description={s.message} />
          ))}
        </CardGrid>
      </Section>
      <Section label="S3 · 제공 방식" title="이렇게 제공합니다">
        <DataTable
          columns={["항목", "내용"]}
          rows={installedSolutionRows.map((r) => [r.item, r.detail])}
        />
      </Section>
      <Section label="S4 · 상담" title={c.closing.title} description={c.closing.description}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact}>도입 상담</ButtonLink>
          <ButtonLink href={`${routes.pricing}#solutions`} variant="secondary">
            요금 보기
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
