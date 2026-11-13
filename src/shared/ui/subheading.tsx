/** Section 안의 소제목 (h3). */
export function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{children}</h3>;
}
