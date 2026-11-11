import type { Metadata } from "next";
import { SecurityPage } from "@/features/legal";

export const metadata: Metadata = { title: "보안·데이터 정책" };

export default function Page() {
  return <SecurityPage />;
}
