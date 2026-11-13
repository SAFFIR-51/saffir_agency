import { cn } from "@/shared/lib";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectorLabel } from "./sector-label";

/** 한 구역: 큰 제목·회색 설명 + 내용. 흰색·회색 바탕은 globals.css에서 번갈아 칠한다. */
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
    <section id={id} className={cn("scroll-mt-16 py-16 sm:py-24", className)}>
      <Container>
        {label ? <SectorLabel>{label}</SectorLabel> : null}
        {title || description ? (
          <Reveal>
            {title ? (
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                {description}
              </p>
            ) : null}
          </Reveal>
        ) : null}
        {children ? (
          <Reveal className={cn("space-y-6", title || description ? "mt-10 sm:mt-14" : undefined)}>
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
