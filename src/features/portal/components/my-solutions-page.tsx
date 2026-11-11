import { PagePlaceholder } from "@/shared/layout";

export function MySolutionsPage() {
  return (
    <PagePlaceholder
      title="내 솔루션"
      sections={[
        "도입한 솔루션 목록",
        "전용 서버 바로가기",
        "서버 상태",
        "월 사용량",
        "버전·업데이트 내역",
      ]}
    />
  );
}
