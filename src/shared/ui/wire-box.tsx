import { cn } from "@/shared/lib";

const heights = { sm: "min-h-16", md: "min-h-32", lg: "min-h-56" } as const;

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
        "flex items-center justify-center rounded-md border border-dashed border-foreground/30 bg-foreground/5 p-4 text-center text-sm text-foreground/50",
        heights[size],
        className,
      )}
    >
      [ {label} ]
    </div>
  );
}
