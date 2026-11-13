import type { Metadata } from "next";
import { HospitalWebsitePage } from "@/features/hospital";

export const metadata: Metadata = { title: "사피어 병원 홈페이지" };

export default function Page() {
  return <HospitalWebsitePage />;
}
