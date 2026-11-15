import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminRequestsPage } from "@/features/admin";

export const metadata: Metadata = { title: "요청함" };

export default function Page({ searchParams }: PageProps<"/admin/requests">) {
  return (
    <Suspense fallback={null}>
      <Requests searchParams={searchParams} />
    </Suspense>
  );
}

async function Requests({ searchParams }: Pick<PageProps<"/admin/requests">, "searchParams">) {
  const query = await searchParams;
  return (
    <AdminRequestsPage
      status={typeof query.status === "string" ? query.status : undefined}
      error={query.error === "1"}
    />
  );
}
