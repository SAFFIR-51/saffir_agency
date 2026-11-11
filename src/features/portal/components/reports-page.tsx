import { ScreenOutline } from "@/shared/layout";
import { menuItems } from "../model/content";

export function ReportsPage() {
  return <ScreenOutline eyebrow="포털" title="작업 보고" items={menuItems("작업 보고")} />;
}
