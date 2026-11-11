import { loginNotes, memberTypes } from "@/content/membership";
import { ScreenOutline } from "@/shared/layout";
import { BulletList, DataTable, Section } from "@/shared/ui";
import { menuItems, portalMenus } from "../model/content";

export function PortalHomePage() {
  return (
    <ScreenOutline eyebrow="포털" title="홈" items={menuItems("홈")}>
      <Section
        title="포털 메뉴"
        description="포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨집니다."
      >
        <DataTable
          columns={["메뉴", "내용"]}
          rows={portalMenus.map((m) => [m.menu, m.items.join(", ")])}
        />
      </Section>
      <Section title="회원 유형">
        <DataTable
          columns={["회원 유형", "대상", "볼 수 있는 것"]}
          rows={memberTypes.map((m) => [m.type, m.target, m.access])}
        />
        <BulletList items={loginNotes} />
      </Section>
    </ScreenOutline>
  );
}
