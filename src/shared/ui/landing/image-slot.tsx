import type { CSSProperties } from "react";
import "./landing.css";

/**
 * 이미지가 정해지기 전의 빈 칸. 무엇이 들어갈지 왼쪽 위에 적어 둔다.
 * tone: 순서마다 회색을 조금씩 다르게 해서 붙어 있어도 구분되게 한다.
 */
export function ImageSlot({ label, tone = 0 }: { label: string; tone?: number }) {
  return (
    <div
      className="ls-slot"
      style={{ "--slot-tone": `${86 - (tone % 9) * 2.5}%` } as CSSProperties}
    >
      <span className="ls-slot-tag">IMAGE</span>
      <span className="ls-slot-label">{label}</span>
    </div>
  );
}
