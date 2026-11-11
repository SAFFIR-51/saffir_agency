import { ScreenOutline } from "@/shared/layout";
import { menuItems } from "../model/content";

export function ProjectsPage() {
  return <ScreenOutline eyebrow="포털" title="프로젝트" items={menuItems("프로젝트")} />;
}
