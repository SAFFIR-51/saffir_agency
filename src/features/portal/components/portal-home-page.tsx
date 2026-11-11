import { portalMenuItems } from "@/content/portal";
import {
  isPortalMenuVisible,
  memberKindLabels,
  portalNav,
  routes,
  type MemberKind,
} from "@/shared/config";
import { ScreenOutline } from "@/shared/layout";
import { DataTable, Section } from "@/shared/ui";

const kinds = Object.keys(memberKindLabels) as MemberKind[];

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
    >
      <Section
        label="S3 · 메뉴 노출"
        title="가입한 서비스에 따라 보이는 메뉴"
        description="포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨집니다. 여러 서비스를 쓰면 해당 메뉴가 모두 보입니다."
      >
        <DataTable
          columns={["메뉴", ...kinds.map((k) => memberKindLabels[k])]}
          rows={portalNav.map((item) => [
            item.label,
            ...kinds.map((k) => (isPortalMenuVisible(item, [k]) ? "O" : "-")),
          ])}
        />
      </Section>
    </ScreenOutline>
  );
}
