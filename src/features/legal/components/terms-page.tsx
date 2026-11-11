import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";
import { termsOutline } from "../model/content";

export function TermsPage() {
  return (
    <>
      <PageHeader title="이용약관" />
      <Section title="들어갈 항목 (안)">
        <BulletList items={termsOutline} />
        <Todo>약관 본문 (법인명: 주식회사 사피어테크놀로지)</Todo>
      </Section>
    </>
  );
}
