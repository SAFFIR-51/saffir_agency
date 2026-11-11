import { PagePlaceholder } from "@/shared/layout";

export function HospitalOverviewPage() {
  return (
    <PagePlaceholder
      title="병원 솔루션"
      description="무료 진단부터 홈페이지, 관리, CRM까지 하나의 흐름으로 연결합니다."
      sections={[
        "무료 진단",
        "무료 회원가입",
        "GEO 구독",
        "홈페이지 제작·리뉴얼",
        "GEO 관리형 + 유지보수",
        "병원 CRM",
        "병원 성장 패키지",
      ]}
    />
  );
}
