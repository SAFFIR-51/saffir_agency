"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤하면 글자가 회색에서 검정으로 차례로 밝아지는 큰 문장 (애플 제품 페이지 방식).
 * 서버에서는 전부 진한 글자로 그리고, JS가 켜진 뒤에만 효과를 건다.
 * 움직임 줄이기 설정이면 효과 없이 그대로 둔다.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    let frame = 0;

    function update() {
      frame = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 문장 위쪽이 화면 85% 지점일 때 시작, 문장 아래쪽이 45% 지점일 때 끝
      const start = vh * 0.85;
      const end = vh * 0.45;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
      const lit = progress * words.length;
      words.forEach((w, i) => {
        w.style.opacity = String(Math.min(1, Math.max(0.18, lit - i + 0.18)));
      });
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-w="" className="transition-opacity duration-150">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
