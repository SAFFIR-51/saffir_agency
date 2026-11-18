import type { Metadata } from "next";
import { Suspense } from "react";
import { InvitePage } from "@/features/auth";

export const metadata: Metadata = { title: "포털 초대", robots: { index: false } };

export default function Page({ searchParams }: PageProps<"/invite">) {
  return (
    <Suspense fallback={null}>
      <Invite searchParams={searchParams} />
    </Suspense>
  );
}

async function Invite({ searchParams }: Pick<PageProps<"/invite">, "searchParams">) {
  const q = await searchParams;
  return (
    <InvitePage
      token={typeof q.token === "string" ? q.token : undefined}
      error={typeof q.error === "string" ? q.error.slice(0, 200) : undefined}
    />
  );
}
