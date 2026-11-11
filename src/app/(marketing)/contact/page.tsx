import type { Metadata } from "next";
import { ContactPage } from "@/features/inquiry";

export const metadata: Metadata = { title: "문의" };

export default function Page() {
  return <ContactPage />;
}
