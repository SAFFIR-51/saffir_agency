import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/shared/config";

/** 로그인·가입: 왼쪽 위 로고 + 가운데 좁은 폼 (실제 서비스 로그인 화면 구성) */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-cursor flex min-h-dvh flex-col bg-white text-black [--background:#ffffff] [--foreground:#171717]">
      <header className="flex h-16 items-center px-5 lg:h-20 lg:px-10">
        <Link
          href={routes.home}
          aria-label={site.name}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Image
            src="/brand/saffir-logo.png"
            alt=""
            width={1007}
            height={224}
            className="h-auto w-24 sm:w-28"
          />
        </Link>
      </header>
      <main className="flex flex-1 justify-center px-5 pt-8 pb-20 lg:pt-14">{children}</main>
    </div>
  );
}
