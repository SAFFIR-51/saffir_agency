import type { Metadata } from "next";
import { ConnectPage } from "@/features/solutions";
import { pageMetadata } from "@/shared/seo";
import { routes } from "@/shared/config";

export const metadata: Metadata = pageMetadata({
  title: "사피어 커머스 연동",
  description:
    "스마트스토어·쿠팡·카페24 등 여러 마켓을 한 화면에 연결합니다. 채널별 주문을 모아 보고 재고를 자동으로 동기화하는 사피어 커머스 연동 솔루션.",
  path: routes.solutions.connect,
  og: "connect",
});

export default function Page() {
  return <ConnectPage />;
}
