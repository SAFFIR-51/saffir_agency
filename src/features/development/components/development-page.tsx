import { PagePlaceholder } from "@/shared/layout";

export function DevelopmentPage() {
  return (
    <PagePlaceholder
      title="맞춤 개발"
      description="보유 모듈로 빠르게 만듭니다."
      sections={["웹·앱", "쇼핑몰", "플랫폼 연동", "AI", "IoT", "보유 모듈", "정찰가 패키지"]}
    />
  );
}
