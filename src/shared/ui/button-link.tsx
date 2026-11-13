import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

export type ButtonVariant = "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "border border-brand text-brand hover:bg-brand hover:text-white",
};

/** 버튼 모양 클래스. 링크·버튼·이벤트 링크가 같은 모양을 쓴다. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex h-11 items-center justify-center rounded-full px-6 text-[17px] font-normal transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
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
