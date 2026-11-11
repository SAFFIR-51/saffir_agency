# 예시 3. 페이지 (app/…/page.tsx)

> 아래는 v1에 이미 있는 실제 파일입니다. 새 페이지도 이 모양을 따릅니다.

## 원칙

- page.tsx는 **metadata + feature 화면 import**만 한다. 마크업·로직을 넣지 않는다
- feature는 index(공개 API)로만 가져온다: `@/features/<이름>`
- 경로는 `shared/config/routes.ts`에 먼저 등록하고, 공개 페이지면 `app/sitemap.ts`에 추가한다

## 기본 페이지

```tsx
// src/app/(marketing)/pricing/page.tsx
import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing";

export const metadata: Metadata = { title: "요금 안내" };

export default function Page() {
  return <PricingPage />;
}
```

```ts
// src/features/pricing/index.ts
export { PricingPage } from "./components/pricing-page";
```

## 동적 경로 — 미리 알 수 있는 값 (generateStaticParams)

```tsx
// src/app/(marketing)/portfolio/[slug]/page.tsx
import { getPortfolioSlugs, PortfolioDetailPage } from "@/features/portfolio";

export async function generateStaticParams() {
  return getPortfolioSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  return <PortfolioDetailPage slug={slug} />;
}
```

## 동적 경로 — 요청마다 다른 값 (Suspense)

Cache Components가 켜져 있어서, 미리 알 수 없는 params·쿠키·searchParams는 `<Suspense>` 안에서 읽는다.

```tsx
// src/app/(portal)/dashboard/projects/[projectId]/page.tsx
import { Suspense } from "react";
import { ProjectDetailPage } from "@/features/portal";

export default function Page({ params }: PageProps<"/dashboard/projects/[projectId]">) {
  return (
    <Suspense fallback={<p className="p-6 text-sm">불러오는 중…</p>}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ProjectDetailPage projectId={projectId} />;
}
```

## 새 페이지 추가 순서

1. `features/<서비스>/components/`에 화면 작성 → `index.ts`에서 export
2. `app/(marketing|auth|portal)/<경로>/page.tsx` 작성 (metadata + 화면 import)
3. `npm run typecheck` (또는 `npm run dev`)로 라우트 타입을 다시 만든 뒤 `shared/config/routes.ts`에 경로 추가
   - typedRoutes는 실제 page.tsx가 있는 경로만 `Route`로 인정하므로, 페이지보다 경로를 먼저 추가하면 타입 오류가 난다
4. 공개 페이지면 `app/sitemap.ts`에 추가
5. `npm run check`
