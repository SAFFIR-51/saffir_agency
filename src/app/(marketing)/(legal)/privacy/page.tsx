import type { Metadata } from "next";
import { PrivacyPage } from "@/features/legal";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function Page() {
  return <PrivacyPage />;
}
