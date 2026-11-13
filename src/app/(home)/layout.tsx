import { Floating, NcFooter, NcHeader } from "@/shared/layout";
import { JsonLd, siteGraph } from "@/shared/seo";

/** 메인 (시안 5, NHN Cloud 메인 구성): 첫 화면 위 투명 헤더 + 검정 푸터 */
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="nc flex min-h-full flex-col">
      <JsonLd data={siteGraph()} />
      <NcHeader variant="home" />
      <main className="flex-1">{children}</main>
      <NcFooter />
      <Floating />
    </div>
  );
}
