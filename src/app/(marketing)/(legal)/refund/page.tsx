import type { Metadata } from "next";
import { RefundPage } from "@/features/legal";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "취소 및 환불 규정",
  description:
    "사피어 솔루션 세팅비·월 이용료·맞춤 개발 계약금의 결제 취소와 환불 기준을 안내합니다.",
  path: routes.legal.refund,
  og: "default",
});

export default function Page() {
  return <RefundPage />;
}
