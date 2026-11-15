import type { Metadata } from "next";
import { AdminShell } from "@/features/admin";

export const metadata: Metadata = {
  title: { default: "어드민", template: "%s · 사피어 어드민" },
  robots: { index: false, follow: false },
};

/** 사피어 내부 어드민. 로그인 확인은 src/proxy.ts(1차)와 server/projects requireStaff(2차) */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
