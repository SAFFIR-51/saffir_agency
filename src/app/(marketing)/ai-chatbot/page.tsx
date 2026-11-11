import type { Metadata } from "next";
import { AiChatbotPage } from "@/features/solutions";

export const metadata: Metadata = { title: "사피어 AI 챗봇" };

export default function Page() {
  return <AiChatbotPage />;
}
