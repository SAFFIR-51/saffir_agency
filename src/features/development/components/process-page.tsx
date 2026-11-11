import { PagePlaceholder } from "@/shared/layout";

export function ProcessPage() {
  return (
    <PagePlaceholder
      title="개발 프로세스"
      sections={["착수", "기획", "디자인", "개발", "검수", "운영"]}
    />
  );
}
