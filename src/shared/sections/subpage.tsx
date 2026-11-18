import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

/**
 * 세부 페이지 공통 부품 (/hospital에서 정한 문법: ANCORS 세부 페이지 서체·구성, 사피어 버튼).
 * 비즈니스 솔루션·맞춤 개발 소개 페이지가 같이 쓴다.
 */

export const subpagePad = "px-5 lg:px-10";
export const detailPageWidth = "mx-auto w-full max-w-[68rem]";
export const detailSectionSpacing =
  "[--section-content-gap:2.5rem] [--section-gap:6rem] lg:[--section-content-gap:3.5rem] lg:[--section-gap:8rem]";

/** 섹션 제목: 영문 Archivo 45/800 대문자 한 줄, 아래 한글 Pretendard 14/500 한두 줄 */
export const sectionTitle =
  "font-display text-[2.25rem] leading-[1.1] font-extrabold tracking-[-0.06em] uppercase lg:text-[2.8125rem]";
export const sectionSub = "mt-3.5 text-sm leading-[1.5] font-medium tracking-[-0.02em] text-black";

/** 사피어 버튼: 높이 48, 좌우 25, 모서리 8, 1px 검정 테두리. 마우스를 올리면 글자가 밀리고 화살표가 나타난다 */
const button =
  "group/btn inline-flex h-12 items-center justify-center rounded-lg border border-black px-[25px] text-base leading-[22px] font-medium tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-colors motion-safe:duration-300";
export const lightButton = `${button} bg-white text-black`;
export const darkButton = `${button} bg-black text-white hover:bg-black/90`;

export function ButtonLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="group-hover/btn:-translate-x-2 group-focus-visible/btn:-translate-x-2 motion-safe:transition-transform motion-safe:duration-300">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 9"
        className="h-[9px] w-0 shrink-0 opacity-0 group-hover/btn:w-3 group-hover/btn:translate-x-2 group-hover/btn:opacity-100 group-focus-visible/btn:w-3 group-focus-visible/btn:translate-x-2 group-focus-visible/btn:opacity-100 motion-safe:transition-all motion-safe:duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 4.5h11M7 1l4 3.5L7 8" />
      </svg>
    </>
  );
}

type LinkSpec = { href: Route; label: string };

/** 버튼 두 개: 왼쪽 흰 버튼, 오른쪽 검은 버튼 */
export function ButtonPair({ secondary, primary }: { secondary: LinkSpec; primary: LinkSpec }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={secondary.href} className={lightButton}>
        <ButtonLabel>{secondary.label}</ButtonLabel>
      </Link>
      <Link href={primary.href} className={darkButton}>
        <ButtonLabel>{primary.label}</ButtonLabel>
      </Link>
    </div>
  );
}

/** 밑줄 글자 링크. 마우스를 올리면 밑줄이 사라진다 */
export const underlineLink =
  "underline decoration-1 underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

/** 섹션: 영문 제목 한 줄 + 한글 한두 줄 (+ 버튼), 아래 내용 */
export function SubpageSection({
  id,
  en,
  sub,
  action,
  first = false,
  topPadding = first
    ? "pt-[var(--section-gap,5rem)] lg:pt-[var(--section-gap,7rem)]"
    : "pt-[var(--section-gap,7rem)] lg:pt-[var(--section-gap,10rem)]",
  children,
}: {
  id: string;
  en: string;
  sub: readonly string[];
  action?: React.ReactNode;
  /** 페이지 맨 위 섹션이면 위 여백을 줄인다 */
  first?: boolean;
  topPadding?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={topPadding}>
      <div className={subpagePad}>
        <h2 id={id} className={sectionTitle}>
          {en}
        </h2>
        {sub.length > 0 && (
          <p className={sectionSub}>
            {sub.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
      <div
        className={`mt-[var(--section-content-gap,3rem)] lg:mt-[var(--section-content-gap,5rem)] ${subpagePad}`}
      >
        {children}
      </div>
    </section>
  );
}

/** 엑셀식 표: 모든 칸에 옅은 선, 회색 머리줄. 첫 열은 행 제목. 좁은 화면에서는 옆으로 밀어 본다 */
export function SheetTable({
  caption,
  columns,
  rows,
  widths = [],
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly React.ReactNode[])[];
  /** 열 너비 클래스 (예: "w-16") */
  widths?: readonly (string | undefined)[];
}) {
  const cell = "border border-neutral-300 px-4 py-3.5 align-middle";
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-[0.9375rem] leading-[1.5]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(cell, "bg-[#f3f3f3] py-3 text-left text-sm font-semibold", widths[i])}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="hover:bg-[#fafafa]">
              {row.map((value, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className={cn(cell, "text-left font-semibold")}>
                    {value}
                  </th>
                ) : (
                  <td key={i} className={cn(cell, "text-neutral-700")}>
                    {value}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 가로 사양 띠: 표 대신 칸을 가로로 나란히. 칸마다 위에 검은 선, 번호(있으면) · 굵은 이름 · 설명.
 * 칸 수만큼 화면을 꽉 채워 오른쪽이 비지 않는다. 좁은 화면에서는 2칸씩.
 */
export function SpecStrip({
  items,
  numbered = false,
}: {
  items: readonly { name: string; detail: React.ReactNode }[];
  numbered?: boolean | "inline";
}) {
  const cols: Record<number, string> = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };
  return (
    <ol
      className={cn("grid gap-x-4 gap-y-8 sm:grid-cols-2", cols[items.length] ?? "lg:grid-cols-4")}
    >
      {items.map((item, i) => (
        <li key={item.name} className="border-t border-black pt-5">
          {numbered === true && (
            <span className="font-display text-sm font-medium tracking-[-0.02em] text-neutral-400 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <p
            className={cn(
              "text-xl leading-[1.3] font-bold tracking-[-0.03em] lg:text-[1.375rem]",
              numbered === true && "mt-6 lg:mt-10",
            )}
          >
            {numbered === "inline" ? `${String(i + 1).padStart(2, "0")}.${item.name}` : item.name}
          </p>
          <p className="mt-2.5 pr-4 text-[0.9375rem] leading-[1.6] text-neutral-700">
            {item.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** 자주 묻는 질문: 접고 펴는 목록 */
export function FaqList({
  items,
}: {
  items: readonly { q: string; a: string; defaultOpen?: boolean }[];
}) {
  return (
    <div className="border-t border-black">
      {items.map((item) => (
        <details key={item.q} open={item.defaultOpen} className="group border-b border-neutral-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="text-2xl leading-none font-light group-open:rotate-45 motion-safe:transition-transform"
            >
              +
            </span>
          </summary>
          <p className="pr-10 pb-6 text-[0.9375rem] leading-[1.6] text-neutral-600 md:max-w-[60%]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/** 마무리: 가운데 큰 문장 + 설명 + 버튼 두 개 */
export function SubpageClosing({
  title,
  description,
  buttons,
}: {
  title: string;
  description: React.ReactNode;
  buttons: { secondary: LinkSpec; primary: LinkSpec };
}) {
  return (
    <section
      aria-labelledby="subpage-closing"
      className={`pt-[var(--section-gap,7rem)] pb-28 text-center lg:pt-[var(--section-gap,11rem)] lg:pb-44 ${subpagePad}`}
    >
      <h2
        id="subpage-closing"
        className="text-[2.25rem] leading-[1.2] font-extrabold tracking-[-0.04em] lg:text-[3.5rem]"
      >
        {title}
      </h2>
      <p className="mt-5 text-[0.9375rem] leading-[1.6] text-neutral-700 lg:text-lg">
        {description}
      </p>
      <div className="mt-10 flex justify-center">
        <ButtonPair {...buttons} />
      </div>
    </section>
  );
}
