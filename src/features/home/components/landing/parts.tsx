import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

/** 메인 시안 가로 폭. 화면 끝에서 36px 띄운다 */
export function Wrap({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1920px] px-5 lg:px-9", className)}>{children}</div>
  );
}

/** 섹션 이름표: (ABOUT) */
export function Cate({ children, className }: { children: string; className?: string }) {
  return <p className={cn("lt-cate uppercase", className)}>({children})</p>;
}

/** 큰 제목 */
export function MainTitle({ children, className }: { children: string; className?: string }) {
  return <h2 className={cn("lt-title text-balance", className)}>{children}</h2>;
}

/**
 * 스크롤하면 한 줄씩 진해지는 글. 줄바꿈되는 inline span에 효과를 건다.
 * size: 글자 체계 클래스 (기본 lt-lead)
 */
export function RevealText({
  children,
  tone = "dark",
  size = "lt-lead",
  className,
  lead,
}: {
  children: string;
  tone?: "dark" | "light";
  size?: string;
  className?: string;
  /** 글 앞에 띄울 요소 (ImageLeadText의 비켜 가는 자리) */
  lead?: React.ReactNode;
}) {
  return (
    <p className={cn(size, "text-pretty", className)}>
      {lead}
      <span className="landing-reveal" data-tone={tone === "light" ? "light" : undefined}>
        {children}
      </span>
    </p>
  );
}

/** 배경이 어두우면 true (글자를 흰색으로) */
function isDark(hex: string) {
  const v = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
  return 0.299 * (r ?? 0) + 0.587 * (g ?? 0) + 0.114 * (b ?? 0) < 140;
}

/**
 * 이미지 자리 (지금은 단색). 무엇이 들어갈지 왼쪽 아래에 적어 둔다.
 * 실제 이미지가 생기면 next/image로 바꾼다.
 */
export function ColorSlot({
  color,
  label,
  kind = "이미지",
  className,
  children,
}: {
  color: string;
  /** 들어갈 내용 (예: 팀 작업 사진) */
  label: string;
  kind?: "이미지" | "영상" | "로고" | "그래픽";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={`${kind} 자리: ${label}`}
      className={cn("relative overflow-hidden", className)}
      style={{ background: color }}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute bottom-3 left-3 max-w-[calc(100%-24px)] text-[12px] leading-snug font-medium",
          isDark(color) ? "text-white/70" : "text-black/55",
        )}
      >
        [ {kind} · {label} ]
      </span>
    </div>
  );
}

/** 로고 자리. 실제 로고 파일(검정·흰색)이 생기면 바꾼다 */
export function LogoSlot({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1.5 text-[12px] leading-none font-semibold whitespace-nowrap",
        tone === "dark" ? "border-black text-black" : "border-white text-white",
        className,
      )}
    >
      <span className="text-[17px] font-extrabold lowercase">saffir</span>
      <span className="hidden font-normal opacity-60 sm:inline">
        [ 로고 · {tone === "dark" ? "검정" : "흰색"} ]
      </span>
    </span>
  );
}

/** 밑줄 링크 (MORE VIEW 자리) */
export function MoreLink({ href, children }: { href: Route; children: string }) {
  return (
    <Link
      href={href}
      className="lt-more group inline-flex items-center gap-2 underline decoration-2 underline-offset-[0.3em] hover:text-(--landing-signal)"
    >
      {children}
      <span aria-hidden className="no-underline transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/**
 * 왼쪽 이미지 아래 끝 두 줄 옆에서 글이 시작해 넓게 이어지는 배치.
 * 이미지는 위에 따로 두고, 글은 이미지 높이 - 2줄만큼 내려서 시작한다. 처음 두 줄은 이미지 폭만큼 비켜 간다.
 * 좁은 화면에서는 이미지 아래에 글을 그대로 둔다.
 * width·ratio: 이미지 폭(컨테이너 대비 %)과 세로/가로 비
 */
export function ImageLeadText({
  width,
  ratio,
  color,
  label,
  children,
}: {
  width: number;
  ratio: number;
  color: string;
  label: string;
  children: string;
}) {
  const vars = {
    "--slot-w": `${width}cqw`,
    "--slot-h": `${width * ratio}cqw`,
    "--slot-ratio": `${1 / ratio}`,
  } as React.CSSProperties;
  return (
    <div className="@container relative" style={vars}>
      <ColorSlot
        color={color}
        label={label}
        className="aspect-(--slot-ratio) w-2/3 lg:absolute lg:top-0 lg:left-0 lg:w-(--slot-w)"
      />
      <RevealText
        className="mt-6 lg:mt-0 lg:pt-[max(0px,calc(var(--slot-h)-2.45em))]"
        lead={
          <span
            aria-hidden
            className="hidden lg:float-left lg:block lg:h-[2.2em] lg:w-[calc(var(--slot-w)+20px)]"
          />
        }
      >
        {children}
      </RevealText>
    </div>
  );
}
