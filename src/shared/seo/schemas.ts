import type { Route } from "next";
import { routes, site } from "@/shared/config";

const ORG_ID = `${site.domain}/#organization`;
const absolute = (path: string) => `${site.domain}${path === "/" ? "" : path}`;

/** 회사 + 웹사이트 (공개 페이지 전체) */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.domain,
        description: site.description,
      },
      {
        "@type": "WebSite",
        "@id": `${site.domain}/#website`,
        name: site.name,
        url: site.domain,
        inLanguage: "ko-KR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

function breadcrumbItems(path: Route, name: string) {
  const items = [
    { name: "홈", path: routes.home },
    { name, path },
  ];
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  }));
}

/** 서비스 페이지: 서비스 + 이동 경로 */
export function serviceGraph({
  path,
  name,
  description,
}: {
  path: Route;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        description,
        url: absolute(path),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "대한민국" },
      },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbItems(path, name) },
    ],
  };
}
