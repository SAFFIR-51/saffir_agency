import { accountIssueSteps } from "@/content/portal";
import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";
import { DataTable, PageHeader, Section, WireButton, WireInput } from "@/shared/ui";
import { PortalPage } from "./portal-page";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.account);
  return (
    <>
      <PageHeader eyebrow="포털" title="계정" lead={session.email} />
      <Section label="S2 · 회사 정보" title="회사·병원 정보">
        <DataTable
          columns={["항목", "내용"]}
          rows={[
            ["이름", data.company.name],
            ["사업자등록번호", data.company.businessNumber],
            ["세금계산서 받을 이메일", data.company.taxEmail],
          ]}
        />
        <WireButton>정보 수정</WireButton>
      </Section>
      <Section
        label="S3 · 담당자"
        title="담당자"
        description="여러 명이 같은 고객사 계정을 씁니다."
      >
        <DataTable
          columns={["이름", "이메일", "역할"]}
          rows={data.members.map((m) => [m.name, m.email, m.role])}
        />
        <div className="max-w-sm space-y-3">
          <WireInput label="초대할 동료 이메일" placeholder="name@example.com" />
          <WireButton>초대 메일 보내기</WireButton>
        </div>
      </Section>
      <Section label="S4 · 계정 발급" title="계약 고객의 포털 계정은 이렇게 만들어집니다">
        <DataTable
          columns={["단계", "내용"]}
          rows={accountIssueSteps.map((s, index) => [`${index + 1}. ${s.step}`, s.detail])}
        />
      </Section>
    </>
  );
}

export function AccountPage() {
  return (
    <PortalPage title="계정">
      <Body />
    </PortalPage>
  );
}
