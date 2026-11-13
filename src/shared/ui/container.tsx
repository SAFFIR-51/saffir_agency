import { cn } from "@/shared/lib";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1024px] px-5 sm:px-6", className)}>{children}</div>
  );
}
