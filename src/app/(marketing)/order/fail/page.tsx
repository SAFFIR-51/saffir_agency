import type { Metadata } from "next";
import { OrderFailPage } from "@/features/billing";

export const metadata: Metadata = { title: "결제 실패", robots: { index: false } };

export default function Page({ searchParams }: PageProps<"/order/fail">) {
  return <OrderFailPage searchParams={searchParams} />;
}
