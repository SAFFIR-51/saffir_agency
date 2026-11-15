import { Suspense } from "react";
import { ProjectSettingsPage } from "@/features/admin";

export default function Page(props: PageProps<"/admin/projects/[projectId]/settings">) {
  return (
    <Suspense fallback={null}>
      <Body {...props} />
    </Suspense>
  );
}

async function Body({ params, searchParams }: PageProps<"/admin/projects/[projectId]/settings">) {
  const [{ projectId }, q] = await Promise.all([params, searchParams]);
  return <ProjectSettingsPage projectId={projectId} deleteError={q.error === "delete"} />;
}
