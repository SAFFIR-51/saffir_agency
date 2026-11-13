import { cn } from "@/shared/lib";

/** 목록 (NHN Cloud: 작은 점 + 회색 글) */
export function BulletList({
  items,
  ordered = false,
  className,
}: {
  items: React.ReactNode[];
  ordered?: boolean;
  className?: string;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "space-y-2 pl-5 text-[16px] leading-[26px] text-[#51565f] marker:text-[#9499a2]",
        ordered ? "list-decimal" : "list-disc",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
}
