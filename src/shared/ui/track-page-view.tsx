"use client";

import { useEffect } from "react";
import { track, type EventName, type EventProps } from "@/shared/lib";

/** 페이지가 열릴 때 이벤트를 한 번 남긴다. 화면에는 아무것도 그리지 않는다. */
export function TrackPageView({
  event,
  eventProps,
}: {
  event: EventName;
  eventProps?: EventProps;
}) {
  // 속성 객체는 렌더마다 새로 만들어지므로 문자열로 비교해 한 번만 보낸다
  const key = JSON.stringify(eventProps ?? {});
  useEffect(() => {
    track(event, JSON.parse(key) as EventProps);
  }, [event, key]);
  return null;
}
