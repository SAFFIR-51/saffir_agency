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
      <div className="flex items-start gap-2 text-sm">
        <span
          aria-hidden
          className="mt-0.5 size-4 shrink-0 rounded-sm border border-foreground/40"
        />
        <span>
          {label}
          {required ? " (필수)" : null}
        </span>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium">
        {label}
        {required ? <span className="text-foreground/50"> *</span> : null}
      </p>
      <div
        className={cn(
          "flex rounded-md border border-foreground/30 px-3 text-sm text-foreground/40",
          kind === "textarea" ? "min-h-24 items-start py-2" : "h-11 items-center",
          kind === "select" ? "justify-between" : undefined,
        )}
      >
        <span>{placeholder ?? ""}</span>
        {kind === "select" ? <span aria-hidden>▾</span> : null}
      </div>
    </div>
  );
}

/** 폼 제출 버튼 자리 (동작하지 않음) */
export function WireButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-11 items-center rounded-full border border-foreground/40 px-5 text-sm font-medium text-foreground/70">
      {children}
    </span>
  );
}
