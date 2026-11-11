import type { Metadata } from "next";
import { ResetPasswordPage } from "@/features/auth";

export const metadata: Metadata = { title: "새 비밀번호", robots: { index: false } };

export default function Page() {
  return <ResetPasswordPage />;
}
