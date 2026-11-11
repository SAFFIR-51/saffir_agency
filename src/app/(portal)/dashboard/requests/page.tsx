import type { Metadata } from "next";
import { RequestsPage } from "@/features/portal";

export const metadata: Metadata = { title: "요청·문의" };

export default function Page() {
  return <RequestsPage />;
}
