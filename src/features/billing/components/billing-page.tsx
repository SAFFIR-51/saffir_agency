import { PagePlaceholder } from "@/shared/layout";

export function BillingPage() {
  return (
    <PagePlaceholder
      title="청구·결제"
      sections={[
        "청구 목록",
        "결제하기",
        "자동결제 카드 관리",
        "영수증·세금계산서 요청",
        "구독 해지",
      ]}
    />
  );
}
