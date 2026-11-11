import { ScreenOutline } from "@/shared/layout";
import { geoPortalItems } from "../model/content";

export function GeoPortalPage() {
  return <ScreenOutline eyebrow="포털" title="GEO" items={geoPortalItems} />;
}
