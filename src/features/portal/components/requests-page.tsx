import { portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";

export function RequestsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="요청·문의"
      items={portalMenuItems("요청·문의")}
      empty={{
        message: "보낸 요청이 없습니다. 수정 요청이나 장애 신고를 여기서 보낼 수 있습니다.",
      }}
    />
  );
}
