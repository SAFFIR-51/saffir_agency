/** 와이어프레임 섹터 이름표 (예: S2 · 서비스) */
export function SectorLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-block rounded bg-foreground/10 px-2 py-0.5 font-mono text-xs text-foreground/60">
      {children}
    </p>
  );
}
