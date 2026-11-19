import type { Metadata } from "next";
import { ContactPage } from "@/features/inquiry";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "문의",
  description:
    "솔루션 도입 상담, 맞춤 개발 견적, 제휴 문의를 남겨 주세요. 영업일 기준 1~2일 안에 사피어 담당자가 연락드립니다.",
  path: routes.contact,
  og: "contact",
});

export default function Page() {
  return <ContactPage />;
}
