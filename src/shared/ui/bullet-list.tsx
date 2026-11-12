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
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "space-y-2 pl-5 leading-relaxed text-muted marker:text-gray-400",
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
