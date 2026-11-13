import type { Metadata } from "next";
import { CrmPage } from "@/features/crm";

export const metadata: Metadata = { title: "사피어 병원 CRM" };

export default function Page() {
  return <CrmPage />;
}
