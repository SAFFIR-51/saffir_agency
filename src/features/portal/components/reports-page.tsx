import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function ReportsPage() {
  return <ScreenOutline eyebrow="포털" title="작업 보고" items={portalMenuItems("작업 보고")} />;
}
