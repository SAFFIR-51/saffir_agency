import { cn } from "@/shared/lib";
import { Container } from "./container";

export function Section({
  id,
  title,
  description,
  className,
  children,
}: {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {title ? <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2> : null}
        {description ? <p className="mt-3 max-w-2xl text-foreground/70">{description}</p> : null}
        {children ? <div className={title ? "mt-10" : undefined}>{children}</div> : null}
      </Container>
    </section>
  );
}
