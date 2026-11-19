import type { Metadata } from "next";
import { HospitalWebsitePage } from "@/features/hospital";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "사피어 병원 홈페이지",
  description:
    "환자가 병원을 찾는 순간부터 진료 예약까지, AI 검색에 강한 병원 홈페이지를 만들고 운영합니다. 진료 안내·의료진·위치·예약 동선을 한 흐름으로 설계하는 사피어 병원 홈페이지 제작.",
  path: routes.hospital.website,
  og: "hospital-website",
});

export default function Page() {
  return <HospitalWebsitePage />;
}
