import { paymentTypes } from "@/content/pricing";
import { ScreenOutline } from "@/shared/layout";
import { BulletList, DataTable, Section } from "@/shared/ui";
import { billingItems, billingNotes } from "../model/content";

export function BillingPage() {
  return (
    <ScreenOutline eyebrow="포털" title="청구·결제" items={billingItems}>
      <Section title="결제 유형">
        <DataTable
          columns={["결제 유형", "대상 상품", "결제 위치", "토스 기능"]}
          rows={paymentTypes.map((p) => [p.type, p.products, p.where, p.toss])}
        />
        <BulletList items={billingNotes} />
      </Section>
    </ScreenOutline>
  );
}
