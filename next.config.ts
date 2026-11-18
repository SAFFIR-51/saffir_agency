import type { NextConfig } from "next";

/** 백엔드(NestJS, server/) 주소. 비어 있으면 데모 데이터로만 동작한다 (src/server/api/mode.ts) */
const API_URL = process.env.API_URL;

const nextConfig: NextConfig = {
  // Docker 이미지(Dockerfile.frontend)는 standalone 결과물만 담는다
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  // 없는 경로로 가는 Link를 타입 오류로 잡는다 (routes.ts가 Route 타입을 반환)
  typedRoutes: true,
  // 자동 메모이제이션. useMemo·useCallback·memo를 직접 쓰지 않는다 (frontend-guide 7번)
  reactCompiler: true,
  experimental: {
    // 어드민 산출물 파일 올리기(서버 액션 → 백엔드 /api/upload, 50MB)
    serverActions: { bodySizeLimit: "50mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    // 개발 환경: NestJS(:4000)를 같은 주소로 프록시 → 쿠키 인증이 운영(nginx)과 같게 동작
    // 운영: nginx.conf가 /api, /uploads를 server:4000으로 보낸다
    if (process.env.NODE_ENV !== "development" || !API_URL) return [];
    return [
      { source: "/api/:path*", destination: `${API_URL}/api/:path*` },
      { source: "/uploads/:path*", destination: `${API_URL}/uploads/:path*` },
    ];
  },
  // saffirgeo.saffirdev.com → saffir.co.kr/geo 301 이동은 src/proxy.ts에서 처리한다.
  // (redirects의 "/:path*" 규칙은 typedRoutes가 모든 경로를 유효로 보게 만들어 여기 두지 않는다)
};

export default nextConfig;
