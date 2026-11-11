/**
 * 구조화데이터(JSON-LD) 출력. Next.js 공식 가이드 방식.
 * dangerouslySetInnerHTML을 쓰는 유일한 곳이다 (frontend-guide 10번 예외):
 * 값은 코드의 고정 데이터만 넣고, "<"를 \u003c로 바꿔 스크립트 태그 탈출을 막는다.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
