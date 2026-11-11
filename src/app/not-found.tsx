import Link from "next/link";
import { routes } from "@/shared/config";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <Link href={routes.home} className="underline">
        홈으로
      </Link>
    </main>
  );
}
