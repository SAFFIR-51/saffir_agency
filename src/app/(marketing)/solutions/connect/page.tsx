import type { Metadata } from "next";
import { ConnectPage } from "@/features/solutions";

export const metadata: Metadata = { title: "사피어 커머스 연동" };

export default function Page() {
  return <ConnectPage />;
}
