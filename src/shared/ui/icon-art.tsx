/**
 * 3D 느낌 아이콘 그림 (사피어가 직접 그린 SVG: 파랑 유리 그라데이션 + 주황 강조 + 그림자).
 * 구슬·덩어리 대신 뜻이 보이는 그림을 쓴다. 외부 이미지 없음.
 */
export type IconArtKind =
  | "alert-chat"
  | "chart-down"
  | "clock"
  | "broken-link"
  | "search"
  | "price"
  | "steps"
  | "question"
  | "screens"
  | "module";

export function IconArt({
  kind,
  id,
  className,
}: {
  kind: IconArtKind;
  /** 한 화면에 여러 장 그릴 때 그라데이션 id가 겹치지 않게 */
  id: string;
  className?: string;
}) {
  const a = `url(#${id}-a)`;
  const b = `url(#${id}-b)`;
  const c = `url(#${id}-c)`;
  const badge = (x: number, y: number, r: number) => (
    <>
      <circle cx={x} cy={y} r={r} fill={b} />
      <rect x={x - 2.5} y={y - r * 0.55} width="5" height={r * 0.7} rx="2.5" fill="#fff" />
      <circle cx={x} cy={y + r * 0.42} r="2.8" fill="#fff" />
    </>
  );
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#c9d8ff" />
          <stop offset="1" stopColor="#4f6dff" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd9c2" />
          <stop offset="1" stopColor="#ff6a3d" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#3b4fd8" floodOpacity="0.28" />
        </filter>
      </defs>
      <ellipse cx="100" cy="146" rx="58" ry="7" fill="#3b4fd8" opacity="0.12" />
      <g filter={`url(#${id}-s)`}>
        {kind === "alert-chat" ? (
          <>
            <path
              d="M44 34h112a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16H92l-26 20v-20H44a16 16 0 0 1-16-16V50a16 16 0 0 1 16-16z"
              fill={a}
            />
            <path d="M44 38h112a12 12 0 0 1 12 12v8H32v-8a12 12 0 0 1 12-12z" fill={c} />
            <rect x="54" y="62" width="70" height="7" rx="3.5" fill="#fff" opacity="0.8" />
            <rect x="54" y="78" width="46" height="7" rx="3.5" fill="#fff" opacity="0.6" />
            {badge(146, 40, 20)}
          </>
        ) : null}
        {kind === "chart-down" ? (
          <>
            <rect x="34" y="24" width="132" height="104" rx="16" fill={a} />
            <rect x="38" y="28" width="124" height="30" rx="12" fill={c} />
            <rect x="54" y="88" width="16" height="26" rx="4" fill="#fff" opacity="0.85" />
            <rect x="80" y="76" width="16" height="38" rx="4" fill="#fff" opacity="0.85" />
            <rect x="106" y="94" width="16" height="20" rx="4" fill="#fff" opacity="0.85" />
            <path
              d="M52 50l34 18 24-10 36 32M136 92h12V80"
              fill="none"
              stroke="#ff6a3d"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : null}
        {kind === "clock" ? (
          <>
            <circle cx="100" cy="80" r="54" fill={a} />
            <circle cx="100" cy="80" r="42" fill="#fff" opacity="0.9" />
            <path
              d="M100 52v30l20 12"
              fill="none"
              stroke="#3b4fd8"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="82" r="5" fill="#3b4fd8" />
            {badge(146, 38, 16)}
          </>
        ) : null}
        {kind === "broken-link" ? (
          <>
            <rect x="26" y="50" width="62" height="62" rx="16" fill={a} />
            <rect x="112" y="40" width="62" height="62" rx="16" fill={a} />
            <rect x="30" y="54" width="54" height="20" rx="10" fill={c} />
            <rect x="116" y="44" width="54" height="20" rx="10" fill={c} />
            <path d="M88 81h8M104 71h8" stroke="#9aa9ff" strokeWidth="7" strokeLinecap="round" />
            <path d="M94 62l12 28" stroke="#ff6a3d" strokeWidth="6" strokeLinecap="round" />
            <circle cx="57" cy="83" r="9" fill="#fff" opacity="0.9" />
            <circle cx="143" cy="73" r="9" fill="#fff" opacity="0.9" />
          </>
        ) : null}
        {kind === "search" ? (
          <>
            <rect x="30" y="22" width="110" height="96" rx="14" fill={a} />
            <rect x="34" y="26" width="102" height="22" rx="10" fill={c} />
            <rect x="46" y="60" width="60" height="7" rx="3.5" fill="#fff" opacity="0.85" />
            <rect x="46" y="76" width="40" height="7" rx="3.5" fill="#fff" opacity="0.65" />
            <circle cx="128" cy="92" r="30" fill="#fff" opacity="0.55" />
            <circle cx="128" cy="92" r="30" fill="none" stroke="#3b4fd8" strokeWidth="9" />
            <path d="M150 114l20 20" stroke="#ff6a3d" strokeWidth="12" strokeLinecap="round" />
          </>
        ) : null}
        {kind === "price" ? (
          <>
            <rect x="34" y="36" width="132" height="86" rx="16" fill={a} />
            <rect x="34" y="54" width="132" height="16" fill="#3b4fd8" opacity="0.55" />
            <rect x="38" y="40" width="124" height="12" rx="6" fill={c} />
            <rect x="50" y="92" width="44" height="9" rx="4.5" fill="#fff" opacity="0.85" />
            <circle cx="146" cy="44" r="22" fill={b} />
            <text
              x="146"
              y="51"
              textAnchor="middle"
              fontSize="22"
              fontWeight="800"
              fill="#fff"
              fontFamily="sans-serif"
            >
              ₩
            </text>
          </>
        ) : null}
        {kind === "steps" ? (
          <>
            <rect x="30" y="94" width="44" height="30" rx="8" fill={a} />
            <rect x="78" y="70" width="44" height="54" rx="8" fill={a} />
            <rect x="126" y="44" width="44" height="80" rx="8" fill={a} />
            <rect x="32" y="96" width="40" height="10" rx="5" fill={c} />
            <rect x="80" y="72" width="40" height="10" rx="5" fill={c} />
            <rect x="128" y="46" width="40" height="10" rx="5" fill={c} />
            <path d="M148 18v26" stroke="#3b4fd8" strokeWidth="4" strokeLinecap="round" />
            <path d="M150 18h22l-6 7 6 7h-22z" fill={b} />
          </>
        ) : null}
        {kind === "question" ? (
          <>
            <path
              d="M60 30h80a20 20 0 0 1 20 20v40a20 20 0 0 1-20 20h-30l-24 22v-22H60a20 20 0 0 1-20-20V50a20 20 0 0 1 20-20z"
              fill={a}
            />
            <path d="M60 34h80a16 16 0 0 1 16 16v6H44v-6a16 16 0 0 1 16-16z" fill={c} />
            <path
              d="M86 60a14 14 0 1 1 20 12c-5 3-6 5-6 10"
              fill="none"
              stroke="#fff"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="100" cy="94" r="5.5" fill="#fff" />
          </>
        ) : null}
        {kind === "screens" ? (
          <>
            <rect x="24" y="30" width="118" height="82" rx="12" fill={a} />
            <rect x="28" y="34" width="110" height="14" rx="7" fill={c} />
            <rect x="38" y="58" width="44" height="40" rx="6" fill="#fff" opacity="0.8" />
            <rect x="90" y="58" width="40" height="8" rx="4" fill="#fff" opacity="0.8" />
            <rect x="90" y="74" width="30" height="8" rx="4" fill="#fff" opacity="0.6" />
            <rect x="128" y="62" width="48" height="76" rx="10" fill={b} />
            <rect x="134" y="70" width="36" height="52" rx="5" fill="#fff" opacity="0.85" />
            <circle cx="152" cy="130" r="3" fill="#fff" />
          </>
        ) : null}
        {kind === "module" ? (
          <>
            <path d="M100 26l52 28v52l-52 28-52-28V54z" fill={a} />
            <path d="M100 26l52 28-52 28-52-28z" fill={c} />
            <path d="M100 82v52" stroke="#3b4fd8" strokeWidth="3" opacity="0.5" />
            <path
              d="M100 26l52 28-52 28-52-28z"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.6"
            />
            <circle cx="146" cy="40" r="14" fill={b} />
          </>
        ) : null}
      </g>
    </svg>
  );
}
