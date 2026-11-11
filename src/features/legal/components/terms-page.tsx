import { BulletList, PageHeader, Section, WireBox } from "@/shared/ui";
import { termsOutline } from "../model/content";

export function TermsPage() {
  return (
    <>
      <PageHeader title="이용약관" />
      <Section label="S2 · 목차" title="들어갈 내용">
        <BulletList items={termsOutline} />
      </Section>
      <Section label="S3 · 본문">
        <WireBox label="이용약관 본문" size="lg" />
      </Section>
    </>
  );
}
