import type { Metadata } from "next";
import { HomePage } from "@/features/home";
import { routes, site } from "@/shared/config";
import { pageMetadata } from "@/shared/seo";

const home = pageMetadata({
  title: site.name,
  description:
    "사피어는 병원 홈페이지·병원 CRM·AI 검색 최적화(GEO) 솔루션과 웹·앱 맞춤 개발을 하는 회사입니다. 만들고 끝내지 않고, 납품 뒤 운영까지 맡습니다.",
  path: routes.home,
});

/** 메인은 "사피어 | 회사 한 줄" 그대로 (제목 틀을 거치지 않는다) */
export const metadata: Metadata = {
  ...home,
  title: { absolute: `${site.name} | ${site.tagline}` },
};

export default function Page() {
  return <HomePage />;
}
