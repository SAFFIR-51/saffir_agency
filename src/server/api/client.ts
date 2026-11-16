import "server-only";
import { cookies } from "next/headers";

/**
 * 백엔드(api/, NestJS) 호출. Next 서버 코드(서버 컴포넌트·서버 액션·route handler)에서만 쓴다.
 * - 주소: API_URL (개발 http://localhost:4000, Docker 안 http://server:4000). 없으면 호출하지 않는다 (mode.ts)
 * - 로그인 쿠키를 그대로 넘겨서, 백엔드가 같은 사용자로 처리한다
 * 화면별 함수(프로젝트 목록 등)는 이 파일을 감싸서 server/<도메인>/에 만든다.
 */
function apiUrl() {
  const url = process.env.API_URL;
  if (!url) throw new ApiError(503, "API_URL이 없어 백엔드를 부를 수 없습니다 (데모 데이터 모드).");
  return url;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: `/${string}`, init: RequestInit = {}): Promise<T> {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(`${apiUrl()}/api${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

/** 백엔드가 떠 있는지 (GET /api/health) */
export async function apiHealthy() {
  if (!process.env.API_URL) return false;
  try {
    const res = await fetch(`${apiUrl()}/api/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
