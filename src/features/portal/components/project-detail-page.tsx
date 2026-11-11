import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  return (
    <ScreenOutline
      eyebrow="포털 · 프로젝트"
      title={`프로젝트 ${projectId}`}
      items={portalMenuItems("프로젝트")}
    />
  );
}
