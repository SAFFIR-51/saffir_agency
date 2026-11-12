import { Container } from "./container";
import { SectorLabel } from "./sector-label";

/** 페이지 첫 섹터 (히어로). 페이지마다 하나뿐인 h1. */
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
    <header className="pt-6 pb-3 sm:pt-8 sm:pb-4">
      <Container>
        <div className="rounded-lg border border-line bg-surface p-6 sm:p-12">
          <SectorLabel>{label}</SectorLabel>
          {eyebrow ? <p className="text-sm font-semibold text-subtle">{eyebrow}</p> : null}
          <h1 className="mt-2 text-[28px] leading-tight font-bold tracking-[-0.025em] text-balance text-foreground sm:text-[40px]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-4 max-w-3xl leading-relaxed text-muted sm:text-lg">{lead}</p>
          ) : null}
          {children ? <div className="mt-8 space-y-5">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
