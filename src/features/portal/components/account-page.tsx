import { accountIssueSteps, portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";
import { DataTable, Section } from "@/shared/ui";

export function AccountPage() {
  return (
    <ScreenOutline eyebrow="포털" title="계정" items={portalMenuItems("계정")}>
      <Section label="S3 · 계정 발급" title="계약 고객의 포털 계정은 이렇게 만들어집니다">
        <DataTable
          columns={["단계", "내용"]}
          rows={accountIssueSteps.map((s, index) => [`${index + 1}. ${s.step}`, s.detail])}
        />
      </Section>
    </ScreenOutline>
  );
}
