import { PageHeader, Section, WireBox } from "@/shared/ui";
import { faqCategories } from "../model/content";

export function FaqPage() {
  return (
    <>
      <PageHeader title="자주 묻는 질문" />
      {faqCategories.map((category, index) => (
        <Section key={category} label={`S${index + 2} · ${category}`} title={category}>
          <WireBox label="질문과 답변 목록" />
        </Section>
      ))}
    </>
  );
}
