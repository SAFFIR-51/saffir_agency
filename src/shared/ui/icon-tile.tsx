/** 아이콘 + 이름 타일 (아이콘 자리는 빈 상자) */
export function IconTile({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-foreground/15 p-3 text-sm">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded border border-dashed border-foreground/30 text-[10px] text-foreground/40"
      >
        아이콘
      </span>
      <span>{label}</span>
    </div>
  );
}
