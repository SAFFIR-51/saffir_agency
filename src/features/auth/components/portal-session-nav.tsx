import Link from "next/link";
import { getSession } from "@/server/auth";
import { memberKindLabels, routes } from "@/shared/config";
import { PortalSidebar } from "@/shared/layout";
import { logout } from "../api/logout";

/** 포털 왼쪽: 로그인한 고객사, 회원 종류, 그 회원에게 보이는 메뉴, 로그아웃 */
export async function PortalSessionNav() {
  const session = await getSession();
  if (!session) {
    return (
      <Link href={routes.auth.login} className="px-3 text-[15px] text-[#125de6]">
        로그인
      </Link>
    );
  }
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-[#f8f9fa] px-3.5 py-3">
        <p className="text-[15px] font-bold text-[#111]">{session.organization}</p>
        <p className="mt-0.5 text-[13px] text-[#9499a2]">
          {session.name} · {session.kinds.map((k) => memberKindLabels[k]).join(", ")}
        </p>
      </div>
      <PortalSidebar kinds={session.kinds} />
      <form action={logout} className="px-3">
        <button type="submit" className="text-[14px] text-[#9499a2] hover:text-[#111]">
          로그아웃
        </button>
      </form>
    </div>
  );
}
