import { outsourcingDeposits } from "@/content/pricing";
import { PageHeader, PlanTable, Section, WireButton, WireInput } from "@/shared/ui";
import { estimateContent as c } from "../model/content";

export function EstimatePage() {
  return (
    <>
      <PageHeader eyebrow="맞춤 개발" title={c.title} lead={c.lead} />
      <Section label="S2 · 정찰가" title="정찰가 패키지" description="금액은 VAT 포함입니다.">
        <PlanTable plans={outsourcingDeposits} setupLabel="계약금" />
      </Section>
      <Section label="S3 · 요청서" title="견적 요청서">
        <div className="max-w-xl space-y-4">
          {c.fields.map((f) => (
            <WireInput key={f.label} {...f} />
          ))}
          <WireButton>견적 요청 보내기</WireButton>
        </div>
      </Section>
    </>
  );
}
