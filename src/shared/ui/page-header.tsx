import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectorLabel } from "./sector-label";

/** 페이지 첫 화면 (히어로). 페이지마다 하나뿐인 h1. 애플처럼 가운데 정렬, 큰 제목 + 회색 설명. */
export function PageHeader({
  label = "S1 · 히어로",
  eyebrow,
  title,
  lead,
  children,
}: {
  label?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-16 pb-14 sm:pt-24 sm:pb-20">
      <Container className="text-center">
        <SectorLabel>{label}</SectorLabel>
        <Reveal>
          {eyebrow ? (
            <p className="text-base font-semibold text-muted sm:text-lg">{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 text-[40px] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[64px] sm:leading-[1.06]">
            {title}
          </h1>
          {lead ? (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {lead}
            </p>
          ) : null}
        </Reveal>
        {children ? (
          <div className="mt-10 space-y-6 text-left [&>.flex]:justify-center">{children}</div>
        ) : null}
      </Container>
    </header>
  );
}
