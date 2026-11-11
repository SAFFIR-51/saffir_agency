import { PagePlaceholder } from "@/shared/layout";

/**
 * 기획서: 모든 솔루션 페이지는 같은 순서를 따릅니다.
 * 해결하는 문제 → 주요 기능 → 화면·데모 → 도입 사례 → 요금 → 도입 절차 → FAQ → 신청 버튼
 * 페이지마다 다른 것은 "다음 행동" 버튼(cta)입니다.
 */
export const SOLUTION_SECTION_ORDER = [
  "해결하는 문제",
  "주요 기능",
  "화면·데모",
  "도입 사례",
  "요금",
  "도입 절차",
  "FAQ",
  "신청 버튼",
] as const;

export type SolutionPageContent = {
  name: string;
  message: string;
  cta: { label: string; href: string };
};

export function SolutionTemplate({ content }: { content: SolutionPageContent }) {
  return (
    <PagePlaceholder
      title={content.name}
      description={`${content.message} · 다음 행동: ${content.cta.label}`}
      sections={[...SOLUTION_SECTION_ORDER]}
    />
  );
}
