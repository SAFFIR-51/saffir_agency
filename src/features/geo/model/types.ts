export type GeoPlanId = "geo-free" | "geo-monitoring" | "geo-pro" | "geo-managed";

export type GeoCategoryScore = { category: string; score: number; max: number };

export type GeoReport = {
  url: string;
  totalScore: number;
  categories: GeoCategoryScore[];
  priorities: string[];
  createdAt: string;
};
