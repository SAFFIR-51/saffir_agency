import { Suspense } from "react";
import { ProjectDeliverablesPage } from "@/features/admin";

export default function Page(props: PageProps<"/admin/projects/[projectId]/deliverables">) {
  return (
    <Suspense fallback={null}>
      <Deliverables {...props} />
    </Suspense>
  );
}

async function Deliverables({
  params,
  searchParams,
}: PageProps<"/admin/projects/[projectId]/deliverables">) {
  const [{ projectId }, query] = await Promise.all([params, searchParams]);
  return (
    <ProjectDeliverablesPage
      projectId={projectId}
      edit={typeof query.edit === "string" ? query.edit : undefined}
      error={query.error === "1" || query.error === "file" ? query.error : undefined}
    />
  );
}
