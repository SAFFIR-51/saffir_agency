import { Suspense } from "react";
import { ProjectPreviewPage } from "@/features/admin";

export default function Page({ params }: PageProps<"/admin/projects/[projectId]/preview">) {
  return (
    <Suspense fallback={null}>
      <Preview params={params} />
    </Suspense>
  );
}

async function Preview({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ProjectPreviewPage projectId={projectId} />;
}
