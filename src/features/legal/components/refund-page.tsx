import { DataTable, PageHeader, Section, WireBox } from "@/shared/ui";
import { refundOutline } from "../model/content";

export function RefundPage() {
  return (
    <>
      <PageHeader title="취소 및 환불 규정" />
      <Section label="S2 · 결제 유형별 기준" title="결제 유형별 기준">
        <DataTable
          columns={["결제 유형", "대상", "기준"]}
          rows={refundOutline.map((r) => [r.type, r.items, r.rule])}
        />
      </Section>
      <Section label="S3 · 본문">
        <WireBox label="취소 및 환불 규정 본문" size="lg" />
      </Section>
    </>
  );
}
