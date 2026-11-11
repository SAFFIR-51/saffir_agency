# 새 프로젝트에 사피어 웹 스택·지침 적용 프롬프트

아래 `---` 사이를 새 프로젝트 폴더에서 Claude Code나 Codex에 그대로 붙여 넣는다.
`{프로젝트 이름}`, `{한 줄 설명}`, `{도메인}`만 바꾼다.

---

너는 이 저장소에 프론트엔드 기본 스택과 개발 지침을 세팅하는 시니어 프론트엔드 엔지니어다.
프로젝트: {프로젝트 이름} — {한 줄 설명} (도메인: {도메인})

기준이 되는 저장소는 사피어 웹(`saffir-web`)이다. 같은 스택, 같은 규칙, 같은 지침 문서 구조를 쓰되
사피어 고유 내용(병원·GEO·요금·토스 심사·saffirgeo 등)은 가져오지 않는다.

## 0. 시작 전에

1. 지금 폴더 상태를 먼저 확인하고 보고한다: 기존 package.json, 프레임워크, Node 버전, git 여부.
2. 이미 프로젝트가 있으면 덮어쓰지 말고, 아래 항목 중 없는 것만 추가하는 계획을 먼저 보여 주고 승인받는다.
3. 버전은 아래 "고정 버전"을 쓴다. 더 새 버전이 있으면 설치하지 말고 "제안"으로만 알려 준다.
4. 설치 전에 `node_modules/next/dist/docs/`(설치 후)와 각 도구 공식 문서를 확인한다. 기억에 의존해 설정하지 않는다.

## 1. 고정 버전

| 구분           | 패키지                                           | 버전                                                          |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| 런타임         | Node.js                                          | 24 LTS (`.nvmrc`에 `24`, package.json `engines.node: ">=24"`) |
| 프레임워크     | next, eslint-config-next                         | 16.4.6                                                        |
|                | react, react-dom                                 | 19.3.0                                                        |
| 언어           | typescript                                       | ^6.0.3 (7은 typescript-eslint 지원 전까지 보류)               |
|                | @types/node                                      | ^24.19.2                                                      |
|                | @types/react, @types/react-dom                   | ^19                                                           |
| 스타일         | tailwindcss, @tailwindcss/turbopack              | 4.3.3                                                         |
| 컴파일         | babel-plugin-react-compiler                      | ^1.0.0                                                        |
| 폼             | react-hook-form                                  | ^7.91.0                                                       |
|                | @hookform/resolvers                              | ^7.0.5                                                        |
|                | zod                                              | ^4.6.7                                                        |
| 서버 전용 표시 | server-only                                      | ^0.0.1                                                        |
| 린트           | eslint                                           | ^9 (10은 플러그인 호환 전까지 보류)                           |
|                | eslint-plugin-boundaries                         | ^7.4.2                                                        |
| 포맷           | prettier                                         | ^3.9.10                                                       |
|                | prettier-plugin-tailwindcss                      | ^0.8.1                                                        |
| 커밋           | husky                                            | ^9.1.7                                                        |
|                | lint-staged                                      | ^17.6.0                                                       |
|                | @commitlint/cli, @commitlint/config-conventional | ^21.2.4                                                       |
| 미사용 코드    | knip                                             | ^6.45.0                                                       |
| 에이전트 도구  | next-devtools-mcp (`.mcp.json`)                  | 0.4.0                                                         |

쓰지 않는 것: UI 키트(shadcn/ui, MUI, Chakra 등). 공통 UI는 `src/shared/ui`에 직접 만든다.

## 2. 새 프로젝트일 때 생성

`create-next-app`으로 App Router + TypeScript + Tailwind + ESLint + `src/` + import alias `@/*` 로 만든 뒤 위 버전으로 맞춘다.

## 3. 설정 파일

**next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // 없는 경로로 가는 Link를 타입 오류로 잡는다 (routes.ts가 Route 타입을 반환)
  typedRoutes: true,
  // 자동 메모이제이션. useMemo·useCallback·memo를 직접 쓰지 않는다
  reactCompiler: true,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
  // 주의: redirects에 "/:path*" 규칙을 두면 typedRoutes가 모든 경로를 유효로 본다.
  // 그런 리다이렉트는 src/proxy.ts에서 처리한다.
};

export default nextConfig;
```

**tsconfig.json**: create-next-app 기본값 + `strict: true`, `paths: { "@/*": ["./src/*"] }`, `exclude`에 `.agent-output` 추가.

**eslint.config.mjs**: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` + 아래 층 규칙.

- `@typescript-eslint/no-unused-vars`: `argsIgnorePattern: "^_"`, `varsIgnorePattern: "^_"`
- eslint-plugin-boundaries `boundaries/dependencies`, `default: "disallow"`. 요소:
  - `app` = `src/app`
  - `feature` = `src/features/*` (capture `name`)
  - `server` = `src/server`
  - `shared` = `src/shared`
  - `content` = `src/content`
- 허용 방향:
  - app → app, feature, shared, content (server 직접 호출 금지)
  - feature → 같은 이름의 feature, shared, content, server (다른 feature 금지)
  - server → server, shared, content
  - shared → shared
  - content → content
- `src/app/**`에 `no-restricted-imports`: `@/features/*/*` 금지 (feature는 index만 가져온다)
- `globalIgnores`: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, `.agent-output/**`

**prettier.config.mjs**

```js
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["cn"],
};
export default config;
```

`.prettierignore`: `.next`, `node_modules`, `.agent-output`, lock 파일, `next-env.d.ts`.

**commitlint.config.mjs**: `extends: ["@commitlint/config-conventional"]`, `rules: { "subject-case": [0] }` (한글·약어로 시작하는 제목 허용). 형식 `<type>: <설명>`.

**husky**: `npx husky init` 후

- `.husky/pre-commit`: `npx lint-staged`
- `.husky/commit-msg`: `npx --no -- commitlint --edit "$1"`

**package.json**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "lint:fix": "eslint --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "typecheck": "next typegen && tsc --noEmit",
  "knip": "knip",
  "check": "npm run typecheck && npm run lint && npm run format:check",
  "prepare": "husky"
},
"lint-staged": {
  "*.{ts,tsx,js,mjs}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

**knip.json**: `{ "$schema": "https://unpkg.com/knip@6/schema.json" }`. 아직 안 쓰는 의존성이 있을 때만 `ignoreDependencies`에 넣고, 쓰기 시작하면 뺀다.

**기타**

- `.gitattributes`: `* text=auto eol=lf`, 바이너리(`*.ico`, `*.docx` 등) `binary`
- `.gitignore`에 추가: `/.agent-output/`, `.env*.local`, `!.env.example`, `.claude/settings.local.json`, `test-results`
- `.nvmrc`: `24`
- `.mcp.json`: `{ "mcpServers": { "next-devtools": { "command": "npx", "args": ["-y", "next-devtools-mcp@0.4.0"] } } }`
- `.vscode/settings.json`: 저장 시 Prettier 포맷, ESLint 자동 수정. `.vscode/extensions.json`: ESLint, Prettier, Tailwind CSS IntelliSense 추천
- `globals.css`: Tailwind 4 `@import "tailwindcss";` + `@theme` 토큰(색·폰트). 한글 `word-break: keep-all`, 제목 `text-wrap: balance`

## 4. 폴더 구조

```
src/
├─ app/            라우팅만 (page.tsx, layout.tsx, route group). 화면 코드는 feature에서 가져온다
├─ features/<이름>/
│  ├─ components/  이 기능 전용 화면
│  ├─ model/       타입, 화면 문구, zod 스키마(schema.ts)
│  ├─ api/         데이터 조회, server action ("use server")
│  └─ index.ts     공개 API (app은 이것만 import)
├─ server/         데이터 접근 계층. 파일마다 import "server-only"
├─ shared/
│  ├─ config/      site.ts, routes.ts(모든 경로, Route 타입), navigation.ts
│  ├─ ui/          공통 컴포넌트 (Button, ButtonLink, Input, FormField 등)
│  ├─ lib/         cn, ActionResult 타입, analytics track()
│  ├─ layout/      헤더, 푸터
│  └─ seo/         JsonLd, 구조화데이터 생성 함수
└─ content/        여러 feature가 같이 쓰는 데이터 (코드 의존 없음)
```

- 경로 문자열은 `shared/config/routes.ts`에서만 만든다. 동적 경로는 함수로 만들고 반환 타입을 `Route`로 둔다(`as Route`는 이 파일에서만).
- server action 반환 타입: `ActionResult<T> = { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> }`
- 폼: react-hook-form + zodResolver. 같은 zod 스키마로 server action에서 다시 검증한다.
- 전환 이벤트는 `shared/lib/analytics.ts`의 `track()`(window.dataLayer)으로만 보낸다. 이벤트 이름은 `EventName` union으로 관리하고, 속성에 개인정보를 넣지 않는다.

## 5. 개발 지침 문서 (`docs/frontend-guide.md`)

아래 19개 절로 쓴다. 대기업 개발자가 작업 전에 읽는 수준으로, 짧은 문장과 표로 쓴다.

1. 작업 전에 반드시 할 일 (이 문서, ARCHITECTURE.md, docs/TODO.md 읽기, 비슷한 기존 코드 찾기)
2. 고정 스택 (위 1번 표, 임의로 바꾸지 않는다)
3. 폴더와 import 규칙 (위 4번, 층 방향, feature index만 import)
4. 이름 규칙 (파일 kebab-case, 컴포넌트 PascalCase 등)
5. 파일을 어디에 둘지 정하는 순서 (한 feature 전용 → feature 안, 두 번째로 쓰일 때 shared로 추출)
6. 공통 컴포넌트 규칙 (먼저 shared/ui에 있는지 찾는다, 비슷한 걸 새로 만들지 않는다)
7. Next.js 16 규칙 (Cache Components: 요청 데이터는 Suspense 안, "use cache", proxy.ts, PageProps/LayoutProps 전역 타입, typedRoutes, React Compiler라 useMemo·useCallback·memo 금지)
8. 폼과 server action (react-hook-form + zod, 클라이언트·서버 같은 스키마, ActionResult, 필드 오류를 setError로 되돌리기)
9. 전환 이벤트 (track()만, 이벤트 표, 추가하면 표도 같이 고친다, 개인정보 금지)
10. 보안 (server action은 공개 주소라 입력 재검증·권한 확인·반복 제출 제한, 비밀값은 server에서만, `dangerouslySetInnerHTML` 금지 — 예외는 shared/seo의 JsonLd만)
11. 스타일 (Tailwind 토큰, cn(), 한글 줄바꿈)
12. 콘텐츠와 문구 (화면 문구는 model/content.ts 또는 content/에, 컴포넌트에 하드코딩하지 않는다)
13. 라이브러리 제안 규칙 (설치하지 말고 이름·버전·이유·대안·크기를 표로 제안, 승인 후 정확한 버전으로 설치)
14. 화면 품질 체크 (키보드, 모바일 너비, 접근성 속성)
15. 완료 기준 (`npm run check`와 `npm run build` 통과, knip에 새 경고 없음)
16. 하지 말 것 (승인 없이 라이브러리 설치, 설정 파일 변경, 다른 feature import, 지침 직접 수정)
17. 작업 산출물: 보고서·스크린샷·로그·임시 스크립트는 `.agent-output/<YYYY-MM-DD>-<작업이름>/`에만 둔다. git, tsconfig, eslint, prettier에서 모두 제외되어 있다
18. 지침 개선 제안: 에이전트는 이 문서를 직접 고치지 않는다. 작업 보고에 "위치 / 현재 문구 / 제안 문구 / 이유 / 근거" 표로 제안한다
19. 작업 보고 형식 (바꾼 파일, 확인한 것, 남은 것, 지침 개선 제안)

예시 문서 3개도 만든다. 코드는 실제로 tsc·eslint·prettier를 통과시킨 뒤 문서에 넣는다.

- `docs/examples/01-shared-component.md`: 공통 컴포넌트를 shared/ui로 빼는 예
- `docs/examples/02-form.md`: react-hook-form + zod + server action + 전환 이벤트
- `docs/examples/03-page.md`: feature 화면 → app/page.tsx → routes.ts → sitemap 순서로 페이지 추가

## 6. 에이전트 연결 문서

- `AGENTS.md`: Next.js가 만든 관리 블록은 그대로 두고, 그 아래에 프로젝트 규칙 목록(지침 문서 위치, 완료 기준, .agent-output, TODO 위치)을 둔다
- `CLAUDE.md`: `@AGENTS.md` 한 줄만
- `ARCHITECTURE.md`: 층 구조 그림과 폴더 트리
- `README.md`: 설치(`nvm use`, `npm install`), 스크립트, 문서 링크
- `docs/TODO.md`: 우선순위(P0/P1/P2) 체크리스트

## 7. 확인하고 보고

1. `npm install` → `npm run check` → `npm run knip` → `npm run build` → `npm run dev`로 첫 화면 확인
2. 일부러 규칙 위반을 하나 만들어 막히는지 확인한 뒤 되돌린다: app에서 `@/features/x/components/...` import, feature끼리 import, 잘못된 커밋 메시지
3. 보고: 설치한 패키지와 버전, 만든·바꾼 파일, 확인 결과, 보류한 것(더 새 버전 등), 지침 개선 제안

---
