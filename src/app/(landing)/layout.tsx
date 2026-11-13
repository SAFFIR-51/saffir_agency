import { LandingFooter, LandingHeader, landingFonts } from "@/features/home";
import { JsonLd, siteGraph } from "@/shared/seo";

/** 메인·회사 소개: 화면 위에 고정되는 투명 헤더 + 전용 푸터. 두 글꼴 변수를 본문 전체에 건다 */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={siteGraph()} />
      <LandingHeader />
      <main className={`flex-1 ${landingFonts}`}>{children}</main>
      <LandingFooter />
    </>
  );
}
