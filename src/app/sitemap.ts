import type { MetadataRoute } from "next";
import { portfolioItems } from "@/content/portfolio";
import { routes, site } from "@/shared/config";

/** 내용을 크게 고친 날. 페이지를 손보면 이 날짜를 올린다 (검색엔진이 다시 읽어 가는 신호) */
const UPDATED = "2026-11-19";

type Entry = { path: string; priority: number; change: "weekly" | "monthly" | "yearly" };

const pages: Entry[] = [
  { path: routes.home, priority: 1, change: "weekly" },
  { path: routes.hospital.geo, priority: 0.9, change: "monthly" },
  { path: routes.hospital.website, priority: 0.9, change: "monthly" },
  { path: routes.hospital.crm, priority: 0.9, change: "monthly" },
  { path: routes.solutions.connect, priority: 0.8, change: "monthly" },
  { path: routes.solutions.erp, priority: 0.8, change: "monthly" },
  { path: routes.development.process, priority: 0.8, change: "monthly" },
  { path: routes.development.estimate, priority: 0.7, change: "monthly" },
  { path: routes.pricing, priority: 0.8, change: "monthly" },
  { path: routes.portfolio, priority: 0.8, change: "weekly" },
  { path: routes.about, priority: 0.6, change: "monthly" },
  { path: routes.faq, priority: 0.6, change: "monthly" },
  { path: routes.contact, priority: 0.6, change: "yearly" },
  ...Object.values(routes.legal).map((path) => ({
    path,
    priority: 0.2,
    change: "yearly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.domain}${path === "/" ? "" : path}`;
  return [
    ...pages.map((p) => ({
      url: url(p.path),
      lastModified: UPDATED,
      changeFrequency: p.change,
      priority: p.priority,
    })),
    ...portfolioItems.map((item) => ({
      url: url(routes.portfolioDetail(item.slug)),
      lastModified: UPDATED,
      changeFrequency: "yearly" as const,
      priority: item.hideFromGallery ? 0.3 : 0.5,
      ...(item.image && { images: [url(item.image)] }),
    })),
  ];
}
