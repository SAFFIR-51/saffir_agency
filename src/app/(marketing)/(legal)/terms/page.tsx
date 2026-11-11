import type { Metadata } from "next";
import { TermsPage } from "@/features/legal";

export const metadata: Metadata = { title: "이용약관" };

export default function Page() {
  return <TermsPage />;
}
