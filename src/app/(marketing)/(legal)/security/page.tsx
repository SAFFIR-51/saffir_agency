import type { Metadata } from "next";
import { SecurityPage } from "@/features/legal";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "보안·데이터 정책",
  description:
    "사피어 솔루션의 고객사 전용 서버·DB, 암호화, 접근 권한, 백업 정책과 데이터 소유 원칙을 안내합니다.",
  path: routes.legal.security,
  og: "default",
});

export default function Page() {
  return <SecurityPage />;
}
