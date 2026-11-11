/** 내부 검토 화면: 헤더·푸터 없이 */
export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
