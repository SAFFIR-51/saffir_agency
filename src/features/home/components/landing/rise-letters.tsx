"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib";

/**
 * 화면에 들어오면 글자가 아래에서 하나씩 올라온다.
 * JS가 없거나 움직임 줄이기 설정이면 처음부터 그대로 보인다 (data-state를 달지 않음).
 * 화면 읽기 프로그램은 숨긴 원문을 읽는다.
 */
export function RiseLetters({
  text,
  className,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  /** 여러 줄을 이어서 올릴 때 앞 줄 글자 수 */
  startIndex?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.state = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          requestAnimationFrame(() => {
            el.dataset.state = "in";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  /** 단어마다 첫 글자 순번 */
  const wordStarts = words.map((_, w) => startIndex + words.slice(0, w).join("").length);
  return (
    <span ref={ref} className={cn("landing-rise", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} aria-hidden>
          <span className="landing-rise-word">
            {[...word].map((char, c) => (
              <span
                key={c}
                className="landing-rise-char"
                style={{ "--i": (wordStarts[w] ?? 0) + c } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
