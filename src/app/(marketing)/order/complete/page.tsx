import type { Metadata } from "next";
import { OrderCompletePage } from "@/features/billing";

export const metadata: Metadata = { title: "결제 완료", robots: { index: false } };

export default function Page({ searchParams }: PageProps<"/order/complete">) {
  return <OrderCompletePage searchParams={searchParams} />;
}
