import { Floating, NcFooter, NcHeader } from "@/shared/layout";
import { JsonLd, siteGraph } from "@/shared/seo";

/** 공개 사이트 (시안 5, NHN Cloud 하위 페이지 구성): 흰 헤더 + 갈래 메뉴 줄 + 검정 푸터 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nc flex min-h-full flex-col">
      <JsonLd data={siteGraph()} />
      <NcHeader variant="sub" />
      <main className="flex-1">{children}</main>
      <NcFooter />
      <Floating />
    </div>
  );
}
