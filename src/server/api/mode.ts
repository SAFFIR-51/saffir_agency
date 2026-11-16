import "server-only";

/**
 * 데이터 출처 스위치.
 * - API_URL이 있으면 "api": 백엔드(server/, NestJS)에서 실제 데이터를 가져온다 (로컬 개발, 운영 EC2)
 * - 없으면 "demo": 코드 안 예시 데이터와 서버 메모리로 동작한다 (백엔드 없이 화면만, Vercel 미리보기)
 *
 * 화면은 이 스위치를 몰라도 된다. src/server/<도메인>/ 의 함수가 안에서 골라 쓴다.
 */
export type DataSource = "api" | "demo";

export function dataSource(): DataSource {
  return process.env.API_URL ? "api" : "demo";
}
