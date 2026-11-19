import type { MetadataRoute } from "next";
import { site } from "@/shared/config";

/** 검색에 나오면 안 되는 곳 (로그인·포털·어드민·주문·내부 검토·API) */
const privatePaths = [
  "/admin",
  "/dashboard",
  "/internal",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/invite",
  "/order",
  "/auth",
  "/api",
];

/**
 * AI 검색·답변 서비스 크롤러는 공개 페이지를 읽을 수 있게 명시적으로 허용한다 (GEO).
 * 검색·답변용: OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User
 * 학습용: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot (회사 방침으로 허용)
 * 막고 싶으면 해당 봇을 disallow: "/"로 바꾼다.
 */
const aiCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
