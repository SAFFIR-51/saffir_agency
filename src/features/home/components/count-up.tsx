"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 화면에 들어오면 0부터 값까지 올라가는 숫자.
 * 서버에서는 최종 값을 그리므로 JS가 없어도 맞는 숫자가 보인다.
 */
export function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
