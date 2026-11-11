import { BulletList, PageHeader, Section, WireBox } from "@/shared/ui";
import { privacyOutline } from "../model/content";

export function PrivacyPage() {
  return (
    <>
      <PageHeader title="개인정보처리방침" />
      <Section label="S2 · 목차" title="들어갈 내용">
        <BulletList items={privacyOutline} />
      </Section>
      <Section label="S3 · 본문">
        <WireBox label="개인정보처리방침 본문" size="lg" />
      </Section>
    </>
  );
}
