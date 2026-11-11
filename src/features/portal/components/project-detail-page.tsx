import { ScreenOutline } from "@/shared/layout";
import { menuItems } from "../model/content";

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  return (
    <ScreenOutline
      eyebrow="포털 · 프로젝트"
      title={`프로젝트 ${projectId}`}
      items={menuItems("프로젝트")}
    />
  );
}
