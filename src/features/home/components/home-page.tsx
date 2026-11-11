import { PagePlaceholder } from "@/shared/layout";

export function HomePage() {
  return (
    <PagePlaceholder
      title="만들고 끝내지 않습니다. 계속 돌아가게 책임집니다."
      description="병원·커머스·업무 시스템을 빠르게 만들고, 납품 뒤 운영까지 사피어가 맡습니다."
      sections={[
        "첫 화면: 가치 한 줄 + 버튼 2개 + 숫자 3개",
        "세 갈래 진입: 병원 / 비즈니스 / 맞춤 개발",
        "무료 GEO 진단 띠",
        "일하는 방식: 진단 → 구축 → 운영 → 포털에서 확인",
        "보유 모듈",
        "대표 사례 3건",
        "요금 공개 안내",
        "상담 유도",
      ]}
    />
  );
}
