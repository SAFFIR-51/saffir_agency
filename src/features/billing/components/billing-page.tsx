import { portalMenuItems } from "@/content/portal";
import { paymentTypes } from "@/content/pricing";
import { ScreenOutline } from "@/shared/layout";
import { DataTable, Section } from "@/shared/ui";

export function BillingPage() {
  return (
    <ScreenOutline eyebrow="포털" title="청구·결제" items={portalMenuItems("청구·결제")}>
      <Section label="S3 · 결제 유형" title="결제 유형">
        <DataTable
          columns={["결제 유형", "대상 상품", "결제 위치", "결제 수단"]}
          rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
        />
      </Section>
    </ScreenOutline>
  );
}
