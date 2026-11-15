import { Suspense } from "react";
import { ProjectRequestsPage } from "@/features/admin";

export default function Page(props: PageProps<"/admin/projects/[projectId]/requests">) {
  return (
    <Suspense fallback={null}>
      <Requests {...props} />
    </Suspense>
  );
}

async function Requests({
  params,
  searchParams,
}: PageProps<"/admin/projects/[projectId]/requests">) {
  const [{ projectId }, query] = await Promise.all([params, searchParams]);
  const status = typeof query.status === "string" ? query.status : undefined;
  return <ProjectRequestsPage projectId={projectId} status={status} />;
}
