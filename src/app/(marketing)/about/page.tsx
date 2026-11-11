import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = { title: "회사 소개" };

export default function Page() {
  return <AboutPage />;
}
