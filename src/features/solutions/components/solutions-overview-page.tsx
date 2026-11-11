import { installedSolutionNotes } from "@/content/company";
import { listServices } from "@/content/services";
import { BulletList, CardGrid, LinkCard, PageHeader, Section } from "@/shared/ui";
import { solutionsOverviewContent } from "../model/content";

export function SolutionsOverviewPage() {
  return (
    <>
      <PageHeader title={solutionsOverviewContent.title} lead={solutionsOverviewContent.lead} />
      <Section title="솔루션">
        <CardGrid>
          {listServices("business").map((s) => (
            <LinkCard key={s.id} href={s.href} title={s.name} description={s.message} />
          ))}
        </CardGrid>
      </Section>
      <Section title="제공 방식">
        <BulletList items={installedSolutionNotes} />
      </Section>
    </>
  );
}
