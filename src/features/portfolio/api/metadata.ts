import type { Metadata } from "next";
import { routes } from "@/shared/config";
import { pageMetadata, portfolioGraph } from "@/shared/seo";
import { findPortfolio } from "./queries";

/** 사례 설명: 한 줄 소개 + 분야·기술 (검색·공유 미리보기용) */
function describe(slug: string) {
  const item = findPortfolio(slug);
  if (!item) return null;
  const tail = `${item.groupName} 분야 ${item.techNames.join("·")} 프로젝트, 사피어 제작.`;
  return { item, description: item.summary ? `${item.summary} ${tail}` : tail };
}

export function getPortfolioMetadata(slug: string): Metadata {
  const found = describe(slug);
  if (!found) return { title: "포트폴리오" };
  return pageMetadata({
    title: found.item.title,
    description: found.description,
    path: routes.portfolioDetail(slug),
    // public/og/portfolio/{slug}.jpg (대표 화면 + 제목 카드)
    og: `portfolio/${slug}`,
  });
}

/** 상세 화면에 넣는 구조화데이터 */
export function getPortfolioJsonLd(slug: string) {
  const found = describe(slug);
  if (!found) return null;
  const { item } = found;
  return portfolioGraph({
    path: routes.portfolioDetail(slug),
    title: item.title,
    description: found.description,
    image: item.detailImage?.src ?? item.image,
    category: item.groupName,
    keywords: [item.groupName, ...item.techNames],
  });
}
