import { Suspense } from "react";
import { ProjectDetailPage } from "@/features/portal";

export default function Page({ params }: PageProps<"/dashboard/projects/[projectId]">) {
  return (
    <Suspense fallback={<p className="p-6 text-sm">불러오는 중…</p>}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ProjectDetailPage projectId={projectId} />;
}
