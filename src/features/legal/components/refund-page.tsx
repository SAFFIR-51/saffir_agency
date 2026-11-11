import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";
import { refundOutline } from "../model/content";

export function RefundPage() {
  return (
    <>
      <PageHeader title="취소 및 환불 규정" />
      <Section title="들어갈 항목 (안)">
        <BulletList items={refundOutline} />
        <Todo>상품별 취소·환불 조건 본문</Todo>
      </Section>
    </>
  );
}
