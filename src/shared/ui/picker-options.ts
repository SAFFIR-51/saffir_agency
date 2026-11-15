import type { PickerOption } from "./picker";

/** 문자열 목록 → 선택지 (empty를 주면 맨 앞에 빈 값) */
export const toOptions = (values: readonly string[], empty?: string): PickerOption[] => [
  ...(empty !== undefined ? [{ value: "", label: empty }] : []),
  ...values.map((v) => ({ value: v, label: v })),
];
