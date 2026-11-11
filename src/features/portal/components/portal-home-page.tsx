import { PagePlaceholder } from "@/shared/layout";

export function PortalHomePage() {
  return (
    <PagePlaceholder
      title="포털 홈"
      sections={["성과", "진행 중인 프로젝트", "처리할 일 (승인 대기, 미결제 청구)", "최근 알림"]}
    />
  );
}
