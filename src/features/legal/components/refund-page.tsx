import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";
import { refundOutline } from "../model/content";

export function RefundPage() {
  return (
    <>
      <PageHeader
        title="취소 및 환불 규정"
        lead="토스페이먼츠 심사 우선 오픈 범위에 포함되는 페이지입니다."
      />
      <Section title="들어갈 항목 (안)">
        <BulletList items={refundOutline} />
        <Todo>상품별 취소·환불 조건 본문</Todo>
      </Section>
    </>
  );
}
