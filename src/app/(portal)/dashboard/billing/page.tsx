import type { Metadata } from "next";
import { BillingPage } from "@/features/billing";

export const metadata: Metadata = { title: "청구·결제" };

export default function Page() {
  return <BillingPage />;
}
