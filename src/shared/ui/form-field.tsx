/** 입력 요소에 붙일 접근성 속성. FormField와 같은 id 규칙을 쓴다. */
export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : `${id}-hint`,
  } as const;
}

/** 라벨 + 도움말 + 에러 한 묶음. 입력 요소는 children으로 받는다. */
export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="ml-1 font-normal text-subtle">
            <span aria-hidden>*</span>
            <span className="sr-only">(필수)</span>
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** 동의 체크박스 + 에러 */
export function ConsentField({
  error,
  children,
  ...rest
}: React.ComponentProps<"input"> & { error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-xs accent-foreground"
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
