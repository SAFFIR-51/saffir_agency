import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminGeoPage } from "@/features/admin";

export const metadata: Metadata = { title: "GEO" };

const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default function Page({ searchParams }: PageProps<"/admin/geo">) {
  return (
    <Suspense fallback={null}>
      <Geo searchParams={searchParams} />
    </Suspense>
  );
}

async function Geo({ searchParams }: Pick<PageProps<"/admin/geo">, "searchParams">) {
  const q = await searchParams;
  return <AdminGeoPage id={one(q.id)} error={one(q.error)} />;
}
