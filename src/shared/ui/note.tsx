/** 고지·주의·참고 문구 상자. 왼쪽 굵은 선으로 본문과 구분한다 */
export function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-md border-l-2 border-foreground bg-gray-100 px-5 py-4 text-sm leading-relaxed">
      {title ? <p className="mb-1.5 font-semibold text-foreground">{title}</p> : null}
      <div className="space-y-1 text-muted">{children}</div>
    </aside>
  );
}
