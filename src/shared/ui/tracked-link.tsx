"use client";

import type { Route } from "next";
import Link from "next/link";
import { track, type EventName, type EventProps } from "@/shared/lib";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "./button-link";

/** 누르면 전환 이벤트를 남기는 버튼 모양 링크 */
export function TrackedButtonLink({
  href,
  event,
  eventProps,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: Route;
  event: EventName;
  eventProps?: EventProps;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={buttonClassName(variant, className, size)}
      onClick={() => track(event, eventProps)}
    >
      {children}
    </Link>
  );
}
