import type { Metadata } from "next";
import { GeoLandingPage } from "@/features/geo";

export const metadata: Metadata = { title: "사피어 AI 검색 최적화" };

export default function Page() {
  return <GeoLandingPage />;
}
