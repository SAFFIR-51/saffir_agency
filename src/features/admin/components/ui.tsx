import type { ProjectHealth, RequestPriority, RequestStatus, TaskStatus } from "@/server/projects";
import { cn } from "@/shared/lib";

/** 어드민 공통 모양: 사이트와 같은 흑백 + 엑셀식 표 */
export const input =
  "h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus-visible:border-black focus-visible:outline-none";
export const textarea =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm leading-[1.6] text-black placeholder:text-neutral-400 focus-visible:border-black focus-visible:outline-none";
export const label = "mb-1.5 block text-xs font-semibold text-neutral-600";

const btn =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-safe:transition-colors";
export const btnDark = `${btn} bg-black text-white hover:bg-black/85`;
export const btnLight = `${btn} border border-neutral-300 bg-white text-black hover:border-black`;
export const btnSmall =
  "inline-flex h-8 items-center rounded-md border border-neutral-300 bg-white px-2.5 text-xs font-semibold whitespace-nowrap hover:border-black";

/** 표 안에서 눌러 들어가는 이름: 옅은 밑줄, 올리면 진하게 */
export const linkName =
  "underline decoration-neutral-300 decoration-1 underline-offset-[5px] hover:decoration-black motion-safe:transition-colors";

export const table = "w-full border-collapse text-sm";
export const th =
  "border border-neutral-300 bg-[#f3f3f3] px-3 py-2 text-left text-xs font-semibold whitespace-nowrap text-neutral-700";
export const td = "border border-neutral-300 px-3 py-2.5 align-middle";

/** 페이지 제목 (영문 보조 제목 없이) */
export function AdminTitle({
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
        <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">{title}</h1>
        {sub ? <div className="mt-1.5 text-sm text-neutral-600">{sub}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

/** 구역: 검은 선 위 제목 */
export function Panel({
  title,
  sub,
  action,
  children,
  className,
  id,
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
          {sub ? <p className="mt-0.5 text-xs text-neutral-500">{sub}</p> : null}
        </div>
        {action}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

const dot: Record<string, string> = {
  정상: "bg-emerald-500",
  주의: "bg-amber-500",
  지연: "bg-red-600",
  긴급: "bg-red-600",
  높음: "bg-amber-500",
  보통: "bg-neutral-400",
  낮음: "bg-neutral-300",
};

export function Dot({ value }: { value: ProjectHealth | RequestPriority }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span aria-hidden="true" className={cn("size-2 rounded-full", dot[value])} />
      {value}
    </span>
  );
}

const statusTone: Record<TaskStatus | RequestStatus, string> = {
  "할 일": "border-neutral-300 text-neutral-600",
  "진행 중": "border-black bg-black text-white",
  검토: "border-black text-black",
  완료: "border-neutral-200 bg-neutral-100 text-neutral-500",
  보류: "border-amber-400 text-amber-700",
  접수: "border-black bg-black text-white",
  확인: "border-black text-black",
  "처리 중": "border-black text-black",
};

export function StatusTag({ value }: { value: TaskStatus | RequestStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2 text-xs font-semibold whitespace-nowrap",
        statusTone[value],
      )}
    >
      {value}
    </span>
  );
}

/** 고객 공개 여부 */
export function SharedTag({ shared, date }: { shared: boolean; date?: string }) {
  return shared ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-black">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-black" />
      공유됨{date ? ` ${date}` : ""}
    </span>
  ) : (
    <span className="text-xs whitespace-nowrap text-neutral-400">비공개</span>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-200"
      >
        <div className="h-full bg-black" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums">{value}%</span>
    </div>
  );
}

/** 여러 줄 텍스트 → 목록 */
export function Lines({ value, empty = "-" }: { value?: string; empty?: string }) {
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
