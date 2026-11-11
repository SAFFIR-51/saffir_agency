import Link from "next/link";
import { portalNav, type PortalNavItem } from "@/shared/config";

/** 가입한 서비스에 맞는 메뉴만 보여줍니다. 실제 권한 값은 portal feature가 넘깁니다. */
export function PortalSidebar({
  visible = () => true,
}: {
  visible?: (item: PortalNavItem) => boolean;
}) {
  return (
    <nav aria-label="포털 메뉴" className="flex flex-col gap-1 text-sm">
      {portalNav.filter(visible).map((item) => (
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
