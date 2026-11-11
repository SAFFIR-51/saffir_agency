import type { MetadataRoute } from "next";
import { routes, site } from "@/shared/config";

const publicPaths = [
  routes.home,
  routes.hospital.root,
  routes.hospital.geo,
  routes.hospital.adCheck,
  routes.hospital.website,
  routes.hospital.crm,
  routes.solutions.root,
  routes.solutions.connect,
  routes.solutions.erp,
  routes.solutions.aiChatbot,
  routes.development.root,
  routes.development.process,
  routes.development.estimate,
  routes.about,
  routes.portfolio,
  routes.pricing,
  routes.contact,
  routes.faq,
  ...Object.values(routes.legal),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: `${site.domain}${path}` }));
}
