/** 기획서에 아직 내용이 없는 자리. 화면에서 바로 구분되게 표시한다. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-foreground/25 px-3 py-2 text-sm text-foreground/60">
      작성 예정 · {children}
    </p>
  );
}
