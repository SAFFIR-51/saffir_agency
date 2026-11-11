import type { Metadata } from "next";
import { ErpPage } from "@/features/solutions";

export const metadata: Metadata = { title: "사피어 업무 통합 ERP" };

export default function Page() {
  return <ErpPage />;
}
