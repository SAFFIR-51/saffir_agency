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
    <section id={id} className={cn("border-b border-foreground/5 py-10 sm:py-14", className)}>
      <Container>
        {title ? <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2> : null}
        {description ? <p className="mt-2 max-w-3xl text-foreground/70">{description}</p> : null}
        {children ? (
          <div className={cn("space-y-6", title ? "mt-6" : undefined)}>{children}</div>
        ) : null}
      </Container>
    </section>
  );
}
