import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /**
   * saffirgeo 흡수 (기획서 "saffirgeo 통합 방식")
   * saffirgeo.saffirdev.com 의 모든 주소 → saffir.co.kr/geo 같은 경로로 영구 이동.
   * 해당 도메인이 이 배포를 가리키도록 DNS를 연결해야 동작합니다.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "saffirgeo.saffirdev.com" }],
        destination: "https://saffir.co.kr/geo/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
