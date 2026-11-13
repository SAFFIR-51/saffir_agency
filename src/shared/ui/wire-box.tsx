import { cn } from "@/shared/lib";

/** fit: 높이를 정하지 않음 (aspect-* 등으로 크기를 직접 줄 때) */
const heights = { sm: "min-h-16", md: "min-h-32", lg: "min-h-56", fit: "" } as const;

/** 이미지·화면·그래프·아직 없는 내용 자리. [ 이름 ]만 보여준다. */
export function WireBox({
  label,
  size = "md",
  className,
}: {
  label: string;
  size?: keyof typeof heights;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-[18px] bg-surface p-4 text-center text-sm text-muted [section:nth-of-type(even)_&]:bg-background",
        heights[size],
        className,
      )}
    >
      [ {label} ]
    </div>
  );
}
