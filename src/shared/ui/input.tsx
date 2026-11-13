import { cn } from "@/shared/lib";

/** input·textarea·select가 같은 모양을 쓰도록 클래스만 따로 둔다. */
const inputClassName = cn(
  "w-full rounded-xl border border-divider bg-background px-4 py-3.5 text-[17px]",
  "placeholder:text-muted/70",
  "focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/15 focus-visible:outline-none",
  "aria-invalid:border-red-600",
);

export function Input({ className, ...rest }: React.ComponentProps<"input">) {
  return <input className={cn(inputClassName, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(inputClassName, "min-h-28", className)} {...rest} />;
}

export function Select({
  options,
  placeholder = "선택해 주세요",
  className,
  ...rest
}: React.ComponentProps<"select"> & { options: readonly string[]; placeholder?: string }) {
  return (
    <select className={cn(inputClassName, className)} {...rest}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
