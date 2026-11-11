import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function PortalHomePage() {
  return <ScreenOutline eyebrow="포털" title="홈" items={portalMenuItems("홈")} />;
}
