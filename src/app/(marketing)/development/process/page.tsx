import type { Metadata } from "next";
import { ProcessPage } from "@/features/development";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "맞춤 개발 소개",
  description:
    "웹·앱부터 쇼핑몰, AI, IoT까지 필요한 서비스를 만듭니다. 기획부터 개발, 납품 후 운영까지 한 팀이 맡는 사피어 맞춤 개발(외주 개발)의 진행 방식과 기간.",
  path: routes.development.process,
  og: "development",
});

export default function Page() {
  return <ProcessPage />;
}
