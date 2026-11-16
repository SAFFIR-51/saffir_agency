import type { Metadata } from "next";
import { Suspense } from "react";
import { SignupPage, SignupRoute } from "@/features/auth";

export const metadata: Metadata = { title: "회원가입" };

export default function Page({ searchParams }: PageProps<"/signup">) {
  return (
    <Suspense fallback={<SignupPage />}>
      <Signup searchParams={searchParams} />
    </Suspense>
  );
}

async function Signup({ searchParams }: Pick<PageProps<"/signup">, "searchParams">) {
  const { invite } = await searchParams;
  return <SignupRoute inviteToken={typeof invite === "string" ? invite : undefined} />;
}
