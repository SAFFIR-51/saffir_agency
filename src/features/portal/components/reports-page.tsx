import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function ReportsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="작업 보고"
      items={portalMenuItems("작업 보고")}
      empty={{ message: "아직 작업 보고가 없습니다. 프로젝트가 시작되면 매주 보고가 올라옵니다." }}
    />
  );
}
