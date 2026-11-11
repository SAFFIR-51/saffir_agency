import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function RequestsPage() {
  return <ScreenOutline eyebrow="포털" title="요청·문의" items={portalMenuItems("요청·문의")} />;
}
