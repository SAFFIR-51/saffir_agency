type RingProps = {
  className: string;
  /** SVG 한 변 (px) */
  size: number;
  /** 글자 아랫선이 놓이는 반지름 */
  radius: number;
  fontSize: number;
  /** 글자가 차지하는 각도. 나머지는 빈 틈 */
  sweep: number;
  text: string;
  repeat: number;
};

function Ring({ className, size, radius, fontSize, sweep, text, repeat }: RingProps) {
  const c = size / 2;
  const id = `${className}-path`;
  // 위쪽에서 시작해 시계 방향으로 한 바퀴 도는 원
  const d = `M ${c} ${c - radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 ${-radius * 2}`;
  const length = (2 * Math.PI * radius * sweep) / 360;
  const line = Array.from({ length: repeat }, () => `${text.toUpperCase()} *`).join(" ");

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <defs>
        <path id={id} d={d} fill="none" />
      </defs>
      <text fontSize={fontSize} fontWeight={400} fill="#000">
        <textPath href={`#${id}`}>
          <tspan textLength={length} lengthAdjust="spacing">
            {line}
          </tspan>
        </textPath>
      </text>
    </svg>
  );
}

/** 오른쪽에서 40초에 한 바퀴 도는 원형 글자 (장식) */
export function TextRing({ text }: { text: string }) {
  return (
    <>
      <Ring
        className="lp-ring-pc"
        size={416}
        radius={186}
        fontSize={26}
        sweep={305}
        text={text}
        repeat={3}
      />
      <Ring
        className="lp-ring-mo"
        size={193}
        radius={87}
        fontSize={11.8}
        sweep={345}
        text={text}
        repeat={2}
      />
    </>
  );
}
