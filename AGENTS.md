<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 사피어 프로젝트 규칙

프론트엔드 작업 전에 반드시 읽는다:

1. [docs/frontend-guide.md](./docs/frontend-guide.md) — 개발 지침 (구조, 공통 컴포넌트, 폼, 이벤트, 보안, 완료 기준)
2. [docs/examples/](./docs/examples/) — 기준 예시 코드
3. [ARCHITECTURE.md](./ARCHITECTURE.md) — 폴더 구조와 기획서 대응표

- 작업 중 만드는 보고서·스크린샷·로그·임시 파일은 `.agent-output/`에만 둔다. 커밋하지 않는다 (frontend-guide.md 17번).
- 작업 보고 마지막에는 지침 수정 제안을 붙인다 (frontend-guide.md 18번).
