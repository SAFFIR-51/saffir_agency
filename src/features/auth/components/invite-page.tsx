import type { Route } from "next";
import Link from "next/link";
import { dataSource } from "@/server/api";
import { getSession } from "@/server/auth";
import { lookupInvite } from "@/server/invites";
import { routes } from "@/shared/config";
import { acceptInviteAction } from "../api/invite";
import { authSubmit } from "./auth-ui";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

const box = "rounded-lg bg-neutral-100 px-4 py-4 text-sm leading-[1.6] text-neutral-700";
const linkBtn = `mt-5 flex items-center justify-center ${authSubmit}`;
const subLink = "mt-3 block text-center text-sm text-neutral-600 hover:text-black hover:underline";

/**
 * 초대 메일 링크(/invite?token=)로 들어오는 화면.
 * 처음이면 가입하고 참여, 이미 계정이 있으면 로그인하고 참여, 로그인돼 있으면 바로 참여.
 */
export async function InvitePage({ token, error }: { token?: string; error?: string }) {
  if (dataSource() !== "api" || !token) {
    return (
      <Shell title="포털 초대">
        <p className={box}>초대 링크가 올바르지 않습니다. 메일의 버튼을 다시 눌러 주세요.</p>
      </Shell>
    );
  }
  const [invite, session] = await Promise.all([lookupInvite(token), getSession()]);
  if (invite.status !== "valid") {
    return (
      <Shell title="포털 초대">
        <p className={box}>
          {invite.status === "used"
            ? "이미 수락한 초대입니다. 로그인하면 포털을 볼 수 있습니다."
            : invite.status === "expired"
              ? "초대 기간(7일)이 지났습니다. 초대한 분이나 담당 PM에게 다시 요청해 주세요."
              : "초대 링크가 올바르지 않습니다. 메일의 버튼을 다시 눌러 주세요."}
        </p>
        <Link href={routes.auth.login} className={linkBtn}>
          로그인
        </Link>
        <Link href={routes.contact} className={subLink}>
          문의하기
        </Link>
      </Shell>
    );
  }

  const here = `/invite?token=${token}`;
  const sameAccount = session?.email?.toLowerCase() === invite.email.toLowerCase();
  return (
    <Shell title={`${invite.client} 포털 초대`}>
      <p className="text-[0.9375rem] leading-[1.6] text-neutral-700">
        {invite.invitedBy ? `${invite.invitedBy}님이 ` : ""}
        <b className="text-black">{invite.client}</b> 포털에 초대했습니다. 프로젝트 진행 현황, 주간
        보고, 청구를 함께 확인할 수 있습니다.
      </p>
      <p className="mt-3 text-sm text-neutral-500">초대받은 이메일: {invite.email}</p>
      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {session && sameAccount ? (
        <form action={acceptInviteAction.bind(null, token)}>
          <button type="submit" className={`mt-6 ${authSubmit}`}>
            참여하기
          </button>
        </form>
      ) : session ? (
        <p className={`mt-6 ${box}`}>
          지금 {session.email} 계정으로 로그인돼 있습니다. 초대받은 {invite.email} 계정으로 다시
          로그인해 주세요.
        </p>
      ) : invite.hasAccount ? (
        <Link href={routes.auth.loginFrom(here)} className={linkBtn}>
          로그인하고 참여하기
        </Link>
      ) : (
        <>
          <Link href={`${routes.auth.signup}?invite=${token}` as Route} className={linkBtn}>
            계정 만들고 참여하기
          </Link>
          <Link href={routes.auth.loginFrom(here)} className={subLink}>
            이미 계정이 있어요
          </Link>
        </>
      )}
    </Shell>
  );
}
