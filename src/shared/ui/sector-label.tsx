/** 와이어프레임 섹터 이름표 (예: S2 · 서비스) */
export function SectorLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-block rounded-xs bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] text-subtle">
      {children}
    </p>
  );
}
