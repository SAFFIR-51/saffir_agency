import { GlassArt, type GlassTone } from "./glass-art";
import { SectorLabel } from "./sector-label";
import "./nc-ui.css";

/**
 * 페이지 첫 화면 (NHN Cloud 하위 페이지의 검정 띠).
 * 왼쪽에 제목·설명·버튼, 오른쪽에 3D 느낌 그림(직접 그린 SVG). 페이지마다 하나뿐인 h1.
 */
export function PageHeader({
  label = "S1 · 히어로",
  eyebrow,
  title,
  lead,
  tone = "blue",
  children,
}: {
  label?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  /** 오른쪽 그림 색 */
  tone?: GlassTone;
  children?: React.ReactNode;
}) {
  return (
    <header className="nc-banner">
      <GlassArt id="banner" tone={tone} className="nc-banner-art" />
      <div className="nc-banner-inner">
        <SectorLabel>{label}</SectorLabel>
        {eyebrow ? <p className="nc-banner-eyebrow">{eyebrow}</p> : null}
        <h1 className="nc-banner-title">{title}</h1>
        {lead ? <p className="nc-banner-lead">{lead}</p> : null}
        {children ? <div className="nc-banner-extra">{children}</div> : null}
      </div>
    </header>
  );
}
