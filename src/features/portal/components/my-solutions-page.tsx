import { coreServerNotes, portalMenuItems } from "@/content/portal";
import { routes } from "@/shared/config";
import { ScreenOutline } from "@/shared/layout";
import { BulletList, Section } from "@/shared/ui";

export function MySolutionsPage() {
  return (
    <ScreenOutline
      eyebrow="포털"
      title="내 솔루션"
      lead="솔루션은 고객사 전용 서버에서 쓰고, 여기에서는 바로가기와 상태를 봅니다."
      items={portalMenuItems("내 솔루션")}
      empty={{
        message:
          "도입한 솔루션이 없습니다. 솔루션을 도입하면 전용 서버 바로가기와 상태가 여기에 보입니다.",
        action: { label: "솔루션 요금 보기", href: `${routes.pricing}#solutions` },
      }}
    >
      <Section label="S3 · 사용량" title="서버 상태와 사용량">
        <BulletList items={coreServerNotes} />
      </Section>
    </ScreenOutline>
  );
}
