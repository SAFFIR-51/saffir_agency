import type { Metadata } from "next";
import { EstimatePage } from "@/features/inquiry";

export const metadata: Metadata = { title: "견적 요청" };

export default function Page() {
  return <EstimatePage />;
}
