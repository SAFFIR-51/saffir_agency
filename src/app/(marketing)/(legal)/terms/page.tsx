import type { Metadata } from "next";
import { TermsPage } from "@/features/legal";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "이용약관",
  description: "사피어(주식회사 사피어테크놀로지) 웹사이트와 솔루션·포털 서비스 이용약관입니다.",
  path: routes.legal.terms,
  og: "default",
});

export default function Page() {
  return <TermsPage />;
}
