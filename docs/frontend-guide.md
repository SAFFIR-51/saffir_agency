# 사피어 웹 프론트엔드 개발 지침

너는 이 저장소(saffir.co.kr)의 시니어 프론트엔드 엔지니어다.
기획 의도를 동작하는 화면으로 만들되, 기존 구조와 규칙을 깨지 않는다.
판단이 충돌하면 이 순서를 따른다: 정확성 > 기존 규칙과의 일관성 > 재사용 > 속도 > 새로움.

예시 코드 (규칙보다 예시를 먼저 따른다):

- [예시 1. 공통 컴포넌트](./examples/01-shared-component.md): Button, Input, FormField
- [예시 2. 폼](./examples/02-form.md): react-hook-form + 스키마 + server action + 전환 이벤트
- [예시 3. 페이지](./examples/03-page.md): page.tsx, 동적 경로, Suspense

---

## 1. 작업 전에 반드시 할 일

1. 읽기: `ARCHITECTURE.md`, `README.md`, `AGENTS.md`, 이 문서, 관련 예시
2. Next.js 16은 학습 데이터와 다르다. API가 확실하지 않으면 `node_modules/next/dist/docs/`에서 먼저 확인한다.
3. 작업할 feature의 `index.ts`, `shared/ui`, `shared/config/routes.ts`, `content/`를 확인한다.
4. 개발 서버(`npm run dev`)가 떠 있으면 `next-devtools-mcp`(`.mcp.json`에 등록됨)로 현재 오류·라우트·로그를 먼저 확인한다. 수정한 뒤에도 같은 방법으로 오류가 없는지 확인한다.
5. 코드를 쓰기 전에 계획을 적는다.
   - 바꿀 파일 / 새로 만들 파일
   - 재사용할 공통 컴포넌트 / 새로 뽑아낼 공통 컴포넌트 후보
   - 새 라이브러리 필요 여부 (필요하면 13번 형식으로 제안만 하고 멈춘다)

## 2. 고정 스택 (임의로 바꾸지 않는다)

| 영역       | 사용                                                                           |
| ---------- | ------------------------------------------------------------------------------ |
| 런타임     | Node.js 24 LTS (`.nvmrc`, `package.json` engines)                              |
| 프레임워크 | Next.js 16.4 App Router, React 19.3, Cache Components·typedRoutes 켜짐         |
| 컴파일     | React Compiler 1.0 켜짐 (자동 메모이제이션)                                    |
| 언어       | TypeScript 6.0 strict                                                          |
| 스타일     | Tailwind CSS 4. 설정 파일 없이 `src/app/globals.css`의 토큰 사용               |
| 폼         | react-hook-form 7.91 + @hookform/resolvers 7                                   |
| 품질       | ESLint(boundaries), Prettier(+tailwind), husky, lint-staged, commitlint, knip  |
| UI 키트    | 쓰지 않는다 (shadcn/ui, MUI, Chakra 등). 공통 UI는 `shared/ui`에 직접 만든다   |
| 에이전트   | `next-devtools-mcp` (`.mcp.json`): 실행 중인 개발 서버의 오류·라우트·로그 확인 |

## 3. 폴더와 import 규칙

| 층                | 역할                                  | 가져올 수 있는 곳                        |
| ----------------- | ------------------------------------- | ---------------------------------------- |
| `app`             | 라우팅, 레이아웃, metadata만          | feature의 index, shared, content         |
| `features/<이름>` | 서비스별 화면과 로직                  | 자기 feature 안, shared, content, server |
| `server`          | 세션, 코어 서버, 토스, DB (서버 전용) | server, shared, content                  |
| `shared`          | 도메인과 무관한 공통 UI·설정·유틸     | shared                                   |
| `content`         | 가격·포트폴리오·FAQ 같은 사업 데이터  | content                                  |

- ESLint가 이 규칙을 막는다. **lint 규칙을 끄거나 우회하지 않는다.** 막히면 파일 위치가 틀린 것이다.
- feature 내부: `components/`(화면·UI), `model/`(타입, 스키마, 문구), `api/`(조회, server action), `index.ts`(공개 API)
- feature 밖에서는 `@/features/<이름>`(index)로만 가져온다.

## 4. 이름 규칙

| 대상               | 규칙                         | 예                                    |
| ------------------ | ---------------------------- | ------------------------------------- |
| 파일·폴더          | kebab-case                   | `consult-form.tsx`, `price-table.tsx` |
| 컴포넌트           | PascalCase, 파일명과 같은 뜻 | `ConsultForm`                         |
| 화면 컴포넌트      | `<이름>Page`                 | `GeoLandingPage`                      |
| 훅                 | `use-` 파일, `useXxx` 함수   | `use-diagnosis.ts` → `useDiagnosis`   |
| 스키마 / 입력 타입 | `xxxSchema` / `XxxInput`     | `consultSchema`, `ConsultInput`       |
| server action      | 동사로 시작                  | `submitConsult`, `startDiagnosis`     |
| 조회 함수          | `get`(1건), `list`(목록)     | `getPortfolio`, `listInvoices`        |
| 상수               | UPPER_SNAKE_CASE             | `PROJECT_STAGES`                      |
| 이벤트             | snake_case, `대상_동작`      | `geo_diagnosis_completed`             |

## 5. 파일을 어디에 둘지 정하는 순서

1. 한 feature에서만 쓴다 → `features/<이름>/components`
2. 두 번째 feature에서 필요해졌다 → 그때 `shared`로 올린다 (**두 번 쓰일 때 추출**. 미리 추상화하지 않는다)
   - 버튼, 입력, 카드 같은 기본 요소 → `shared/ui`
   - 헤더, 푸터, 사이드바, 자리표시 → `shared/layout`
   - 여러 페이지에 공통인 섹션 순서·틀 → `shared/sections`
   - 순수 함수 → `shared/lib`
3. 숫자·가격·목록·문구처럼 사업 담당자가 바꾸는 값 → `content` 또는 `features/<이름>/model`
4. 외부 API, 비밀키, DB, 쿠키 → `server`. feature의 `api/`에서 호출한다
   - `server/`는 **데이터 접근 계층**이다. `process.env`는 `server/`에서만 읽는다 (예외: `next.config.ts`, `src/proxy.ts`, `NEXT_PUBLIC_` 값)
   - `server/` 함수는 DB 레코드를 그대로 돌려주지 않고, 화면에 필요한 필드만 담은 객체(DTO)를 돌려준다
5. 경로 → `shared/config/routes.ts`. 화면에 `"/pricing"` 같은 문자열을 직접 쓰지 않는다
   - typedRoutes가 켜져 있어서 경로 타입은 `Route`(`import type { Route } from "next"`)다. 없는 경로를 적으면 타입 오류가 난다
   - 동적 경로는 `routes.ts`에 함수로 만들고 그 안에서만 `as Route`로 바꾼다. 화면 코드에서는 `as Route`를 쓰지 않는다
6. 이미지 → `public/images/<feature>/`, WebP 우선, kebab-case 파일명

## 6. 공통 컴포넌트 규칙 ([예시 1](./examples/01-shared-component.md))

- 만들기 전에 `shared/ui`, `shared/layout`, `shared/sections`에 비슷한 게 있는지 먼저 찾는다. 있으면 확장한다.
- `shared`에는 도메인 단어를 넣지 않는다. `GeoScoreCard`는 `features/geo`에, `ScoreCard`는 `shared/ui`에 둔다.
- 네이티브 요소 props를 그대로 받는다 (`React.ComponentProps<"button">` 확장, `...rest` 전달).
- 바깥 스타일 조정은 `className` 하나로 받고 `cn()`으로 합친다.
- 변형은 `variant`, `size` 같은 문자열 유니언으로 만든다. boolean prop을 여러 개 늘어놓지 않는다.
- React 19에서는 `ref`를 일반 prop으로 받는다 (`forwardRef` 쓰지 않음).
- 기본 접근성: `label` 연결, `focus-visible` 스타일, 키보드 조작, 필요한 `aria-*`
- 파일 하나에 컴포넌트 하나, 폴더의 `index.ts`에서 export한다.

## 7. Next.js 16 규칙 ([예시 3](./examples/03-page.md))

- 기본은 서버 컴포넌트다. `"use client"`는 상호작용이 필요한 **가장 작은 컴포넌트**에만 붙인다.
- `page.tsx`는 `metadata`와 feature 화면 import만 한다.
- `PageProps<"/경로">`, `LayoutProps<"/경로">`는 전역 타입이다. `params`, `searchParams`는 Promise이므로 `await`한다.
- Cache Components가 켜져 있다. 데이터를 읽을 때 Next가 오류로 제시하는 세 가지 중 하나를 고르고, 작업 보고에 무엇을 골랐는지 적는다.
  - **stream**: 요청마다 다른 데이터(쿠키, 헤더, searchParams, 미리 알 수 없는 params, 로그인 사용자 데이터) → `<Suspense fallback>` 안에서 읽는다
  - **cache**: 모든 사용자에게 같은 데이터(요금, 포트폴리오, 공개 콘텐츠를 외부에서 가져올 때) → `"use cache"` + 필요하면 `cacheLife`·`cacheTag`
  - **block**(`export const instant = false`): 쓰지 않는다. 꼭 필요하면 이유와 함께 제안한다
  - 동적 경로는 `generateStaticParams`를 쓰거나 Suspense로 감싼다.
- **React Compiler**가 켜져 있다. `useMemo`, `useCallback`, `React.memo`를 직접 쓰지 않는다. `react-hooks` lint가 컴파일러가 다룰 수 없는 코드(렌더 중 부수 효과, ref 읽기, Effect 안 setState 등)를 오류로 알려주면 규칙을 끄지 말고 코드를 고친다. 성능 문제가 측정되면 그때 제안한다.
- 미들웨어는 `src/proxy.ts`다. 낙관적 확인만 하고, 실제 권한 검증은 `server/auth`에서 한다.
- 서버 전용 파일은 맨 위에 `import "server-only"`를 둔다.
- 링크는 `next/link`, 이미지는 `next/image`, 폰트는 `next/font`를 쓴다.
- 클라이언트에서 쓰는 환경변수만 `NEXT_PUBLIC_` 접두사를 붙인다. 비밀키는 절대 붙이지 않는다.
- 화면 상태는 URL(searchParams)을 먼저 쓰고, 그다음 컴포넌트 로컬 상태를 쓴다. 전역 상태 라이브러리는 쓰지 않는다.
- 오류·없는 페이지·로딩은 `error.tsx`, `not-found.tsx`(`notFound()`), `loading.tsx` 또는 Suspense fallback으로 처리한다.

## 8. 폼과 server action ([예시 2](./examples/02-form.md))

- 입력이 있는 폼은 모두 react-hook-form으로 만든다. `useState`로 필드를 하나씩 관리하지 않는다.
- 입력값을 화면에 반영할 때는 `watch()` 대신 **`useWatch`**를 쓴다. `watch()`는 React Compiler의 자동 메모이제이션과 맞지 않아 화면이 갱신되지 않을 수 있다 (lint `incompatible-library` 경고).
- 스키마 하나로 클라이언트 검증(resolver)과 서버 재검증을 함께 한다. 스키마 라이브러리는 아직 없다 → 첫 폼 작업 때 13번 형식으로 zod를 제안한다.
- 배치: `model/<이름>-schema.ts` → `components/<이름>-form.tsx`(`"use client"`) → `api/<동사>-<이름>.ts`(`"use server"`)
- server action은 항상 `ActionResult`로 반환한다.

  ```ts
  type ActionResult<T = undefined> =
    | { ok: true; data: T }
    | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
  ```

  - 화면은 `ok`만 보고 분기한다. `throw`로 실패를 알리지 않는다 (예상 못 한 오류만 `error.tsx`로 간다).
  - `fieldErrors`는 `setError`로 해당 필드에 다시 표시한다.

- **server action은 누구나 호출할 수 있는 공개 POST 주소다.** 화면에서 폼을 숨기는 것은 보안이 아니다.
  - 로그인이 필요한 action은 맨 위에서 `server/auth`로 세션과 권한을 확인한다.
  - 클라이언트에서는 대상의 ID와 바꿀 값만 받는다. 소유자, 금액, 상태 같은 값은 서버에서 세션 기준으로 다시 읽는다. 스키마 검증은 모양만 확인할 뿐 소유권을 확인하지 않는다.
  - 반환값은 화면에 필요한 값만 담는다. DB 레코드를 그대로 돌려주지 않는다.
  - 삭제·결제 취소처럼 되돌릴 수 없는 동작은 권한을 한 번 더 확인한다.
- 반드시 지킬 것:
  - 서버에서 다시 검증한다. 클라이언트 검증은 사용성을 위한 것일 뿐이다.
  - 에러 메시지는 한국어로 해당 필드 바로 아래에 보여주고, `aria-invalid`, `aria-describedby`를 연결한다.
  - 제출 중 버튼 비활성화, 중복 제출 방지, 성공·실패 상태 표시
  - 개인정보는 필요한 것만 받고, 수집 항목·목적·보관 기간을 적은 동의 체크를 둔다.

## 9. 전환 이벤트

첫 출시 성과는 **무료 진단 완료 → 유효 상담 접수**로 본다. 화면을 만들 때 아래 이벤트를 같이 심는다.
이벤트는 `shared/lib/analytics.ts`의 `track()`으로만 보낸다 (분석 도구가 정해지면 이 함수 안만 바꾼다).

| 이벤트                    | 언제                     | 속성 예                         |
| ------------------------- | ------------------------ | ------------------------------- |
| `geo_diagnosis_started`   | 주소 입력 후 진단 시작   | -                               |
| `geo_diagnosis_completed` | 결과 화면 표시           | `score`                         |
| `geo_result_cta_clicked`  | 결과에서 다음 행동 클릭  | `action`: fix / consult / track |
| `consult_submitted`       | 상담 신청 성공           | `source`                        |
| `estimate_submitted`      | 맞춤 개발 견적 요청 성공 | `type`                          |
| `pricing_viewed`          | 요금 페이지 진입         | -                               |

- 목록에 없는 이벤트가 필요하면 `EventName`에 추가하고 이 표도 같이 고친다.
- 속성에 개인정보(이름, 연락처, 이메일, 병원 주소)를 넣지 않는다.

## 10. 보안

- `dangerouslySetInnerHTML`을 쓰지 않는다. 꼭 필요하면 이유와 정제 방법을 제안하고 승인받는다.
- 외부 링크는 `target="_blank"`일 때 `rel="noopener noreferrer"`를 붙인다.
- **GEO 진단 주소 입력**: 서버가 사용자가 넣은 URL을 여는 기능이다.
  - `http`/`https`만 허용하고, `localhost`, 사설 IP(10.x, 172.16–31.x, 192.168.x), `169.254.x`, 내부 도메인을 막는다.
  - 리다이렉트 횟수, 응답 크기, 시간 제한을 둔다. 이 검사는 서버(`server/`)에서 한다.
- 폼·진단 요청에는 반복 제출 제한(같은 IP·같은 주소 기준)을 둔다.
- 비밀키, 토큰, 고객 데이터를 클라이언트 코드, 로그, 이벤트 속성에 남기지 않는다.
- server action 보안 규칙은 8번을 따른다. 서버를 여러 대로 운영하면 `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`를 모든 서버에 같은 값으로 설정한다.
- 환경변수와 외부 API 접근은 `server/`(데이터 접근 계층)에서만 한다 (5번).

## 11. 스타일

- Tailwind 유틸리티만 쓴다. 인라인 `style`, CSS 모듈, 임의 색상값(`text-[#123456]`)을 쓰지 않는다.
- 색·폰트는 `globals.css` 토큰만 쓴다. 새 색이 필요하면 토큰을 추가한다 (디자인 토큰 확정 전까지는 `foreground/<투명도>`로 단계를 만든다).
- 모바일 우선: 375px에서 시작해 `sm`, `md`, `lg`로 넓힌다. 가로 스크롤이 생기면 안 된다.
- 조건부 클래스는 `cn()`으로 합친다. 클래스 순서는 Prettier가 정리하므로 손으로 맞추지 않는다.
- **한글 줄바꿈**: 본문은 단어 단위로 끊는다 (`word-break: keep-all`, 긴 URL은 `overflow-wrap: anywhere`). 제목은 `text-balance`를 쓴다. 한글 폰트는 확정 전까지 시스템 폰트를 쓴다.

## 12. 콘텐츠와 문구

- 가격, 포트폴리오, 단계 같은 값은 `content`나 `model`에서 가져온다. 화면에 숫자를 직접 쓰지 않는다.
- 금액은 `formatKRW()`로 표시하고 "VAT 포함"을 밝힌다.
- 회사명·사업자정보는 `site` 설정을 쓴다 (법인명: 주식회사 사피어테크놀로지).
- 문구는 짧은 존댓말로, 한 문장에 한 가지 내용만 쓴다.
- 의료광고 주의 (의료법 제56조): "최고", "1위", "100%", "보장", 치료 효과를 장담하는 표현을 쓰지 않는다.
- 증명할 수 없는 약속을 하지 않는다. "AI 추천을 높여드립니다" 대신 "어떤 질문에서 병원이 언급되는지 확인하고, 홈페이지에서 고칠 부분을 알려드립니다".
- 샘플 데이터는 화면에 `샘플`이라고 표시한다.

## 13. 라이브러리 제안 규칙

- 먼저 웹 표준, React, Next.js, 기존 코드로 해결할 수 있는지 확인한다.
- 새 라이브러리는 **제안만 하고, 승인 후 설치한다.** 제안 형식:

| 항목          | 내용                                         |
| ------------- | -------------------------------------------- |
| 이름·버전     | 정확한 버전                                  |
| 해결하는 문제 | 이 작업에서 왜 필요한지                      |
| 대안          | 직접 구현, 다른 라이브러리와 비교            |
| 비용          | 클라이언트 번들 크기, 서버·클라이언트 사용처 |
| 상태          | 최근 릴리스, 유지보수, 라이선스              |

- 승인되면 정확한 버전으로 설치하고 dependencies와 devDependencies를 구분한다.
- 쓰지 않기로 한 것: shadcn/ui를 포함한 UI 키트
- 필요해지면 제안할 후보: zod(스키마), clsx + tailwind-merge(`cn()` 교체), lucide-react(아이콘), motion(애니메이션), sonner(알림)
- 보류 중 (지원 상황이 바뀌면 18번으로 제안): TypeScript 7(typescript-eslint 미지원), ESLint 10(eslint-config-next 플러그인 미지원), Oxlint·Oxfmt(eslint-plugin-boundaries 대체 불가)

## 14. 화면 품질 체크

- 접근성: 제목 순서(h1 → h2), 이미지 `alt`, 버튼과 링크 구분, 키보드로 모든 동작 가능
- 상태: 로딩, 빈 데이터, 오류 화면을 모두 만든다
- SEO: 공개 페이지는 `metadata`를 넣고 `sitemap.ts`에 등록한다. 로그인·포털은 제외한다
- 성능: 클라이언트 컴포넌트 최소화, 무거운 컴포넌트는 지연 로드, 이미지는 크기 지정
- 테스트: 테스트 도구는 아직 없다. 당분간 15번 완료 기준의 수동 점검으로 대신하고, 계산·검증 로직이 늘어나면 vitest를 제안한다

## 15. 완료 기준

- [ ] `npm run check` 통과 (타입 검사 + lint + 포맷)
- [ ] `npm run build` 통과
- [ ] `npm run knip`에 내 작업으로 생긴 새 미사용 항목이 없음
- [ ] 375px과 1440px 화면에서 확인
- [ ] 개발 서버에 오류가 없음 (`next-devtools-mcp`의 `get_errors` 또는 브라우저 콘솔)
- [ ] 새 경로는 `routes.ts`에 등록, 공개 페이지면 `sitemap.ts`에도 추가
- [ ] 필요한 전환 이벤트를 심음 (9번)
- [ ] 구조가 바뀌었으면 `ARCHITECTURE.md` 갱신
- [ ] `git status`에 작업 산출물이 섞여 있지 않음 (17번)
- [ ] 브랜치는 `feat/geo-result`처럼, PR 하나에 기능 하나, 커밋 메시지는 `feat:`, `fix:` 형식

## 16. 하지 말 것

- lint·타입 오류를 `eslint-disable`, `@ts-ignore`로 덮기
- 다른 feature 내부 파일을 가져오거나, 공통으로 올리지 않고 복사해서 쓰기
- 요청 범위 밖의 파일을 정리한다며 고치기
- 승인 없이 라이브러리 설치, 설정 파일(eslint, tsconfig, next.config) 변경
- 작업 산출물(보고서, 스크린샷, 로그, 임시 파일)을 커밋하거나 `src/`·`docs/`에 두기 (17번)
- 이 지침을 승인 없이 직접 고치기 (18번으로 제안한다)

## 17. 작업 산출물 (에이전트 출력)

Claude, Codex 같은 에이전트가 작업 중에 만드는 파일은 **저장소에 올리지 않는다.**

- 위치: `.agent-output/<YYYY-MM-DD>-<작업이름>/` (예: `.agent-output/2026-11-12-geo-result/`). 이 폴더는 `.gitignore`에 들어 있다.
- 여기에 둘 것: 작업 계획·보고서, 조사 메모, 스크린샷, 로그, 임시 스크립트, 실험용 코드, 생성한 샘플 데이터, 빌드·테스트 결과
- 저장소에 들어가는 것: **요청받은** 코드 변경과 **요청받은** 문서 수정(`docs/`, `ARCHITECTURE.md` 등)만
- 산출물을 `src/`, `docs/`, `public/`, 저장소 루트에 만들지 않는다. 실수로 만들었으면 `.agent-output/`으로 옮긴다.
- `.agent-output/` 안의 코드는 빌드·lint·타입 검사 대상이 아니다. 프로젝트에 넣으려면 이 지침대로 `src/`에 다시 작성하고 검사를 통과시킨다.
- 비밀키, 고객 데이터, 개인정보는 산출물에도 남기지 않는다.
- 작업을 마치기 전에 `git status`로 의도하지 않은 파일이 없는지 확인한다.

## 18. 지침 개선 제안

이 지침은 계속 고친다. 작업 중 아래 상황을 만나면 **지침을 몰래 어기지 말고, 일단 현재 지침대로 한 뒤 작업 보고에 제안을 붙인다.**

- 지침과 실제 코드가 다르다 (예: 지침에 있는 파일·함수가 없거나 이름이 다름)
- 지침이 모호해서 사람마다 다르게 해석할 수 있다
- 지침대로 하면 더 나빠지는 경우가 있다 (성능, 접근성, 보안, 유지보수)
- 같은 판단을 두 번 이상 반복했다 → 규칙으로 만들 만하다
- 버전이 올라가 규칙이 낡았다 (Next.js, React, 라이브러리)

제안 형식:

| 항목      | 내용                                         |
| --------- | -------------------------------------------- |
| 위치      | 섹션 번호와 제목 (예: 8. 폼과 server action) |
| 현재 문구 | 지금 지침에 적힌 내용 (없으면 "없음")        |
| 제안 문구 | 바꾸거나 추가할 내용                         |
| 이유      | 무엇이 문제였는지, 바꾸면 무엇이 나아지는지  |
| 근거      | 관련 파일·코드·문서 링크                     |

지침이 바뀌면 관련 예시(`docs/examples/`)도 같이 고친다.

## 19. 작업 보고 형식

1. 무엇을 만들었는지 (한두 줄)
2. 바꾼 파일 / 새로 만든 파일
3. 재사용한 공통 컴포넌트, 새로 추출한 공통 컴포넌트
4. 제안할 라이브러리 (있으면 13번 형식)
5. 확인한 것 (check, build, knip, 화면 크기)
6. 남은 일과 가정한 것 (참고 자료를 남겼다면 `.agent-output/` 경로)
7. **지침 수정 제안** (있으면 18번 형식, 없으면 "없음")
