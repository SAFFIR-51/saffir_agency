import { getPortfolioItem, portfolioGroups, portfolioItems } from "@/content/portfolio";

/** 지금은 content 파일을 읽고, 나중에 CMS·DB로 바꿀 때 이 파일만 고칩니다. */
export function listPortfolio() {
  return portfolioItems;
}

export function listPortfolioGroups() {
  return portfolioGroups;
}

export function getPortfolioSlugs() {
  return portfolioItems.map((item) => item.slug);
}

export function findPortfolio(slug: string) {
  return getPortfolioItem(slug);
}
