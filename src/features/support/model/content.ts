import type { FaqCategory } from "@/content/faq";

/** FAQ 페이지 묶음 순서 */
export const faqCategories: { key: FaqCategory; label: string }[] = [
  { key: "common", label: "공통" },
  { key: "hospital", label: "병원 솔루션" },
  { key: "solution", label: "비즈니스 솔루션" },
  { key: "billing", label: "결제·환불" },
];
