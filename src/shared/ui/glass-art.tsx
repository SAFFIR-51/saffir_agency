/**
 * 사피어가 직접 그린 3D 느낌 장식 그림 (유리 판이 겹쳐 흐르는 장면).
 * NHN Cloud 첫 화면 영상 자리에 쓴다. 외부 이미지·영상 없이 SVG로만 그린다.
 * tone: 바탕 색 묶음. 같은 그림을 첫 화면·카드·솔루션 패널에 색만 바꿔 쓴다.
 */
const tones = {
  blue: ["#02051f", "#0a1a9e", "#2a46ff", "#7ee3ff"],
  violet: ["#08041c", "#2a0f8f", "#6a3cff", "#c8b6ff"],
  teal: ["#021316", "#044c63", "#0a8fb0", "#8ff3ff"],
  graphite: ["#06070b", "#1b1f2b", "#3a4257", "#b9c6e6"],
  green: ["#03120a", "#0b4a33", "#169466", "#9ff5cf"],
} as const;

export type GlassTone = keyof typeof tones;

export function GlassArt({
  tone = "blue",
  id,
  className,
  animate = false,
}: {
  tone?: GlassTone;
  /** 한 화면에 여러 장 그릴 때 그라데이션 id가 겹치지 않게 */
  id: string;
  className?: string;
  animate?: boolean;
}) {
  const [deep, mid, bright, glow] = tones[tone];
  const slabs = [
    { x: 120, y: -260, r: -28, w: 520, h: 1500, o: 0.55 },
    { x: 460, y: -160, r: -28, w: 520, h: 1500, o: 0.45 },
    { x: 820, y: -40, r: -28, w: 560, h: 1500, o: 0.4 },
    { x: 1200, y: 80, r: -28, w: 560, h: 1500, o: 0.32 },
    { x: 1580, y: 200, r: -28, w: 560, h: 1500, o: 0.26 },
  ];
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={deep} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={bright} />
        </linearGradient>
        <linearGradient id={`${id}-slab`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="0.45" stopColor={bright} stopOpacity="0.35" />
          <stop offset="1" stopColor={deep} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glow} stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor={glow} stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.72" cy="0.3" r="0.6">
          <stop offset="0" stopColor={glow} stopOpacity="0.45" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id}-bg)`} />
      <rect width="1920" height="1080" fill={`url(#${id}-glow)`} />
      <g className={animate ? "nc-drift" : undefined}>
        {slabs.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.r})`} opacity={s.o}>
            {/* 판 뒤 퍼지는 빛 */}
            <rect
              width={s.w}
              height={s.h}
              rx={s.w / 2}
              fill={bright}
              opacity="0.25"
              filter={`url(#${id}-blur)`}
            />
            {/* 유리 판 */}
            <rect width={s.w} height={s.h} rx={s.w / 2} fill={`url(#${id}-slab)`} />
            {/* 가장자리 반사선 (두 줄로 유리 두께) */}
            <rect
              x="6"
              y="6"
              width={s.w - 12}
              height={s.h - 12}
              rx={s.w / 2 - 6}
              fill="none"
              stroke={`url(#${id}-edge)`}
              strokeWidth="3"
            />
            <rect
              x="26"
              y="26"
              width={s.w - 52}
              height={s.h - 52}
              rx={s.w / 2 - 26}
              fill="none"
              stroke={glow}
              strokeOpacity="0.18"
              strokeWidth="10"
            />
            {/* 위쪽 둥근 끝에 맺히는 빛 */}
            <ellipse
              cx={s.w * 0.36}
              cy={s.w * 0.22}
              rx={s.w * 0.22}
              ry={s.w * 0.06}
              fill="#ffffff"
              opacity="0.35"
              filter={`url(#${id}-blur)`}
            />
          </g>
        ))}
      </g>
      {/* 아래쪽을 살짝 어둡게 해서 글자가 잘 보이게 */}
      <rect width="1920" height="1080" fill="#000" opacity="0.18" />
    </svg>
  );
}
