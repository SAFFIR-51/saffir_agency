/**
 * 와이어프레임 섹터 이름표 (예: S2 · 서비스). 기획 확인용이라 화면에는 보이지 않고
 * 소스에서 찾을 수 있게 data 속성으로만 남긴다.
 */
export function SectorLabel({ children }: { children: React.ReactNode }) {
  return <span hidden data-sector={typeof children === "string" ? children : undefined} />;
}
