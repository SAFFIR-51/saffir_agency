import { Suspense } from "react";
import { ProjectActivityPage } from "@/features/admin";

export default function Page({ params }: PageProps<"/admin/projects/[projectId]/activity">) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}

async function Body({ params }: Pick<PageProps<"/admin/projects/[projectId]/activity">, "params">) {
  const { projectId } = await params;
  return <ProjectActivityPage projectId={projectId} />;
}
