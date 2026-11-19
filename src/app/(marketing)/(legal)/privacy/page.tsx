import type { Metadata } from "next";
import { PrivacyPage } from "@/features/legal";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "개인정보처리방침",
  description:
    "사피어(주식회사 사피어테크놀로지)가 수집하는 개인정보의 항목, 이용 목적, 보관 기간과 이용자의 권리를 안내합니다.",
  path: routes.legal.privacy,
  og: "default",
});

export default function Page() {
  return <PrivacyPage />;
}
