import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminInquiriesPage } from "@/features/admin";

export const metadata: Metadata = { title: "문의" };

const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default function Page({ searchParams }: PageProps<"/admin/inquiries">) {
  return (
    <Suspense fallback={null}>
      <Inquiries searchParams={searchParams} />
    </Suspense>
  );
}

async function Inquiries({ searchParams }: Pick<PageProps<"/admin/inquiries">, "searchParams">) {
  const q = await searchParams;
  const status = one(q.status);
  const kind = one(q.kind);
  return (
    <AdminInquiriesPage
      status={status === "new" || status === "replied" || status === "closed" ? status : undefined}
      kind={kind === "contact" || kind === "estimate" ? kind : undefined}
      id={one(q.id)}
    />
  );
}
