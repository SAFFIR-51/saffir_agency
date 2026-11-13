import type { ReactNode } from "react";
import "./landing.css";

/**
 * 메인 디자인을 쓰는 페이지의 첫 화면 머리 (포트폴리오·요금·문의 등).
 * 작은 영문 → 큰 한글 제목(h1) → 설명 → 버튼·필터 등.
 */
export function PageHead({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  /** 없으면 영문 라벨이 제목(h1) 자리를 맡는다 */
  title?: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="ls-sec ph" aria-labelledby="ph-title">
      <div className="ls-inner">
        {title ? (
          <>
            <p className="ph-eyebrow" lang="en">
              {eyebrow}
            </p>
            <h1 id="ph-title" className="ph-title">
              {title}
            </h1>
          </>
        ) : (
          <h1 id="ph-title" className="ph-eyebrow" lang="en">
            {eyebrow}
          </h1>
        )}
        {lead ? <p className="ph-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
