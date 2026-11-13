import { cn } from "@/shared/lib";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-[60px]", className)}>
      {children}
    </div>
  );
}
