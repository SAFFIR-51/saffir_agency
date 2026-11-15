import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestsPage } from "@/features/portal";

export const metadata: Metadata = { title: "요청·문의" };

export default function Page({ searchParams }: PageProps<"/dashboard/requests">) {
  return (
    <Suspense fallback={null}>
      <Requests searchParams={searchParams} />
    </Suspense>
  );
}

async function Requests({ searchParams }: Pick<PageProps<"/dashboard/requests">, "searchParams">) {
  const query = await searchParams;
  return (
    <RequestsPage
      sent={typeof query.sent === "string" ? query.sent : undefined}
      error={query.error === "1"}
    />
  );
}
