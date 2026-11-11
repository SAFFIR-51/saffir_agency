/** Section 안의 소제목 (h3). */
export function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold sm:text-lg">{children}</h3>;
}
