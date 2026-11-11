import type { Metadata } from "next";
import { AccountPage } from "@/features/portal";

export const metadata: Metadata = { title: "계정" };

export default function Page() {
  return <AccountPage />;
}
