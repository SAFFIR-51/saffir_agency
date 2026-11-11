import type { Route } from "next";
import { ButtonLink, CardGrid, PageHeader, Section, WireBox } from "@/shared/ui";

export type EmptyState = { message: string; action?: { label: string; href: Route } };

/** 포털 화면 와이어프레임: S1 제목 + S2 화면 구성(위젯 자리) + 추가 섹터 + 비어 있을 때 */
export function ScreenOutline({
  eyebrow,
  title,
  lead,
  items,
  empty,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** 위젯 자리. detail이 있으면 상자 아래에 보이는 것을 적는다 */
  items: (string | { name: string; detail: string })[];
  /** 데이터가 하나도 없을 때 보이는 안내 (와이어프레임에서는 마지막 섹터로 보여 준다) */
  empty?: EmptyState;
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader label="S1 · 제목" eyebrow={eyebrow} title={title} lead={lead} />
      <Section label="S2 · 화면 구성">
        <CardGrid columns={2}>
          {items.map((item) =>
            typeof item === "string" ? (
              <WireBox key={item} label={item} />
            ) : (
              <div key={item.name} className="space-y-2">
                <WireBox label={item.name} />
                <p className="text-sm text-foreground/60">{item.detail}</p>
              </div>
            ),
          )}
        </CardGrid>
      </Section>
      {children}
      {empty ? (
        <Section label="상태 · 비어 있을 때" title="아직 내용이 없을 때">
          <div className="rounded-md border border-dashed border-foreground/30 p-5 text-center">
            <p className="text-foreground/70">{empty.message}</p>
            {empty.action ? (
              <ButtonLink href={empty.action.href} variant="secondary" className="mt-4">
                {empty.action.label}
              </ButtonLink>
            ) : null}
          </div>
        </Section>
      ) : null}
    </>
  );
}
