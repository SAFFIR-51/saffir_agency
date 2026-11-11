import { defineConfig, globalIgnores } from "eslint/config";
import boundaries from "eslint-plugin-boundaries";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * 관심사 분리 규칙 (ARCHITECTURE.md)
 *
 *   app → features → server
 *                  ↘ shared, content
 *
 * - app: feature의 index(공개 API), shared, content만 가져옴. server 직접 호출 금지
 * - feature: 자기 feature 안 + shared, content, server. 다른 feature 금지
 * - server: server, shared(config·lib), content
 * - shared / content: 자기 층 안에서만
 */
const layers = [
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      "boundaries/elements": [
        { type: "app", pattern: "src/app", partialMatch: false },
        { type: "feature", pattern: "src/features/*", capture: ["name"], partialMatch: false },
        { type: "server", pattern: "src/server", partialMatch: false },
        { type: "shared", pattern: "src/shared", partialMatch: false },
        { type: "content", pattern: "src/content", partialMatch: false },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { types: ["app", "feature", "shared", "content"] } } },
            },
            {
              from: { element: { type: "feature" } },
              allow: [
                {
                  to: {
                    element: {
                      type: "feature",
                      captured: { name: "{{ from.element.captured.name }}" },
                    },
                  },
                },
                { to: { element: { types: ["shared", "content", "server"] } } },
              ],
            },
            {
              from: { element: { type: "server" } },
              allow: { to: { element: { types: ["server", "shared", "content"] } } },
            },
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "content" } },
              allow: { to: { element: { type: "content" } } },
            },
          ],
        },
      ],
    },
  },
  // app은 feature 내부 파일이 아니라 index(공개 API)만 가져옴
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message: "app은 feature의 index(공개 API)만 가져옵니다: @/features/<이름>",
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  ...layers,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".agent-output/**"]),
]);

export default eslintConfig;
