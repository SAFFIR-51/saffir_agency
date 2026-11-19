import type { Metadata } from "next";
import { AboutPage } from "@/features/about";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "회사 소개",
  description:
    "주식회사 사피어테크놀로지는 병원·커머스·업무 시스템을 빠르게 만들고, 납품 뒤에도 계속 돌아가게 관리하는 개발 회사입니다. 일하는 방식과 걸어온 길을 소개합니다.",
  path: routes.about,
  og: "about",
});

export default function Page() {
  return <AboutPage />;
}
