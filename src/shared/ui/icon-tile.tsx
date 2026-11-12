/** 아이콘 + 이름 타일 (아이콘 자리는 빈 상자) */
export function IconTile({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line bg-surface p-3.5 text-sm font-medium text-foreground">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-[10px] font-normal text-subtle"
      >
        아이콘
      </span>
      <span>{label}</span>
    </div>
  );
}
