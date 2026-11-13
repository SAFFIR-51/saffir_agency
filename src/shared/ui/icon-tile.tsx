/** 아이콘 + 이름 타일 (아이콘 자리는 빈 상자) */
export function IconTile({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm [section:nth-of-type(even)_&]:bg-background">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-divider/50 text-[10px] text-muted"
      >
        아이콘
      </span>
      <span>{label}</span>
    </div>
  );
}
