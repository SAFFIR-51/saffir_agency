import { portalMenuItems } from "@/content/portal";
import { routes } from "@/shared/config";
import { ScreenOutline } from "@/shared/layout";

export function GeoPortalPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="GEO"
      items={portalMenuItems("GEO")}
      empty={{
        message: "진단 기록이 없습니다. 홈페이지 주소로 무료 진단을 해 보세요.",
        action: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
      }}
    />
  );
}
