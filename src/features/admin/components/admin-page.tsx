import { Suspense } from "react";

/** 어드민 화면 공통: 로그인·데이터를 읽는 본문을 Suspense 안에 둔다 (Cache Components) */
export function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={<div aria-hidden="true" className="h-96 animate-pulse rounded-lg bg-neutral-100" />}
    >
      {children}
    </Suspense>
  );
}
