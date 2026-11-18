import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectBillingPage } from "@/features/admin";

export const metadata: Metadata = { title: "청구" };

export default function Page({
  params,
  searchParams,
}: PageProps<"/admin/projects/[projectId]/billing">) {
  return (
    <Suspense fallback={null}>
      <Body params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Body({
  params,
  searchParams,
}: Pick<PageProps<"/admin/projects/[projectId]/billing">, "params" | "searchParams">) {
  const [{ projectId }, query] = await Promise.all([params, searchParams]);
  return <ProjectBillingPage projectId={projectId} error={query.error === "1"} />;
}
