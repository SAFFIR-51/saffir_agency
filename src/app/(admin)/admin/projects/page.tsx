import type { Metadata } from "next";
import { AdminProjectsPage } from "@/features/admin";

export const metadata: Metadata = { title: "프로젝트" };

export default function Page() {
  return <AdminProjectsPage />;
}
