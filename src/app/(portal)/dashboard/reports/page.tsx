import type { Metadata } from "next";
import { ReportsPage } from "@/features/portal";

export const metadata: Metadata = { title: "작업 보고" };

export default function Page() {
  return <ReportsPage />;
}
