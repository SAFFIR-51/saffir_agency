import type { Metadata } from "next";
import { site } from "@/shared/config";

/**
 * 페이지별 메타데이터: 제목·설명·대표 주소(canonical)·공유 미리보기(OG·트위터).
 * 설명은 120~160자, 핵심 검색어(서비스명·업종)를 앞쪽에 둔다.
 * og는 public/og/{og}.jpg (1200×630, 흑백 카드). 없으면 사이트 기본 이미지.
 */
export function pageMetadata({
  title,
  description,
  path,
  og = "default",
}: {
  title: string;
  description: string;
  path: string;
  /** public/og/ 안의 파일 이름 (확장자 빼고) */
  og?: string;
}): Metadata {
  const ogImage = `/og/${og}.jpg`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} | ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

/** 검색에 나오면 안 되는 화면 (로그인·포털·어드민·주문 등) */
export const noIndex: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};
