import type { Metadata } from "next";
import { RefundPage } from "@/features/legal";

export const metadata: Metadata = { title: "취소 및 환불 규정" };

export default function Page() {
  return <RefundPage />;
}
