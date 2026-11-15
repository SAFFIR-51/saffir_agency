import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib";

/**
 * 고객 포털 화면 모양 (흰 배경, 사이트와 같은 흑백, 엑셀식 표).
 * 어드민과 같은 문법을 쓰되 고객이 보기 쉽게 조금 넉넉하게.
 */

export const pLink =
  "underline decoration-neutral-300 decoration-1 underline-offset-[5px] hover:decoration-black motion-safe:transition-colors";

const btn =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-safe:transition-colors";
export const pBtnDark = `${btn} bg-black text-white hover:bg-black/85`;
export const pBtnLight = `${btn} border border-neutral-300 bg-white text-black hover:border-black`;
export const pInput =
  "h-11 w-full rounded-lg border border-neutral-300 bg-white px-3.5 text-[0.9375rem] text-black placeholder:text-neutral-400 focus-visible:border-black focus-visible:outline-none";
export const pTextarea =
  "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-[0.9375rem] leading-[1.6] text-black placeholder:text-neutral-400 focus-visible:border-black focus-visible:outline-none";
export const pLabel = "mb-1.5 block text-sm font-semibold";

/** 페이지 제목 */
export function PortalTitle({
  title,
  sub,
  actions,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
      <div>
        <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em] sm:text-[2rem]">
          {title}
        </h1>
        {sub ? <div className="mt-2 text-[0.9375rem] text-neutral-600">{sub}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

/** 구역: 검은 선 위 제목 */
export function PortalPanel({
  id,
  title,
  sub,
  action,
  children,
  className,
}: {
  id?: string;
  title: string;
  sub?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mt-12 scroll-mt-6", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-black pb-3">
        <div>
          <h2 className="text-lg font-bold tracking-[-0.02em]">{title}</h2>
          {sub ? <p className="mt-0.5 text-sm text-neutral-500">{sub}</p> : null}
        </div>
        {action}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

/** 엑셀식 표. 첫 칸은 행 이름(th) */
export function Sheet({
  columns,
  rows,
  empty = "내역이 없습니다.",
  caption,
  firstIsHeader = true,
}: {
  columns: string[];
  rows: React.ReactNode[][];
  empty?: string;
  caption?: string;
  firstIsHeader?: boolean;
}) {
  if (rows.length === 0) return <p className="text-sm text-neutral-500">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        {caption ? (
          <caption className="mb-2 text-left text-xs text-neutral-500">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={`${c}-${i}`}
                scope="col"
                className="border border-neutral-300 bg-[#f3f3f3] px-3 py-2.5 text-left text-xs font-semibold whitespace-nowrap text-neutral-700"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="align-top hover:bg-neutral-50">
              {row.map((cell, ci) =>
                ci === 0 && firstIsHeader ? (
                  <th
                    key={ci}
                    scope="row"
                    className="border border-neutral-300 px-3 py-3 text-left font-semibold"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={ci} className="border border-neutral-300 px-3 py-3 leading-[1.6]">
                    {cell}
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

/** 상태 표시 */
export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "strong" | "done" | "warn" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-semibold whitespace-nowrap",
        tone === "default" && "border-neutral-300 text-neutral-700",
        tone === "strong" && "border-black bg-black text-white",
        tone === "done" && "border-neutral-200 bg-neutral-100 text-neutral-500",
        tone === "warn" && "border-amber-400 text-amber-700",
        tone === "danger" && "border-red-600 text-red-600",
      )}
    >
      {children}
    </span>
  );
}

/** 요약 숫자 칸 */
export function StatGrid({
  items,
}: {
  items: { label: string; value: React.ReactNode; note?: React.ReactNode; href?: Route }[];
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-t border-l border-neutral-300",
        items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "",
      )}
    >
      {items.map((s) => {
        const body = (
          <>
            <dt className="text-xs font-semibold text-neutral-500">{s.label}</dt>
            <dd className="mt-2 flex items-baseline gap-2">
              <span className="text-[1.75rem] leading-none font-bold tabular-nums">{s.value}</span>
              {s.note ? <span className="text-xs text-neutral-500">{s.note}</span> : null}
            </dd>
          </>
        );
        return s.href ? (
          <Link
            key={s.label}
            href={s.href}
            className="border-r border-b border-neutral-300 px-5 py-4 hover:bg-neutral-50"
          >
            {body}
          </Link>
        ) : (
          <div key={s.label} className="border-r border-b border-neutral-300 px-5 py-4">
            {body}
          </div>
        );
      })}
    </dl>
  );
}

/** 진행률 막대 */
export function ProgressLine({ value, label }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2.5">
      <div
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 w-28 overflow-hidden rounded-full bg-neutral-200"
      >
        <div className="h-full bg-black" style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums">{v}%</span>
    </div>
  );
}

/** 안내 상자 */
export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-neutral-50 px-4 py-3 text-sm leading-[1.6] text-neutral-700">
      {children}
    </div>
  );
}

/** 여러 줄 텍스트 → 목록 */
export function LineList({ value, empty = "-" }: { value?: string; empty?: string }) {
  const lines = (value ?? "").split("\n").filter((l) => l.trim());
  if (lines.length === 0) return <span className="text-neutral-400">{empty}</span>;
  return (
    <ul className="flex flex-col gap-1">
      {lines.map((l, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="text-neutral-400">
            ·
          </span>
          {l}
        </li>
      ))}
    </ul>
  );
}
