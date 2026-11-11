/** 고지·주의·참고 문구 상자. */
export function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-foreground/15 bg-foreground/5 p-4 text-sm leading-relaxed">
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="space-y-1 text-foreground/80">{children}</div>
    </aside>
  );
}
