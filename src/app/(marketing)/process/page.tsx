import type { Metadata } from "next";
import { ProcessPage } from "@/features/development";

export const metadata: Metadata = { title: "개발 프로세스" };

export default function Page() {
  return <ProcessPage />;
}
