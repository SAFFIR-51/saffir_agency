# saffir-web

saffir.co.kr — 사피어 회사 사이트 + 고객 포털 (Next.js 16 · TypeScript · Tailwind CSS 4)

## 시작

Node.js 24 LTS가 필요합니다 (`node -v`로 확인, nvm 사용 시 `nvm use`).

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

http://localhost:3000

- 포털(/dashboard)은 `/login`의 데모 계정으로 들어갑니다 (회원 종류별 5개, 로그인 화면에서 누르면 채워짐). 로그인 없이 보려면 `.env.local`에 `PORTAL_AUTH_BYPASS=1`
- Claude Code·Codex 등 에이전트는 `.mcp.json`의 `next-devtools-mcp`로 실행 중인 개발 서버의 오류·라우트를 확인합니다. 개발 지침은 [docs/frontend-guide.md](./docs/frontend-guide.md)

## 문서

| 문서                                                                   | 내용                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| [docs/frontend-guide.md](./docs/frontend-guide.md)                     | 개발 지침 (작업 전에 읽기)                         |
| [docs/TODO.md](./docs/TODO.md)                                         | 할 일 (P0/P1/P2)                                   |
| [docs/user-flows.md](./docs/user-flows.md)                             | 방문자별 이동 흐름 (화면 기획 1단계)               |
| [docs/page-roles.md](./docs/page-roles.md)                             | 페이지별 역할 (2단계)                              |
| [docs/screen-states.md](./docs/screen-states.md)                       | 상태 화면 (3단계)                                  |
| [docs/new-project-stack-prompt.md](./docs/new-project-stack-prompt.md) | 다른 프로젝트에 같은 스택·지침을 세팅하는 프롬프트 |

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
