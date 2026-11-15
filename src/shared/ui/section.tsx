import { cn } from "@/shared/lib";
import { Container } from "./container";
import { SectorLabel } from "./sector-label";

/** 와이어프레임 섹터: 테두리 상자 + 이름표 + 제목·설명 + 내용 */
export function Section({
  id,
  label,
  title,
  description,
  className,
  children,
}: {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-3 sm:py-4", className)}>
      <Container>
        <div className="rounded-lg border border-foreground/20 p-5 sm:p-8">
          {label ? <SectorLabel>{label}</SectorLabel> : null}
          {title ? <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2> : null}
          {description ? <p className="mt-2 max-w-3xl text-foreground/70">{description}</p> : null}
          {children ? (
            <div className={cn("space-y-5", title || description ? "mt-6" : undefined)}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
