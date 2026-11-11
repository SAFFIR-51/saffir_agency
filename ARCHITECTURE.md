# 사피어 웹사이트 구조

기획서(사피어 웹사이트 통합 기획서, 2026-11-09) 기준으로 만든 Next.js 프로젝트입니다.
사이트는 **소개·영업 + 고객 포털**만 맡습니다. CRM·ERP 같은 솔루션은 고객사 전용 서버에서 돌고,
이 프로젝트에는 포털의 바로가기·상태·사용량 조회만 있습니다.

## 층 구조 (위 → 아래로만 import)

```
app        라우팅만. URL, 레이아웃, metadata. 화면은 feature에서 가져와 조립만 합니다.
 ↓
features   서비스(도메인)별 화면과 로직. 서로 직접 import 하지 않습니다.
 ↓
server     서버 전용 (세션, 코어 서버 API, 토스 결제, DB). "server-only"로 보호.
shared     어디서나 쓰는 UI·레이아웃·설정·유틸. 위 층을 모릅니다.
content    가격·포트폴리오·FAQ 같은 사업 데이터. 화면을 모릅니다.
```

이 규칙은 `eslint.config.mjs`에서 `eslint-plugin-boundaries`(층 방향, feature끼리 금지)와 `no-restricted-imports`(app은 feature index만)로 강제합니다. `npm run lint`와 커밋 전 검사에서 걸립니다.

| 규칙                                | 이유                                               |
| ----------------------------------- | -------------------------------------------------- |
| app → `@/features/<이름>` (index만) | feature 내부 파일 구조를 바꿔도 라우트가 안 깨지게 |
| app ↛ server                        | 데이터 조회는 feature가 책임                       |
| feature ↛ 다른 feature              | 서비스끼리 엉키지 않게. 같이 쓰면 shared로 올림    |
| shared·content ↛ 위 층              | 가장 아래 층은 아무 데도 의존하지 않음             |

## 폴더

```
src/
├─ app/
│  ├─ layout.tsx                 루트 (html, 폰트, 기본 metadata)
│  ├─ (marketing)/               공개 사이트 — 헤더 + 푸터
│  │  ├─ page.tsx                /            메인
│  │  ├─ hospital/               /hospital    병원 솔루션
│  │  │  └─ website/             /hospital/website
│  │  ├─ geo/                    /geo         AI 검색 최적화
│  │  │  └─ ad-check/            /geo/ad-check 의료광고 검사기
│  │  ├─ crm/                    /crm
│  │  ├─ solutions/              /solutions   비즈니스 솔루션
│  │  ├─ connect/ erp/ ai-chatbot/
│  │  ├─ development/ process/ estimate/
│  │  ├─ portfolio/ (+ [slug])
│  │  ├─ pricing/ contact/ faq/
│  │  └─ (legal)/ terms privacy refund security
│  ├─ (auth)/ login signup        최소 레이아웃
│  ├─ (portal)/dashboard/         고객 포털 — 사이드바
│  │  ├─ projects/ (+ [projectId]) reports/ requests/
│  │  └─ solutions/ geo/ billing/ account/
│  ├─ robots.ts sitemap.ts not-found.tsx
├─ features/
│  ├─ home/ hospital/ geo/ crm/ solutions/
│  ├─ development/ inquiry/ portfolio/ pricing/ support/ legal/
│  ├─ auth/ portal/ billing/
│  └─ <각 feature>/
│     ├─ components/   화면·UI (이 feature 전용)
│     ├─ model/        타입, 화면 문구·설정
│     ├─ api/          데이터 조회·server action (server, content 호출)
│     └─ index.ts      공개 API — 밖에서는 이것만 import
├─ server/  auth/ core/ payments/ db/
├─ shared/  config/ ui/ layout/ sections/ lib/
├─ content/ pricing.ts portfolio.ts faq.ts
└─ proxy.ts                        /dashboard 1차 로그인 확인 (Next 16의 middleware)
```

## 기획서 → 코드 위치

| 기획서 항목                                                          | 위치                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------- |
| 상단 메뉴 5개, 하단 링크, 포털 메뉴                                  | `shared/config/navigation.ts`                                 |
| 모든 경로                                                            | `shared/config/routes.ts` (화면에 경로 문자열 직접 쓰지 않기) |
| 사업자정보, 법인명 "주식회사 사피어테크놀로지"                       | `shared/config/site.ts`                                       |
| 솔루션 페이지 공통 순서 (문제→기능→데모→사례→요금→절차→FAQ→신청)     | `shared/sections/solution-template.tsx`                       |
| 요금 체계 전체 (GEO, 솔루션, 서버 구간, 메시지 단가, 계약금, 패키지) | `content/pricing.ts`                                          |
| 포트폴리오 20건 · 5묶음 · 관련 솔루션 링크                           | `content/portfolio.ts`                                        |
| 회원 유형 (일반 / 구독 / 클라이언트)                                 | `server/auth/session.ts`                                      |
| 코어 서버 (인스턴스 상태·사용량 → 서버 운영비 근거)                  | `server/core/client.ts`                                       |
| 토스 결제 3유형 (단건 / 구독 / 변동 청구)                            | `server/payments/toss.ts`, `features/billing`                 |
| saffirgeo 301 리다이렉트                                             | `src/proxy.ts` (호스트 기준)                                  |

## 새 페이지 추가 순서

1. `features/<서비스>/components/`에 화면 작성 → `index.ts`에서 export
2. `app/(marketing|auth|portal)/<경로>/page.tsx` 작성 (metadata + 화면 import)
3. `npm run typecheck` (또는 `npm run dev`)로 라우트 타입을 다시 만든 뒤 `shared/config/routes.ts`에 경로 추가
   - typedRoutes는 실제 page.tsx가 있는 경로만 `Route`로 인정하므로, 페이지보다 경로를 먼저 추가하면 타입 오류가 난다
4. 공개 페이지면 `app/sitemap.ts`에 추가
5. `npm run check`

## 참고

- Node.js 24 LTS, TypeScript 6.0, React Compiler 1.0 켜짐 (`useMemo`·`useCallback` 직접 쓰지 않음).
- typedRoutes 켜짐: 경로 타입은 `Route`. 없는 경로로 가는 `Link`는 타입 오류.
- saffirgeo 리다이렉트를 `next.config.ts` redirects에 두지 않는 이유: `"/:path*"` 규칙이 typedRoutes에서 모든 경로를 유효로 만들어 오타를 못 잡는다.
- Next.js 16 (App Router, Cache Components 켜짐). 쿠키·세션처럼 요청마다 달라지는 값은
  `<Suspense>` 안에서 읽어야 합니다. 예: `app/(portal)/dashboard/projects/[projectId]/page.tsx`
- Next 16 문서는 `node_modules/next/dist/docs/`에 있습니다 (AGENTS.md 참고).
