import type { Metadata } from "next";
import { EstimatePage } from "@/features/inquiry";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "견적 요청",
  description:
    "만들고 싶은 웹·앱·쇼핑몰·업무 시스템을 알려 주시면 영업일 기준 1~2일 안에 개발 범위와 견적을 보내 드립니다. 사피어 맞춤 개발 견적 요청.",
  path: routes.development.estimate,
  og: "estimate",
});

export default function Page() {
  return <EstimatePage />;
}
