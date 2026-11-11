import type { Metadata } from "next";
import { PortalHomePage } from "@/features/portal";

export const metadata: Metadata = { title: "포털" };

export default function Page() {
  return <PortalHomePage />;
}
