import { outsourcingDeposits } from "@/content/pricing";
import { BulletList, PageHeader, PlanTable, Section, Todo } from "@/shared/ui";
import { estimateContent } from "../model/content";

export function EstimatePage() {
  return (
    <>
      <PageHeader eyebrow="맞춤 개발" title={estimateContent.title} lead={estimateContent.lead} />
      <Section title="정찰가 패키지" description="금액은 VAT 포함입니다.">
        <PlanTable plans={outsourcingDeposits} setupLabel="계약금" />
      </Section>
      <Section title="견적 요청 입력 항목 (안)">
        <BulletList items={estimateContent.fields} />
        <Todo>견적 요청 폼 (react-hook-form)</Todo>
      </Section>
    </>
  );
}
