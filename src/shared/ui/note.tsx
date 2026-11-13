/** 고지·주의·참고 문구 상자. */
export function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-lg bg-[#f8f9fa] px-6 py-5 text-[15px] leading-[24px]">
      {title ? <p className="mb-1 font-bold text-[#111]">{title}</p> : null}
      <div className="space-y-1 text-[#51565f]">{children}</div>
    </aside>
  );
}
