"use client";

import { Picker, toOptions } from "@/shared/ui";

/** 고르면 바로 저장되는 선택칸 (작업 상태, 담당, 단계) */
export function AutoSubmitSelect({
  action,
  name,
  value,
  options,
  label,
  tone,
  empty,
}: {
  action: (form: FormData) => Promise<void>;
  name: string;
  value: string;
  options: readonly string[];
  label: string;
  tone?: "strong" | "warn";
  /** 빈 값의 이름 (예: 미지정) */
  empty?: string;
}) {
  return (
    <form action={action} className="min-w-28">
      <Picker
        name={name}
        defaultValue={value}
        options={toOptions(
          options.filter((o) => o !== ""),
          empty,
        )}
        label={label}
        autoSubmit
        size="sm"
        tone={tone}
        key={value}
      />
    </form>
  );
}
