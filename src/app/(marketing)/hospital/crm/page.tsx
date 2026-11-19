import type { Metadata } from "next";
import { CrmPage } from "@/features/crm";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "사피어 병원 CRM",
  description:
    "방문 이력으로 환자를 나누고 검진·재처치 시기에 알림톡·문자 안내를 예약해 보내는 병원 CRM입니다. 병원마다 전용 서버·DB로 운영하고 발송 결과를 한 화면에서 봅니다.",
  path: routes.hospital.crm,
  og: "crm",
});

export default function Page() {
  return <CrmPage />;
}
