import type { Metadata } from "next";
import { PlanNotesPage } from "@/features/plan-notes";

export const metadata: Metadata = {
  title: "기획 메모 (내부)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PlanNotesPage />;
}
