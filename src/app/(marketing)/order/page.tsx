import type { Metadata } from "next";
import { OrderPage } from "@/features/billing";

export const metadata: Metadata = { title: "주문서", robots: { index: false } };

export default function Page({ searchParams }: PageProps<"/order">) {
  return <OrderPage searchParams={searchParams} />;
}
