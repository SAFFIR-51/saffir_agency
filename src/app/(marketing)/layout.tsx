import { SiteFooter, SiteHeader } from "@/shared/layout";

/** 공개 사이트: 헤더 + 푸터 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
