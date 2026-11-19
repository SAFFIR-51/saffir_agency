import type { Metadata } from "next";
import { ErpPage } from "@/features/solutions";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "사피어 업무 통합 ERP",
  description:
    "재고 확인부터 발주·정산까지 한 시스템에서 관리하는 업무 통합 ERP입니다. 기존 엑셀 데이터는 업무 단위로 정리해 단계적으로 옮깁니다.",
  path: routes.solutions.erp,
  og: "erp",
});

export default function Page() {
  return <ErpPage />;
}
