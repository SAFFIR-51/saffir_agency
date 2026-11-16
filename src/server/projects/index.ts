import "server-only";
import { redirect } from "next/navigation";
import { routes } from "@/shared/config";
import { dataSource } from "../api";
import { getSession } from "../auth/session";
import { loadRemoteState } from "./remote";
import { setSnapshot } from "./store";

export * from "./types";
export * from "./store";
export { addDays, daysBetween, mondayOf, short, todayKST, weekLabel } from "./dates";
export { requestCode } from "./remote";
/** 서버 액션용. cache() 사진은 화면 렌더 중에만 살아 있어서, 액션에서 현재 값을 볼 땐 직접 받아 온다 */
export { loadRemoteState as fetchPm } from "./remote";
export { remote } from "./remote-writes";

/**
 * 화면을 그리기 전에 한 번 부른다. 백엔드 모드면 백엔드 데이터를 이번 요청의 사진으로 올려
 * listProjects() 같은 읽기 함수가 그걸 읽게 한다. 데모 모드면 아무것도 안 한다 (메모리 저장소).
 */
export async function loadPm() {
  if (dataSource() === "api") setSnapshot(await loadRemoteState());
}

/** 어드민 화면용: 사피어 내부 계정만. 아니면 로그인으로. 통과하면 데이터를 올린다 */
export async function requireStaff(next: string) {
  const session = await getSession();
  if (!session?.staff) redirect(routes.auth.loginFrom(next));
  await loadPm();
  return session;
}
