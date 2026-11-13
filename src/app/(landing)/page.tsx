import { HomePage } from "@/features/home";
import { QuickInquiry } from "@/features/inquiry";

/** 메인: 소개 섹션들 + 맨 아래 바로 쓰는 문의 폼 */
export default function Page() {
  return (
    <>
      <HomePage />
      <QuickInquiry />
    </>
  );
}
