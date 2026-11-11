import Link from "next/link";
import { routes } from "@/shared/config";

/** 없는 주소. 자주 찾는 곳으로 바로 갈 수 있게 링크를 둔다 */
const links = [
  { label: "메인", href: routes.home },
  { label: "요금 안내", href: routes.pricing },
  { label: "포트폴리오", href: routes.portfolio },
  { label: "문의", href: routes.contact },
] as const;

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-foreground/70">주소가 바뀌었거나 없는 페이지입니다.</p>
      <ul className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
