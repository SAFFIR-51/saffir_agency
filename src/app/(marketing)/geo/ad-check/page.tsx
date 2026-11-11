import type { Metadata } from "next";
import { AdCheckPage } from "@/features/geo";

export const metadata: Metadata = { title: "사피어 의료광고 검사기" };

export default function Page() {
  return <AdCheckPage />;
}
