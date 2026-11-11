import Link from "next/link";
import { isPortalMenuVisible, portalNav, type MemberKind } from "@/shared/config";

/**
 * 가입한 서비스에 맞는 메뉴만 보여 준다 (기획서: 포털 메뉴는 가입한 서비스에 따라 보이거나 숨겨진다).
 * kinds는 로그인 세션에서 온다. 세션이 아직 없어서 와이어프레임에서는 전체를 보여 준다.
 */
export function PortalSidebar({
  kinds = ["member", "subscriber", "project", "solution"],
}: {
  kinds?: readonly MemberKind[];
}) {
  return (
    <nav aria-label="포털 메뉴" className="flex flex-wrap gap-1 text-sm md:flex-col">
      {portalNav
        .filter((item) => isPortalMenuVisible(item, kinds))
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 hover:bg-foreground/5"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
}
