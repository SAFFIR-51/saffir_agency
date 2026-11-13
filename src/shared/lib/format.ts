const krw = new Intl.NumberFormat("ko-KR");

/** 1650000 -> "1,650,000원" */
export function formatKRW(amount: number) {
  return `${krw.format(amount)}원`;
}

/**
 * 입력 중인 전화번호에 하이픈을 붙인다 (숫자만 남기고 최대 11자리).
 * 서울(02)은 02-123-4567 / 02-1234-5678, 그 밖(010·031·070 등)은 010-123-4567 / 010-1234-5678.
 * 입력하는 동안에도 자리 수에 맞춰 바로 바뀐다.
 */
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}
