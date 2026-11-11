import type { Metadata } from "next";
import { GeoPortalPage } from "@/features/geo";

export const metadata: Metadata = { title: "GEO" };

export default function Page() {
  return <GeoPortalPage />;
}
