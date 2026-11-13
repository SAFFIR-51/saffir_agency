import type { Metadata } from "next";
import { HospitalOverviewPage } from "@/features/hospital";

export const metadata: Metadata = { title: "병원 솔루션" };

export default function Page() {
  return <HospitalOverviewPage />;
}
