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
        className="h-2 w-full max-w-60 overflow-hidden rounded-full bg-foreground/10"
      >
        <div className="h-full bg-foreground/70" style={{ width: `${clamped}%` }} />
      </div>
      <span className="text-sm tabular-nums">{clamped}%</span>
    </div>
  );
}
