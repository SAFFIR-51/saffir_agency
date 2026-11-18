import type { Metadata } from "next";
import { ProcessPage } from "@/features/development";

export const metadata: Metadata = { title: "맞춤 개발 소개" };

export default function Page() {
  return <ProcessPage />;
}
