"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/shared/lib";

/** 페이지가 열릴 때 이벤트를 한 번 남긴다. 화면에는 아무것도 그리지 않는다. */
export function TrackPageView({ event }: { event: EventName }) {
  useEffect(() => {
    track(event);
  }, [event]);
  return null;
}
