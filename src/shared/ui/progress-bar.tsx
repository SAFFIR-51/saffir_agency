/** 진행률 막대 (0~100) */
export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 w-full max-w-60 overflow-hidden rounded-xs bg-gray-200"
      >
        <div className="h-full bg-foreground transition-[width]" style={{ width: `${clamped}%` }} />
      </div>
      <span className="text-sm font-medium text-foreground tabular-nums">{clamped}%</span>
    </div>
  );
}
