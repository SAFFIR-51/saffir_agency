"use client";

import { useEffect, useRef } from "react";

/**
 * 가운데 정사각형. 어두운 바탕에 중심에서 뻗는 선이 돌아가며 밝아지고,
 * 서비스 이름이 왼쪽 아래부터 한 글자씩 타이핑된다.
 * 모든 길이는 한 변 400 기준 값을 캔버스 크기에 맞춰 늘린다.
 */
const BASE = 400;
const BG = "#121221";
const TYPING_MS_PER_CHAR = 28;
const LINE_DELAY_MS = 350;
const START_DELAY_MS = 400;

export function TopFace({ lines }: { lines: readonly string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const small = window.matchMedia("(max-width: 1023px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = small ? 512 : 1024;
    canvas.width = size;
    canvas.height = size;

    const unit = size / BASE;
    const rays = small ? 20 : 36;
    const sweepSpeed = small ? 4.5 : 7.5;
    const padding = 18 * unit;
    const circleRadius = 55 * unit;
    const fontSize = 32 * unit;
    const lineGap = fontSize * 1.2;
    const tracking = -0.5 * unit;
    const text = lines.map((line) => line.toUpperCase());
    const startY = size - padding - (text.length - 1) * lineGap;
    const family = getComputedStyle(canvas).fontFamily;

    const lineTimes = text.map((line, i) => ({
      chars: line.length,
      time: line.length * TYPING_MS_PER_CHAR + (i < text.length - 1 ? LINE_DELAY_MS : 0),
    }));

    /** 시작 후 elapsed ms가 지났을 때 줄마다 보이는 글자 수 */
    function visibleChars(elapsed: number) {
      let remaining = elapsed;
      return lineTimes.map(({ chars, time }) => {
        if (remaining <= 0) return 0;
        const typing = chars * TYPING_MS_PER_CHAR;
        if (remaining < typing) {
          const shown = Math.floor(remaining / TYPING_MS_PER_CHAR);
          remaining = 0;
          return shown;
        }
        remaining -= time;
        return chars;
      });
    }

    function draw(seconds: number, shown: number[]) {
      if (!ctx) return;
      const c = size / 2;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, size, size);

      const head = Math.floor(seconds * sweepSpeed) % rays;
      ctx.lineWidth = 1;
      for (let i = 0; i < rays; i++) {
        const dist = Math.min((i - head + rays) % rays, (head - i + rays) % rays);
        const alpha = dist === 0 ? 0.55 : dist === 1 ? 0.36 : dist === 2 ? 0.24 : 0.15;
        const angle = (i / rays) * Math.PI * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(c, c);
        ctx.lineTo(c + Math.cos(angle) * size, c + Math.sin(angle) * size);
        ctx.stroke();
      }

      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(c, c, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.font = `900 ${fontSize}px ${family}`;
      text.forEach((line, row) => {
        let x = padding;
        let count = 0;
        for (const ch of line) {
          if (count >= (shown[row] ?? 0)) break;
          ctx.fillText(ch, x, startY + lineGap * row);
          x += ctx.measureText(ch).width + tracking;
          count++;
        }
      });
    }

    const full = text.map((line) => line.length);
    let raf = 0;
    let visible = true;
    let typingStart = 0;
    let disposed = false;

    function frame(now: number) {
      if (!typingStart) typingStart = now + START_DELAY_MS;
      draw(now / 1000, visibleChars(now - typingStart));
      if (visible) raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      cancelAnimationFrame(raf);
      if (visible && !reduced && !disposed) raf = requestAnimationFrame(frame);
    });

    // 글꼴이 준비된 뒤에 그려야 글자 폭이 맞는다
    void document.fonts.load(`900 ${fontSize}px ${family}`).then(() => {
      if (disposed) return;
      // 첫 장면을 바로 그려 둔다 (애니메이션이 못 도는 환경에서도 빈 칸이 되지 않게)
      draw(0, reduced ? full : full.map(() => 0));
      if (!reduced) observer.observe(canvas);
    });

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [lines]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" />
      <ul className="sr-only">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </>
  );
}
