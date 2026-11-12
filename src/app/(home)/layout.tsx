import { Inter_Tight, REM } from "next/font/google";
import { LandingFooter, LandingHeader } from "@/features/home";
import { JsonLd, siteGraph } from "@/shared/seo";
import "./landing.css";

/** 메인 시안 전용 글꼴. 한글은 Pretendard로 이어진다 */
const latin = Inter_Tight({ variable: "--font-landing-latin", subsets: ["latin"] });
const display = REM({ variable: "--font-landing-display", subsets: ["latin"], weight: "900" });

/** 메인 화면만 쓰는 레이아웃 (다른 페이지는 (marketing) 레이아웃 그대로) */
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      id="top"
      className={`${latin.variable} ${display.variable} landing-root flex flex-1 flex-col bg-white text-black`}
    >
      <JsonLd data={siteGraph()} />
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
