import { BulletList, PageHeader, Section } from "@/shared/ui";

/** 아직 기능이 없는 화면의 뼈대: 제목 + 이 화면에 들어갈 것 + 추가 설명 */
export function ScreenOutline({
  eyebrow,
  title,
  lead,
  items,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  items: string[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <Section title="이 화면에 들어갈 것">
        <BulletList items={items} />
      </Section>
      {children}
    </>
  );
}
