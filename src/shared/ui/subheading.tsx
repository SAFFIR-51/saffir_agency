/** Section 안의 소제목 (h3). */
export function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[20px] leading-[30px] font-bold text-[#111]">{children}</h3>;
}
