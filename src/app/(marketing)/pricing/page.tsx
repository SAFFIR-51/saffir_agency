import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing";

export const metadata: Metadata = { title: "요금 안내" };

export default function Page() {
  return <PricingPage />;
}
