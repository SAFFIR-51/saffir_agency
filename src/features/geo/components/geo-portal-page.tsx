import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function GeoPortalPage() {
  return <ScreenOutline eyebrow="포털" title="GEO" items={portalMenuItems("GEO")} />;
}
