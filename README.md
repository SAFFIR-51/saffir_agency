# saffir-web

saffir.co.kr — 사피어 회사 사이트 + 고객 포털 (Next.js 16 · TypeScript · Tailwind CSS 4)

## 시작

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

http://localhost:3000

- 포털 화면(/dashboard)을 로그인 없이 보려면 `.env.local`에 `PORTAL_AUTH_BYPASS=1`

## 명령어

| 명령                              | 하는 일                                                           |
| --------------------------------- | ----------------------------------------------------------------- |
| `npm run check`                   | 타입 검사 + lint + 포맷 검사를 한 번에                            |
| `npm run lint` / `lint:fix`       | ESLint. 폴더 간 import 규칙(eslint-plugin-boundaries)도 같이 검사 |
| `npm run format` / `format:check` | Prettier 정렬 (Tailwind 클래스 순서 포함)                         |
| `npm run typecheck`               | 라우트 타입 생성 후 TypeScript 검사                               |
| `npm run knip`                    | 안 쓰는 파일·export·패키지 찾기 (오류가 아니라 정리할 목록)       |

## 커밋 규칙

`git init` 후 `npm install`을 하면 husky가 커밋 훅을 설치합니다.

- 커밋 전: 바뀐 파일만 ESLint 수정 + Prettier 정렬 (lint-staged)
- 커밋 메시지: `<type>: <설명>` 형식 (commitlint). 예) `feat: GEO 진단 결과 화면 추가`
  - type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

VS Code를 쓰면 추천 확장(ESLint, Prettier, Tailwind CSS IntelliSense 등)이 자동으로 안내되고, 저장할 때 정렬됩니다.

구조와 규칙은 [ARCHITECTURE.md](./ARCHITECTURE.md)를 보세요.
