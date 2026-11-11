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
      <Link href={routes.auth.login} className="px-3 text-sm underline">
        로그인
      </Link>
    );
  }
  return (
    <div className="space-y-4">
      <div className="px-3 text-sm">
        <p className="font-semibold">{session.organization}</p>
        <p className="text-foreground/60">
          {session.name} · {session.kinds.map((k) => memberKindLabels[k]).join(", ")}
        </p>
      </div>
      <PortalSidebar kinds={session.kinds} />
      <form action={logout} className="px-3">
        <button type="submit" className="text-sm text-foreground/60 underline underline-offset-4">
          로그아웃
        </button>
      </form>
    </div>
  );
}
