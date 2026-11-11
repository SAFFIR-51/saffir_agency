import "server-only";
import { redirect } from "next/navigation";
import { routes } from "@/shared/config";
import { getSession } from "../auth/session";
import { getDemoPortalData } from "./demo-data";

export type * from "./types";
export { PROJECT_STAGES } from "./types";

/**
 * 포털 화면용: 로그인 확인(2차) + 그 회원의 데이터.
 * 로그인이 안 되어 있으면 로그인 화면으로 보낸다. 지금은 데모 데이터, 이후 DB·코어 서버로 바꾼다.
 */
export async function requirePortal(next: string) {
  const session = await getSession();
  if (!session) redirect(routes.auth.loginFrom(next));
  const data = getDemoPortalData(session.id);
  if (!data) redirect(routes.auth.loginFrom(next));
  return { session, data };
}
