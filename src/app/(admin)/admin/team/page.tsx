import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminTeamPage } from "@/features/admin";

export const metadata: Metadata = { title: "팀" };

export default function Page({ searchParams }: PageProps<"/admin/team">) {
  return (
    <Suspense fallback={null}>
      <Team searchParams={searchParams} />
    </Suspense>
  );
}

async function Team({ searchParams }: Pick<PageProps<"/admin/team">, "searchParams">) {
  const q = await searchParams;
  return <AdminTeamPage edit={typeof q.edit === "string" ? q.edit : undefined} />;
}
