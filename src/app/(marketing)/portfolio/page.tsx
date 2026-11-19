import type { Metadata } from "next";
import { PortfolioListPage } from "@/features/portfolio";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "포트폴리오",
  description:
    "병원 ERP와 병원·기업 홈페이지, 커머스 앱, AI·IoT 서비스까지 사피어가 직접 만든 프로젝트를 의료·커머스·AI·IoT·앱 분야별로 소개합니다.",
  path: routes.portfolio,
  og: "portfolio",
});

export default function Page() {
  return <PortfolioListPage />;
}
