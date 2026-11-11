import { PagePlaceholder } from "@/shared/layout";

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  return (
    <PagePlaceholder
      title={`프로젝트 ${projectId}`}
      sections={["단계·진행률", "일정", "산출물", "확인·승인 버튼"]}
    />
  );
}
