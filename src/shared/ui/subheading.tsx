/** Section 안의 소제목 (h3). */
export function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[17px] font-semibold text-foreground sm:text-lg">{children}</h3>;
}
