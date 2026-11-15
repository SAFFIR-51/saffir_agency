import "server-only";
import { redirect } from "next/navigation";
import { routes } from "@/shared/config";
import { getSession } from "../auth/session";

export * from "./types";
export * from "./store";
export { addDays, daysBetween, mondayOf, short, todayKST, weekLabel } from "./dates";

/** 어드민 화면용: 사피어 내부 계정만. 아니면 로그인으로 */
export async function requireStaff(next: string) {
  const session = await getSession();
  if (!session?.staff) redirect(routes.auth.loginFrom(next));
  return session;
}
