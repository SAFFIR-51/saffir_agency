import { CardGrid, PageHeader, Section, WireBox } from "@/shared/ui";

/** 포털 화면 와이어프레임: S1 제목 + S2 화면 구성(위젯 자리) + 추가 섹터 */
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
      <PageHeader label="S1 · 제목" eyebrow={eyebrow} title={title} lead={lead} />
      <Section label="S2 · 화면 구성">
        <CardGrid columns={2}>
          {items.map((item) => (
            <WireBox key={item} label={item} />
          ))}
        </CardGrid>
      </Section>
      {children}
    </>
  );
}
