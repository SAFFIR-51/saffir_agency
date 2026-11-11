# 예시 1. 공통 컴포넌트 (shared/ui)

> 이 예시는 `tsc`, `eslint`, `prettier` 통과를 확인한 코드입니다. 실제로 필요해질 때 `src/shared/ui/`에 그대로 추가하고 `index.ts`에 export합니다.

## 지켜야 할 점

- 네이티브 요소 props를 그대로 받는다: `React.ComponentProps<"button">`
- 변형은 `variant`·`size` 문자열 유니언으로, 바깥 조정은 `className` 하나로 받아 `cn()`으로 합친다
- React 19: `ref`는 일반 prop이라 `...rest`로 그대로 전달된다 (`forwardRef` 쓰지 않음)
- 도메인 단어(GEO, 병원 등)를 넣지 않는다
- 기본 접근성: `focus-visible`, `disabled`, 라벨·에러 연결

## Button

```tsx
// src/shared/ui/button.tsx
import { cn } from "@/shared/lib";

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-foreground/20 hover:bg-foreground/5",
  ghost: "hover:bg-foreground/5",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** 공통 버튼. 네이티브 button props를 그대로 받고, 바깥 조정은 className으로만 한다. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
}
```

## Input

```tsx
// src/shared/ui/input.tsx
import { cn } from "@/shared/lib";

/** input·textarea가 같은 모양을 쓰도록 클래스만 따로 내보낸다. */
export const inputClassName = cn(
  "w-full rounded-lg border border-foreground/20 bg-background px-3 py-2.5 text-sm",
  "placeholder:text-foreground/40",
  "focus-visible:border-foreground focus-visible:outline-none",
  "aria-invalid:border-red-600",
);

export function Input({ className, ...rest }: React.ComponentProps<"input">) {
  return <input className={cn(inputClassName, className)} {...rest} />;
}
```

## FormField (라벨 + 도움말 + 에러)

입력 요소는 `children`으로 받고, 입력 요소에는 `fieldA11y(id, error)`를 펼쳐서 `id`, `aria-invalid`, `aria-describedby`를 같은 규칙으로 붙인다.

```tsx
// src/shared/ui/form-field.tsx
/** 입력 요소에 붙일 접근성 속성. FormField와 같은 id 규칙을 쓴다. */
export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : `${id}-hint`,
  } as const;
}

/** 라벨 + 도움말 + 에러를 한 묶음으로. 입력 요소는 children으로 받는다. */
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
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
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
```

## index.ts에 추가

```ts
export { Button, type ButtonProps } from "./button";
export { Input, inputClassName } from "./input";
export { FormField, fieldA11y } from "./form-field";
```
