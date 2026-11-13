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
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[15px] font-semibold text-[#111]">
        {label}
        {required ? <span className="text-foreground/50"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-foreground/60">
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
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-0.5 size-4 accent-[#125de6]"
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
