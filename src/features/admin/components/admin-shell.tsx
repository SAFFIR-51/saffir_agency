import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { apiHealthy, dataSource } from "@/server/api";
import { getSession } from "@/server/auth";
import { listProjects, listRequests } from "@/server/projects";
import { routes } from "@/shared/config";
import { adminLogout } from "../api/logout";
import { AdminNav } from "./admin-nav";

async function StaffBox() {
  const session = await getSession();
  if (!session?.staff) return null;
  return (
    <div className="text-sm">
      <DataSourceBadge />
      <p className="mt-4 font-semibold">{session.name}</p>
      <p className="text-xs text-neutral-500">{session.organization}</p>
      <form action={adminLogout} className="mt-3">
        <button
          type="submit"
          className="text-xs text-neutral-500 underline underline-offset-4 hover:text-black"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}

/** 지금 어떤 데이터를 쓰는지: 데모(백엔드 없음) / 백엔드 연결됨 / 백엔드 응답 없음 */
async function DataSourceBadge() {
  const source = dataSource();
  const healthy = source === "api" ? await apiHealthy() : null;
  const [dot, label] =
    source === "demo"
      ? ["bg-neutral-400", "데모 데이터"]
      : healthy
        ? ["bg-emerald-500", "백엔드 연결됨"]
        : ["bg-red-600", "백엔드 응답 없음"];
  return (
    <p
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2 py-0.5 text-[0.6875rem] text-neutral-600"
      title={source === "demo" ? "API_URL이 없어 예시 데이터로 동작합니다" : process.env.API_URL}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </p>
  );
}

/** 메뉴 옆 숫자: 진행 중 프로젝트, 열린 요청 */
async function NavWithCounts() {
  const session = await getSession();
  if (!session?.staff) return <AdminNav />;
  return (
    <AdminNav
      counts={{
        [routes.admin.projects]: listProjects().filter((p) => !p.archivedAt).length,
        [routes.admin.requests]: listRequests().filter((r) => r.status !== "완료").length,
      }}
    />
  );
}

/** 어드민 틀: 왼쪽 메뉴 + 본문 (흰 배경 고정) */
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-cursor flex min-h-dvh flex-col bg-white text-black [--background:#ffffff] [--foreground:#171717] md:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-neutral-200 p-4 md:sticky md:top-0 md:h-dvh md:w-56 md:border-r md:border-b-0 md:p-5">
        <Link href={routes.admin.home} className="flex items-center gap-2">
          <Image
            src="/brand/saffir-logo.png"
            alt="사피어"
            width={1007}
            height={224}
            className="h-auto w-24"
          />
          <span className="rounded-full border border-black px-2 py-0.5 text-[0.6875rem] font-bold">
            어드민
          </span>
        </Link>
        <Suspense fallback={<div aria-hidden="true" className="h-10 md:h-[14.25rem]" />}>
          <NavWithCounts />
        </Suspense>
        <div className="mt-auto hidden md:block">
          <Suspense fallback={null}>
            <StaffBox />
          </Suspense>
          <Link href={routes.home} className="mt-4 block text-xs text-neutral-400 hover:text-black">
            사이트로 →
          </Link>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
