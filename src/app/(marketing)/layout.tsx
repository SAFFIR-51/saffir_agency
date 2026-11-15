import { BrochureTab, SiteFooter, SiteHeader } from "@/shared/layout";
import { JsonLd, siteGraph } from "@/shared/seo";

/** 공개 사이트: 헤더 + 푸터 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    /* 공개 사이트는 OS 다크 모드와 상관없이 항상 흰 바탕 (색 토큰을 밝은 값으로 고정) */
    <div className="site-cursor flex min-h-dvh flex-col bg-white text-[#171717] [--background:#ffffff] [--foreground:#171717]">
      <JsonLd data={siteGraph()} />
      <SiteHeader />
      <BrochureTab />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
