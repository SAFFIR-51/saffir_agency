import { cn } from "@/shared/lib";

type Kind = "text" | "textarea" | "select" | "checkbox";

/** 폼 입력칸 자리 (동작하지 않음). 라벨과 빈 칸만 보여준다. */
export function WireInput({
  label,
  kind = "text",
  placeholder,
  required,
}: {
  label: string;
  kind?: Kind;
  placeholder?: string;
  required?: boolean;
}) {
  if (kind === "checkbox") {
    return (
      <div className="flex items-start gap-2.5 text-sm text-muted">
        <span
          aria-hidden
          className="mt-0.5 size-4 shrink-0 rounded-xs border border-line-strong bg-surface"
        />
        <span>
          {label}
          {required ? " (필수)" : null}
        </span>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground">
        {label}
        {required ? <span className="ml-1 font-normal text-subtle">*</span> : null}
      </p>
      <div
        className={cn(
          "flex rounded-md border border-line-strong bg-surface px-3.5 text-[15px] text-placeholder",
          kind === "textarea" ? "min-h-32 items-start py-3" : "h-11 items-center",
          kind === "select" ? "justify-between" : undefined,
        )}
      >
        <span>{placeholder ?? ""}</span>
        {kind === "select" ? (
          <span aria-hidden className="text-subtle">
            ▾
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** 폼 제출 버튼 자리 (동작하지 않음) */
export function WireButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-11 items-center rounded-md bg-foreground px-5 text-[15px] font-semibold text-white">
      {children}
    </span>
  );
}
