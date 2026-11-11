"use client";

import Link from "next/link";
import { useEffect } from "react";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui";

/** 예상하지 못한 오류 화면 (app의 error.tsx에서 쓴다) */
export function ErrorScreen({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // TODO: 오류 수집 도구가 정해지면 여기서 보낸다
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">일시적인 문제가 생겼습니다</h1>
      <p className="text-foreground/70">잠시 후 다시 시도해 주세요. 계속되면 문의해 주세요.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => retry()}>
          다시 시도
        </Button>
        <Link href={routes.contact} className="self-center underline underline-offset-4">
          문의하기
        </Link>
      </div>
    </div>
  );
}
