"use client";

import { useEffect, useRef } from "react";

const TRACKING = -0.06; // em, 글자 사이 간격 (CSS tracking 과 같은 값)
const CARD_GAP = 8; // 아래 카드 사이 간격(px)

/**
 * 큰 워드마크. 글자 모양(잉크)의 오른쪽 끝이 아래 두 번째 카드 오른쪽 끝에 정확히 오도록
 * 브라우저에서 실제 글꼴을 재서 크기를 정한다. (OS·글꼴 렌더링이 달라도 맞음)
 * 카드가 한 줄씩 쌓이는 좁은 화면에서는 화면 폭을 꽉 채운다.
 * 서버 렌더링 때는 CSS 기본 크기로 보이고, 화면에 붙으면 바로 보정한다.
 */
export function FitWordmark({
  id,
  text,
  className,
}: {
  id: string;
  text: string;
  className: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const canvas = document.createElement("canvas").getContext("2d");
    if (!canvas) return;

    const fit = () => {
      const style = getComputedStyle(box);
      const content =
        box.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const target = wide ? ((content - CARD_GAP * 2) * 2) / 3 + CARD_GAP : content;

      const font = getComputedStyle(el);
      canvas.font = `${font.fontWeight} 100px ${font.fontFamily}`;
      const m = canvas.measureText(text);
      const ink =
        m.actualBoundingBoxLeft + m.actualBoundingBoxRight + TRACKING * 100 * (text.length - 1);
      if (ink <= 0) return;
      const size = (100 * target) / ink;
      el.style.fontSize = `${size}px`;
      el.style.marginLeft = `${(m.actualBoundingBoxLeft * size) / 100}px`;
    };

    fit();
    void document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [text]);

  return (
    <h1 ref={ref} id={id} className={className}>
      {text}
    </h1>
  );
}
