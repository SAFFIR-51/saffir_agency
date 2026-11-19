import type { Metadata } from "next";
import { FaqPage } from "@/features/support";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "사피어 솔루션의 설치 위치, 데이터 소유, 환자 정보 보안, 요금과 결제, 맞춤 개발 진행 방식에 대해 자주 묻는 질문과 답을 모았습니다.",
  path: routes.faq,
  og: "faq",
});

export default function Page() {
  return <FaqPage />;
}
