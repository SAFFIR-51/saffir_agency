"use client";

import { useEffect, useRef } from "react";

/**
 * 화면에 들어올 때 살짝 떠오르며 나타난다 (애플식).
 * - 처음 화면에 이미 보이는 것은 그대로 둔다 (깜빡임 없음)
 * - JS가 없거나 움직임 줄이기 설정이면 효과 없이 바로 보인다 (CSS: app/globals.css)
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** 같은 줄 카드를 차례로 보이게 할 때 (ms) */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.armed = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.shown = "";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `rv ${className}` : "rv"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
