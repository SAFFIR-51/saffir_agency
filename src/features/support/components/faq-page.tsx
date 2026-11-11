import { faqCategories } from "../model/content";
import { PageHeader, Section, Todo } from "@/shared/ui";

export function FaqPage() {
  return (
    <>
      <PageHeader title="자주 묻는 질문" />
      {faqCategories.map((category) => (
        <Section key={category} title={category}>
          <Todo>{category} 질문과 답변</Todo>
        </Section>
      ))}
    </>
  );
}
