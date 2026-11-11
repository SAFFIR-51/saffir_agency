import type { Metadata } from "next";
import { InvitePage } from "@/features/auth";

export const metadata: Metadata = { title: "포털 초대", robots: { index: false } };

export default function Page() {
  return <InvitePage />;
}
