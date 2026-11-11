import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function ProjectsPage() {
  return <ScreenOutline eyebrow="포털" title="프로젝트" items={portalMenuItems("프로젝트")} />;
}
