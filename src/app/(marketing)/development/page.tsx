import type { Metadata } from "next";
import { DevelopmentPage } from "@/features/development";

export const metadata: Metadata = { title: "맞춤 개발" };

export default function Page() {
  return <DevelopmentPage />;
}
