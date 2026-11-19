import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "요금 안내",
  description:
    "병원 홈페이지, 병원 CRM, AI 검색 최적화, 커머스 연동, ERP, 맞춤 개발 요금을 정찰가로 공개합니다. 세팅비·월 이용료·메시지 단가를 한 화면에서 비교하세요.",
  path: routes.pricing,
  og: "pricing",
});

export default function Page() {
  return <PricingPage />;
}
