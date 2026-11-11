import { installedSolutionRows, systemArchitecture } from "@/content/company";
import { crmSecurity } from "@/content/hospital";
import { BulletList, DataTable, PageHeader, Section, WireBox } from "@/shared/ui";
import { securityContent as c } from "../model/content";

export function SecurityPage() {
  return (
    <>
      <PageHeader title="보안·데이터 정책" lead={c.lead} />
      <Section label="S2 · 병원 CRM" title="병원 CRM 보안">
        <BulletList items={[...crmSecurity.items, crmSecurity.messaging]} />
      </Section>
      <Section label="S3 · 설치와 소유" title="설치와 데이터 소유">
        <DataTable
          columns={["항목", "내용"]}
          rows={installedSolutionRows.map((r) => [r.item, r.detail])}
        />
      </Section>
      <Section label="S4 · 시스템 구성" title="시스템 구성">
        <WireBox label="구성도 · 사이트, 코어 서버, 고객사 서버" size="lg" />
        <BulletList items={systemArchitecture} />
      </Section>
      <Section label="S5 · 세부 정책" title="세부 정책">
        <WireBox label={c.details} />
      </Section>
    </>
  );
}
