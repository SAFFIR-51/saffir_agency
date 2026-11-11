import { projectStages } from "@/content/company";
import { portalMenuItems } from "@/content/portal";
import { routes } from "@/shared/config";
import { ButtonLink, DataTable, PageHeader, Section } from "@/shared/ui";
import { processContent as c } from "../model/content";

export function ProcessPage() {
  const portalRows = (["프로젝트", "작업 보고", "요청·문의"] as const).map((menu) => [
    menu,
    portalMenuItems(menu).join(", "),
  ]);
  return (
    <>
      <PageHeader eyebrow="맞춤 개발" title={c.title} lead={c.lead} />
      <Section label="S2 · 진행 단계" title="6단계로 진행합니다">
        <DataTable
          columns={["단계", "내용"]}
          rows={projectStages.map((s, index) => [`${index + 1}. ${s.stage}`, s.detail])}
        />
      </Section>
      <Section label="S3 · 포털" title="포털에서 확인합니다">
        <DataTable columns={["메뉴", "볼 수 있는 것"]} rows={portalRows} />
      </Section>
      <Section label="S4 · 계약" title="계약과 납품 후">
        <DataTable columns={["항목", "내용"]} rows={c.contract.map((r) => [r.item, r.detail])} />
      </Section>
      <Section label="S5 · 견적" title="시작하기">
        <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
      </Section>
    </>
  );
}
