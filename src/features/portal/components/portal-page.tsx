import { Suspense } from "react";
import { PageHeader, WireBox } from "@/shared/ui";

/** 포털 화면 공통: 로그인 정보를 읽는 본문을 Suspense 안에 둔다 (Cache Components) */
export function PortalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader eyebrow="포털" title={title} />
          <div className="px-4 sm:px-6">
            <WireBox label="불러오는 중" size="lg" />
          </div>
        </>
      }
    >
      {children}
    </Suspense>
  );
}
