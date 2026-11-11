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
        <div className="rounded-lg border border-foreground/20 p-5 sm:p-10">
          <SectorLabel>{label}</SectorLabel>
          {eyebrow ? <p className="text-sm font-medium text-foreground/60">{eyebrow}</p> : null}
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {lead ? <p className="mt-3 max-w-3xl text-foreground/70 sm:text-lg">{lead}</p> : null}
          {children ? <div className="mt-6 space-y-5">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
