import type { Metadata } from "next";
import { MySolutionsPage } from "@/features/portal";

export const metadata: Metadata = { title: "내 솔루션" };

export default function Page() {
  return <MySolutionsPage />;
}
