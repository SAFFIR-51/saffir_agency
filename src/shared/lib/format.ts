const krw = new Intl.NumberFormat("ko-KR");

/** 1650000 -> "1,650,000원" */
export function formatKRW(amount: number) {
  return `${krw.format(amount)}원`;
}
