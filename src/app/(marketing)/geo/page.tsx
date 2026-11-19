import type { Metadata } from "next";
import { GeoLandingPage } from "@/features/geo";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "사피어 AI 검색 최적화",
  description:
    "ChatGPT·Gemini 같은 AI 답변에서 우리 병원이 어떻게 소개되는지 진단합니다. 홈페이지에서 먼저 고칠 항목과 근거, 개선 후 변화까지 확인하는 사피어 AI 검색 최적화(GEO).",
  path: routes.hospital.geo,
  og: "geo",
});

export default function Page() {
  return <GeoLandingPage />;
}
