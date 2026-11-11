import {
  getPortfolioItem,
  industryFilters,
  portfolioGroups,
  portfolioItems,
  techLabels,
  type PortfolioGroup,
} from "@/content/portfolio";

/** 지금은 content 파일을 읽고, 나중에 CMS·DB로 바꿀 때 이 파일만 고칩니다. */
export function listPortfolioByGroup() {
  return (Object.keys(portfolioGroups) as PortfolioGroup[]).map((group) => ({
    group,
    name: portfolioGroups[group],
    items: portfolioItems.filter((item) => item.group === group),
  }));
}

export function getPortfolioMeta() {
  return { total: portfolioItems.length, industryFilters, techLabels };
}

export function getPortfolioSlugs() {
  return portfolioItems.map((item) => item.slug);
}

export function findPortfolio(slug: string) {
  const item = getPortfolioItem(slug);
  if (!item) return undefined;
  return {
    ...item,
    groupName: portfolioGroups[item.group],
    techNames: item.tech.map((t) => techLabels[t]),
  };
}
