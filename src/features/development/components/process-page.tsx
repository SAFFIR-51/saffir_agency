import { projectStages } from "@/content/company";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, PageHeader, Section } from "@/shared/ui";
import { processContent } from "../model/content";

export function ProcessPage() {
  return (
    <>
      <PageHeader eyebrow="맞춤 개발" title={processContent.title} lead={processContent.lead} />
      <Section title="진행 단계">
        <BulletList ordered items={projectStages} />
      </Section>
      <Section title="포털에서 확인하는 것">
        <BulletList items={processContent.portal} />
      </Section>
      <Section title="계약과 납품 후">
        <BulletList items={processContent.payment} />
      </Section>
      <Section title="시작하기">
        <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
      </Section>
    </>
  );
}
