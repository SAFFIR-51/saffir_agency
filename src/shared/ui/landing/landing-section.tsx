import type { ReactNode } from "react";
import "./landing.css";

type Props = {
  id: string;
  /** 큰 영문 제목 */
  title: string;
  /** 제목 아래 굵은 부제 (한글 가능) */
  subtitle?: string;
  /** 영문 설명 */
  en?: string;
  /** 한글 설명 */
  ko?: string;
  tone?: "light" | "dark";
  /**
   * compact: 세부 페이지용. 영문은 작은 라벨, 한글 부제를 제목(h2)으로 크게.
   * 기본: 메인처럼 큰 영문 제목.
   */
  size?: "display" | "compact";
  /** 부제와 같은 줄 오른쪽 끝에 놓을 버튼 (예: 전체 보기) */
  action?: ReactNode;
  children?: ReactNode;
};

/** 큰 영문 제목 + 부제 + 영/한 설명으로 시작하는 섹션 */
export function LandingSection({
  id,
  title,
  subtitle,
  en,
  ko,
  tone = "light",
  size = "display",
  action,
  children,
}: Props) {
  return (
    <section className="ls-sec" data-tone={tone} data-size={size} aria-labelledby={id}>
      <div className="ls-inner">
        {size === "compact" ? (
          <div className="ls-head">
            {title ? (
              <p className="ls-label" lang="en">
                {title}
              </p>
            ) : null}
            <div className="ls-sub-row">
              <h2 id={id} className="ls-h2">
                {subtitle ?? title}
              </h2>
              {action}
            </div>
            {en || ko ? (
              <div className="ls-desc">
                {en ? <p lang="en">{en}</p> : null}
                {ko ? <p className="ls-ko">{ko}</p> : null}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="ls-head">
            <h2 id={id} className="ls-title" lang="en">
              {title}
            </h2>
            {subtitle && action ? (
              <div className="ls-sub-row">
                <p className="ls-sub">{subtitle}</p>
                {action}
              </div>
            ) : subtitle ? (
              <p className="ls-sub">{subtitle}</p>
            ) : null}
            {en || ko ? (
              <div className="ls-desc">
                {en ? <p lang="en">{en}</p> : null}
                {ko ? <p className="ls-ko">{ko}</p> : null}
              </div>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** 섹션 안 버튼에 붙는 오른쪽 꺾쇠 */
export function ArrowIcon() {
  return (
    <svg viewBox="0 0 9 16" aria-hidden="true">
      <path d="M1 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
