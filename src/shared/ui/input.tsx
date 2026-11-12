import { cn } from "@/shared/lib";

/** input·textarea·select가 같은 모양을 쓰도록 클래스만 따로 둔다. */
const inputClassName = cn(
  "w-full rounded-md border border-line-strong bg-surface px-3.5 text-[15px] text-foreground transition-colors",
  "placeholder:text-placeholder",
  "hover:border-gray-400",
  "focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-none",
  "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger",
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-gray-100 disabled:text-subtle",
);

export function Input({ className, ...rest }: React.ComponentProps<"input">) {
  return <input className={cn(inputClassName, "h-11", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(inputClassName, "min-h-32 py-3 leading-relaxed", className)}
      {...rest}
    />
  );
}

export function Select({
  options,
  placeholder = "선택해 주세요",
  className,
  ...rest
}: React.ComponentProps<"select"> & { options: readonly string[]; placeholder?: string }) {
  return (
    <div className="relative">
      <select className={cn(inputClassName, "h-11 appearance-none pr-10", className)} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-subtle"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
