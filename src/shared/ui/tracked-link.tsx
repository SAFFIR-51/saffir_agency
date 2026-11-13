"use client";

import type { Route } from "next";
import Link from "next/link";
import { track, type EventName, type EventProps } from "@/shared/lib";

/** 누르면 전환 이벤트를 남기는 링크 (모양은 className으로) */
export function TrackedLink({
  href,
  event,
  eventProps,
  className,
  children,
}: {
  href: Route;
  event: EventName;
  eventProps?: EventProps;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track(event, eventProps)}>
      {children}
    </Link>
  );
}
