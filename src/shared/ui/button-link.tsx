import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";
import "./nc-ui.css";

export type ButtonVariant = "primary" | "secondary";

/** 모양은 nc-ui.css (NHN Cloud 버튼: 높이 48, 둥근 알약, 파랑 / 흰 바탕 회색 테두리) */
const variants: Record<ButtonVariant, string> = {
  primary: "nc-btn nc-btn-primary",
  secondary: "nc-btn nc-btn-secondary",
};

/** 버튼 모양 클래스. 링크·버튼·이벤트 링크가 같은 모양을 쓴다. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#125de6]",
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
