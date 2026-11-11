import { Container } from "./container";

/** 페이지마다 하나뿐인 h1 영역. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-foreground/10 py-12 sm:py-16">
      <Container>
        {eyebrow ? <p className="text-sm font-medium text-foreground/60">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-3xl text-lg text-foreground/70">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
