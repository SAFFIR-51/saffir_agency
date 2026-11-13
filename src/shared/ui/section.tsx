import { cn } from "@/shared/lib";
import { SectorLabel } from "./sector-label";
import "./nc-ui.css";

/**
 * 한 구역 (NHN Cloud 하위 페이지): 왼쪽 정렬 굵은 제목(30px) + 회색 설명 + 내용.
 * 구역 바탕은 흰색·회색이 번갈아 나온다 (nc-ui.css).
 */
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
    <section id={id} className={cn("nc-section", className)}>
      <div className="nc-container">
        {label ? <SectorLabel>{label}</SectorLabel> : null}
        {title ? <h2 className="nc-section-title">{title}</h2> : null}
        {description ? <p className="nc-section-desc">{description}</p> : null}
        {children ? (
          <div className={cn("nc-section-body", title || description ? "mt-10" : undefined)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
