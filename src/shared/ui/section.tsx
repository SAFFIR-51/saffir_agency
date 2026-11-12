import { cn } from "@/shared/lib";
import { Container } from "./container";
import { SectorLabel } from "./sector-label";

/** 섹터: 흰 패널 + 이름표 + 제목·설명 + 내용 */
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
        <div className="rounded-lg border border-line bg-surface p-6 sm:p-10">
          {label ? <SectorLabel>{label}</SectorLabel> : null}
          {title ? (
            <h2 className="text-[22px] font-bold tracking-[-0.02em] text-foreground sm:text-[28px]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-2 max-w-3xl leading-relaxed text-muted">{description}</p>
          ) : null}
          {children ? (
            <div className={cn("space-y-5", title || description ? "mt-8" : undefined)}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
