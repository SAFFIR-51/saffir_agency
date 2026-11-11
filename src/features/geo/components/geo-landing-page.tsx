import { PagePlaceholder } from "@/shared/layout";

export function GeoLandingPage() {
  return (
    <PagePlaceholder
      title="사피어 AI 검색 최적화"
      description="ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인하세요."
      sections={["주소 입력창 (무료 진단하기)", "8개 분야 50여 항목", "샘플 리포트", "등급별 요금"]}
    />
  );
}
