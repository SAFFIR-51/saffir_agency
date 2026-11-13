/** 고지·주의·참고 문구 상자. */
export function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-[18px] bg-surface p-5 text-sm leading-relaxed [section:nth-of-type(even)_&]:bg-background">
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="space-y-1 text-muted">{children}</div>
    </aside>
  );
}
