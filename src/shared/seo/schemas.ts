import type { Route } from "next";
import { routes, site } from "@/shared/config";

/**
 * 구조화데이터(JSON-LD) 모음. 화면에 실제로 보이는 내용만 넣는다 (검색 가이드라인).
 * 후기·별점(Review, AggregateRating)은 실제 후기가 생기기 전에는 넣지 않는다.
 */
const ORG_ID = `${site.domain}/#organization`;
const WEBSITE_ID = `${site.domain}/#website`;
export const absoluteUrl = (path: string) => `${site.domain}${path === "/" ? "" : path}`;

type Crumb = { name: string; path: string };
type Faq = readonly { q: string; a: string }[];

/** 회사 + 웹사이트 (공개 페이지 전체) */
export function siteGraph() {
  const b = site.business;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        alternateName: ["SAFFIR", "사피어테크놀로지", "SAFFIR TECHNOLOGY"],
        url: site.domain,
        logo: absoluteUrl(site.logo),
        description: site.description,
        email: b.email,
        telephone: b.phone,
        taxID: b.registrationNumber,
        founder: { "@type": "Person", name: b.ceo },
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address,
          addressLocality: "성북구",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: b.email,
          telephone: b.phone,
          areaServed: "KR",
          availableLanguage: ["ko"],
        },
        knowsAbout: [
          "병원 홈페이지 제작",
          "병원 CRM",
          "AI 검색 최적화(GEO)",
          "커머스 마켓 연동",
          "업무 통합 ERP",
          "웹·앱 맞춤 개발",
        ],
        ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.name,
        url: site.domain,
        inLanguage: "ko-KR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** 이동 경로: 홈 → (중간 단계) → 현재 페이지 */
function breadcrumb(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "홈", path: routes.home }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** 자주 묻는 질문 (화면에 보이는 질문·답과 같아야 한다) */
function faqPage(path: string, items: Faq) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** 서비스 페이지: 서비스 + 이동 경로 (+ FAQ, 요금) */
export function serviceGraph({
  path,
  name,
  description,
  faq,
  offers,
}: {
  path: Route;
  name: string;
  description: string;
  faq?: Faq;
  /** 화면 요금표와 같은 금액 (원, 부가세 별도면 설명에 적는다) */
  offers?: readonly { name: string; price: number; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#service`,
        name,
        description,
        url: absoluteUrl(path),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "대한민국" },
        inLanguage: "ko-KR",
        ...(offers &&
          offers.length > 0 && {
            offers: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: o.price,
              priceCurrency: "KRW",
              ...(o.description && { description: o.description }),
            })),
          }),
      },
      breadcrumb([{ name, path }]),
      ...(faq && faq.length > 0 ? [faqPage(path, faq)] : []),
    ],
  };
}

/** FAQ 모음 페이지 */
export function faqGraph({ path, name, items }: { path: Route; name: string; items: Faq }) {
  return {
    "@context": "https://schema.org",
    "@graph": [faqPage(path, items), breadcrumb([{ name, path }])],
  };
}

/** 포트폴리오 사례: 만든 것 + 이동 경로 */
export function portfolioGraph({
  path,
  title,
  description,
  image,
  category,
  keywords,
}: {
  path: Route;
  title: string;
  description?: string;
  image?: string;
  category: string;
  keywords: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(path)}#work`,
        name: title,
        ...(description && { description }),
        url: absoluteUrl(path),
        ...(image && { image: absoluteUrl(image) }),
        genre: category,
        keywords: keywords.join(", "),
        inLanguage: "ko-KR",
        creator: { "@id": ORG_ID },
      },
      breadcrumb([
        { name: "포트폴리오", path: routes.portfolio },
        { name: title, path },
      ]),
    ],
  };
}
