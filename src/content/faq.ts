export type FaqItem = {
  q: string;
  a: string;
  category: "common" | "hospital" | "solution" | "billing";
};

/** TODO: 서비스별 FAQ 채우기 */
export const faqItems: FaqItem[] = [];
