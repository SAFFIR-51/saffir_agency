import { portalMenuItems } from "@/content/portal";
import { routes } from "@/shared/config";
import { ScreenOutline } from "@/shared/layout";

export function PortalHomePage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="홈"
      items={portalMenuItems("홈")}
      empty={{
        message: "아직 진행 중인 일이 없습니다. 무료 진단을 해 보거나 도입 상담을 신청해 보세요.",
        action: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
      }}
    />
  );
}
