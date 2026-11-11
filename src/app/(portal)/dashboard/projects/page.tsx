import type { Metadata } from "next";
import { ProjectsPage } from "@/features/portal";

export const metadata: Metadata = { title: "프로젝트" };

export default function Page() {
  return <ProjectsPage />;
}
