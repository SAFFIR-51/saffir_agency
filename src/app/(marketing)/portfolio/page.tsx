import type { Metadata } from "next";
import { PortfolioListPage } from "@/features/portfolio";

export const metadata: Metadata = { title: "포트폴리오" };

export default function Page() {
  return <PortfolioListPage />;
}
