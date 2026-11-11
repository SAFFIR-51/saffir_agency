import { installedSolutionNotes, systemArchitecture } from "@/content/company";
import { crmSecurity } from "@/content/hospital";
import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";

export function SecurityPage() {
  return (
    <>
      <PageHeader title="보안·데이터 정책" />
      <Section title="병원 CRM 보안">
        <BulletList items={crmSecurity.items} />
        <p>{crmSecurity.messaging}</p>
      </Section>
      <Section title="솔루션 설치와 데이터 소유">
        <BulletList items={installedSolutionNotes} />
      </Section>
      <Section title="시스템 구성">
        <BulletList items={systemArchitecture} />
      </Section>
      <Section title="세부 정책">
        <Todo>
          암호화 방식, 접근 권한 체계, 백업 주기·보관 기간, 계약 종료 시 데이터 반환·삭제 절차
        </Todo>
      </Section>
    </>
  );
}
