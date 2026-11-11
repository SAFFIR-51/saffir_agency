/** 모든 server action의 반환 형식 (frontend-guide 8번). 화면은 ok 값만 보고 분기한다. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
