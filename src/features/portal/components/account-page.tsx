import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function AccountPage() {
  return <ScreenOutline eyebrow="포털" title="계정" items={portalMenuItems("계정")} />;
}
