import { NcFooter, NcHeader } from "@/shared/layout";

/** 로그인·가입 (NHN Cloud 로그인 화면처럼): 흰 헤더 + 가운데 좁은 칸 + 검정 푸터 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nc nc-auth flex min-h-full flex-col">
      <NcHeader variant="sub" />
      <main className="flex flex-1 justify-center px-4 pb-24">{children}</main>
      <NcFooter />
    </div>
  );
}
