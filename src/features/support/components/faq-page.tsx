import { routes } from "@/shared/config";
import { faqByCategory } from "@/content/faq";
import { ButtonLink, DataTable, PageHeader, Section } from "@/shared/ui";
import { faqCategories } from "../model/content";

export function FaqPage() {
  return (
    <>
      <PageHeader title="자주 묻는 질문" />
      {faqCategories.map((category, index) => (
        <Section
          key={category.key}
          label={`S${index + 2} · ${category.label}`}
          title={category.label}
        >
          <DataTable
            columns={["질문", "답변"]}
            rows={faqByCategory(category.key).map((f) => [f.q, f.a])}
          />
        </Section>
      ))}
      <Section
        label={`S${faqCategories.length + 2} · 문의`}
        title="답을 못 찾으셨나요?"
        description="궁금한 점을 남겨 주시면 담당자가 답해 드립니다."
      >
        <ButtonLink href={routes.contact}>문의하기</ButtonLink>
      </Section>
    </>
  );
}
