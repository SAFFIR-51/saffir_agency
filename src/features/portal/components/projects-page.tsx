import { portalMenuItems } from "@/content/portal";
import { routes } from "@/shared/config";
import { ScreenOutline } from "@/shared/layout";

export function ProjectsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="프로젝트"
      items={portalMenuItems("프로젝트")}
      empty={{
        message: "진행 중인 프로젝트가 없습니다. 계약하면 단계별 진행 현황이 여기에 보입니다.",
        action: { label: "견적 요청", href: routes.development.estimate },
      }}
    />
  );
}
