/** 로그인·가입: 가운데 정렬 최소 레이아웃 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-1 items-center justify-center p-6">{children}</main>;
}
