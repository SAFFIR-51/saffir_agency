import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { signupBenefits } from "@/content/membership";
import { dataSource } from "@/server/api";
import { lookupInvite } from "@/server/invites";
import { routes } from "@/shared/config";
import { OrDivider, SocialButtons } from "./auth-ui";
import { SignupForm } from "./signup-form";

/** /signup?invite=토큰 : 초대가 살아 있고 아직 계정이 없으면 초대 가입서, 아니면 보통 가입서 */
export async function SignupRoute({ inviteToken }: { inviteToken?: string }) {
  if (!inviteToken || dataSource() !== "api") return <SignupPage />;
  const found = await lookupInvite(inviteToken);
  return found.status === "valid" && !found.hasAccount ? (
    <SignupPage invite={{ token: inviteToken, email: found.email, client: found.client }} />
  ) : (
    <SignupPage />
  );
}

/** 무료 회원가입: 간편 가입(네이버·카카오) + 이메일 가입. 초대 링크로 오면 이메일 가입만 */
export function SignupPage({
  invite,
}: {
  invite?: { token: string; email: string; client: string };
}) {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">
        {invite ? "계정 만들고 참여하기" : "무료 회원가입"}
      </h1>
      {invite ? (
        <p className="mt-2 text-[0.9375rem] text-neutral-600">
          가입하면 <b className="text-black">{invite.client}</b> 포털에 바로 연결됩니다.
        </p>
      ) : (
        <>
          <p className="mt-2 text-[0.9375rem] text-neutral-600">
            진단 기록과 신청 내역을 한곳에서 볼 수 있습니다.
          </p>
          <ul className="mt-4 flex flex-col gap-1 text-sm text-neutral-700">
            {signupBenefits.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden="true" className="text-neutral-400">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8" />

      <SignupForm
        links={{ terms: routes.legal.terms as Route, privacy: routes.legal.privacy as Route }}
        invite={invite}
      />

      {invite ? null : (
        <>
          <OrDivider>또는 간편 가입</OrDivider>
          <Suspense fallback={<div aria-hidden="true" className="h-[6.5rem]" />}>
            <SocialButtons mode="signup" />
          </Suspense>
        </>
      )}

      <p className="mt-6 text-center text-sm text-neutral-600">
        이미 계정이 있으신가요?{" "}
        <Link href={routes.auth.login} className="font-semibold text-black hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
