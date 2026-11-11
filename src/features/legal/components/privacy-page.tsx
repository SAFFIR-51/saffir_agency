import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";
import { privacyOutline } from "../model/content";

export function PrivacyPage() {
  return (
    <>
      <PageHeader title="개인정보처리방침" />
      <Section title="들어갈 항목 (안)">
        <BulletList items={privacyOutline} />
        <Todo>개인정보처리방침 본문</Todo>
      </Section>
    </>
  );
}
