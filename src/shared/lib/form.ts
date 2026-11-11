import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

/** server action이 돌려준 필드 오류를 react-hook-form 필드에 다시 표시한다. */
export function applyFieldErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  fieldErrors: Record<string, string[] | undefined> | undefined,
) {
  for (const [field, messages] of Object.entries(fieldErrors ?? {})) {
    // 클라이언트와 서버가 같은 스키마를 쓰므로 field는 폼 필드 이름이다
    if (messages?.[0]) setError(field as Path<T>, { message: messages[0] });
  }
}
