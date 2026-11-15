import { Suspense } from "react";

/** 포털 화면 공통: 로그인 정보를 읽는 본문을 Suspense 안에 둔다 (Cache Components) */
export function PortalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div aria-busy="true">
          <h1 className="text-[1.75rem] font-bold tracking-[-0.03em]">{title}</h1>
          <div className="mt-8 h-72 animate-pulse rounded-lg bg-neutral-100" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
