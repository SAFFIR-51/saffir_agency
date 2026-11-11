import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/features/auth";

export const metadata: Metadata = { title: "비밀번호 찾기", robots: { index: false } };

export default function Page() {
  return <ForgotPasswordPage />;
}
