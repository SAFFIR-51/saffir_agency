import { cn } from "@/shared/lib";

export function BulletList({
  items,
  ordered = false,
  className,
}: {
  items: React.ReactNode[];
  ordered?: boolean;
  className?: string;
}) {
  if (ordered) {
    return (
      <ol className={cn("list-decimal space-y-2 pl-5 leading-relaxed", className)}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  }
  // 애플식 목록: 파란 체크 + 글
  return (
    <ul className={cn("space-y-2.5 leading-relaxed", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mt-[0.3em] size-4 shrink-0 text-brand"
          >
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
