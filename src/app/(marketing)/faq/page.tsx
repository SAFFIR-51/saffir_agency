import type { Metadata } from "next";
import { FaqPage } from "@/features/support";

export const metadata: Metadata = { title: "FAQ" };

export default function Page() {
  return <FaqPage />;
}
