import { ScreenOutline } from "@/shared/layout";
import { BulletList, Section } from "@/shared/ui";
import { coreServerNotes, menuItems } from "../model/content";

export function MySolutionsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="내 솔루션"
      lead="솔루션은 고객사 전용 서버에서 돌고, 여기에는 바로가기와 상태만 있습니다."
      items={menuItems("내 솔루션")}
    >
      <Section title="서버 상태와 사용량">
        <BulletList items={coreServerNotes} />
      </Section>
    </ScreenOutline>
  );
}
