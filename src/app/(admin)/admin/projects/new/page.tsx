import type { Metadata } from "next";
import { Suspense } from "react";
import { NewProjectPage } from "@/features/admin";

export const metadata: Metadata = { title: "새 프로젝트" };

export default function Page({ searchParams }: PageProps<"/admin/projects/new">) {
  return (
    <Suspense fallback={null}>
      <New searchParams={searchParams} />
    </Suspense>
  );
}

async function New({ searchParams }: Pick<PageProps<"/admin/projects/new">, "searchParams">) {
  const query = await searchParams;
  return <NewProjectPage error={query.error === "1"} />;
}
