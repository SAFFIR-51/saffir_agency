import Link from "next/link";
import { getSession } from "@/server/auth";
import { requirePortal } from "@/server/portal";
import { memberKindLabels, routes } from "@/shared/config";
import { PortalSidebar } from "@/shared/layout";
import { logout } from "../api/logout";

/** 포털 왼쪽: 고객사, 회원 종류, 그 회원에게 보이는 메뉴(처리할 것 숫자), 로그아웃 */
export async function PortalSessionNav() {
  const session = await getSession();
  if (!session) {
    return (
      <Link href={routes.auth.login} className="px-3 text-sm underline underline-offset-4">
        로그인
      </Link>
    );
  }
  const { data } = await requirePortal(routes.portal.home);
  const counts = {
    [routes.portal.projects]: data.projects.reduce(
      (n, p) => n + p.deliverables.filter((d) => d.status === "승인 대기").length,
      0,
    ),
    [routes.portal.billing]: data.invoices.filter((i) => i.status === "미결제").length,
  };
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="rounded-lg bg-neutral-50 px-3 py-3 text-sm">
        <p className="font-bold">{session.organization || session.name}</p>
        <p className="mt-0.5 text-xs text-neutral-500">
          {session.name} · {session.kinds.map((k) => memberKindLabels[k]).join(", ")}
        </p>
      </div>
      <PortalSidebar kinds={session.kinds} counts={counts} />
      <div className="mt-auto hidden flex-col gap-2 px-3 text-xs text-neutral-500 md:flex">
        <form action={logout}>
          <button type="submit" className="underline underline-offset-4 hover:text-black">
            로그아웃
          </button>
        </form>
        <Link href={routes.home} className="hover:text-black">
          사이트로 →
        </Link>
      </div>
    </div>
  );
}
