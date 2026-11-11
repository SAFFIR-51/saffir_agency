import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // 없는 경로로 가는 Link를 타입 오류로 잡는다 (routes.ts가 Route 타입을 반환)
  typedRoutes: true,
  // 자동 메모이제이션. useMemo·useCallback·memo를 직접 쓰지 않는다 (frontend-guide 7번)
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // saffirgeo.saffirdev.com → saffir.co.kr/geo 301 이동은 src/proxy.ts에서 처리한다.
  // (redirects의 "/:path*" 규칙은 typedRoutes가 모든 경로를 유효로 보게 만들어 여기 두지 않는다)
};

export default nextConfig;
