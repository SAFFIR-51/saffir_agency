import { Suspense } from "react";
import { ProjectReportsPage } from "@/features/admin";

export default function Page(props: PageProps<"/admin/projects/[projectId]/reports">) {
  return (
    <Suspense fallback={null}>
      <Reports {...props} />
    </Suspense>
  );
}

async function Reports({ params, searchParams }: PageProps<"/admin/projects/[projectId]/reports">) {
  const [{ projectId }, query] = await Promise.all([params, searchParams]);
  const week = typeof query.week === "string" ? query.week : undefined;
  const editMeeting = typeof query.editMeeting === "string" ? query.editMeeting : undefined;
  return <ProjectReportsPage projectId={projectId} week={week} editMeeting={editMeeting} />;
}
