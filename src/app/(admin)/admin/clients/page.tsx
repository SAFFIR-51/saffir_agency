import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminClientsPage } from "@/features/admin";

export const metadata: Metadata = { title: "고객사" };

export default function Page({ searchParams }: PageProps<"/admin/clients">) {
  return (
    <Suspense fallback={null}>
      <Clients searchParams={searchParams} />
    </Suspense>
  );
}

async function Clients({ searchParams }: Pick<PageProps<"/admin/clients">, "searchParams">) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);
  return <AdminClientsPage edit={one(q.edit)} error={one(q.error)} />;
}
