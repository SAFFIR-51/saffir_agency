import { coreServerNotes, portalMenuItems } from "@/content/portal";
import { ScreenOutline } from "@/shared/layout";
import { BulletList, Section } from "@/shared/ui";

export function MySolutionsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="내 솔루션"
      lead="솔루션은 고객사 전용 서버에서 쓰고, 여기에서는 바로가기와 상태를 봅니다."
      items={portalMenuItems("내 솔루션")}
    >
      <Section label="S3 · 사용량" title="서버 상태와 사용량">
        <BulletList items={coreServerNotes} />
      </Section>
    </ScreenOutline>
  );
}
