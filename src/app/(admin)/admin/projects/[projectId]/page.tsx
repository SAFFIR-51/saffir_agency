import { Suspense } from "react";
import { ProjectPlanPage } from "@/features/admin";

export default function Page(props: PageProps<"/admin/projects/[projectId]">) {
  return (
    <Suspense fallback={null}>
      <Plan {...props} />
    </Suspense>
  );
}

async function Plan({ params, searchParams }: PageProps<"/admin/projects/[projectId]">) {
  const [{ projectId }, query] = await Promise.all([params, searchParams]);
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);
  return <ProjectPlanPage projectId={projectId} view={one(query.view)} edit={one(query.edit)} />;
}
