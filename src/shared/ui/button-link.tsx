import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

export type ButtonVariant = "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-foreground/20 hover:bg-foreground/5",
};

/** 버튼 모양 클래스. 링크·버튼·이벤트 링크가 같은 모양을 쓴다. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: Route;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClassName(variant, className)}>
      {children}
    </Link>
  );
}
