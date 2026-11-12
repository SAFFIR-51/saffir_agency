import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-white hover:bg-gray-800 active:bg-gray-700",
  secondary:
    "border border-line-strong bg-surface text-foreground hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100",
  ghost: "text-foreground hover:bg-gray-100 active:bg-gray-200",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[15px]",
  sm: "h-9 px-3.5 text-sm",
};

/** 버튼 모양 클래스. 링크·버튼·이벤트 링크가 같은 모양을 쓴다. */
export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
  size: ButtonSize = "md",
) {
  return cn(
    "inline-flex items-center justify-center gap-1.5 rounded-md font-semibold whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
    sizes[size],
    variants[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: Route;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClassName(variant, className, size)}>
      {children}
    </Link>
  );
}
