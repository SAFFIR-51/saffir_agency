import type { Metadata } from "next";
import { SolutionsOverviewPage } from "@/features/solutions";

export const metadata: Metadata = { title: "비즈니스 솔루션" };

export default function Page() {
  return <SolutionsOverviewPage />;
}
