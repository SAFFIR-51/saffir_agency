import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountPage } from "@/features/portal";

export const metadata: Metadata = { title: "계정" };

const one = (v: string | string[] | undefined) =>
  typeof v === "string" ? v.slice(0, 200) : undefined;

export default function Page({ searchParams }: PageProps<"/dashboard/account">) {
  return (
    <Suspense fallback={null}>
      <Account searchParams={searchParams} />
    </Suspense>
  );
}

async function Account({ searchParams }: Pick<PageProps<"/dashboard/account">, "searchParams">) {
  const q = await searchParams;
  return (
    <AccountPage
      saved={q.saved === "1"}
      error={one(q.error)}
      invited={one(q.invited)}
      inviteError={one(q.inviteError)}
    />
  );
}
