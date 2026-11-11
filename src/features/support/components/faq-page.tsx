import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section, WireBox } from "@/shared/ui";
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
