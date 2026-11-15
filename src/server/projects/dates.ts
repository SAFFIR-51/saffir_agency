/** 날짜 계산 (한국 시간 기준, "YYYY-MM-DD" 문자열) */
const DAY = 86_400_000;

export function todayKST(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(now);
}

/** "2026-11-16 14:03" (한국 시간) */
export function nowKST(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(now)
    .replace(",", "");
}

function toUTC(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export function addDays(date: string, days: number) {
  return new Date(toUTC(date).getTime() + days * DAY).toISOString().slice(0, 10);
}

/** 그 주 월요일 */
export function mondayOf(date: string) {
  const day = toUTC(date).getUTCDay(); // 0=일
  return addDays(date, day === 0 ? -6 : 1 - day);
}

/** ISO 주차 번호 */
function isoWeek(date: string) {
  const d = toUTC(date);
  const thursday = new Date(d.getTime() + (3 - ((d.getUTCDay() + 6) % 7)) * DAY);
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  return 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / (7 * DAY));
}

/** "46주차 (11-09~11-13)" */
export function weekLabel(weekOf: string) {
  return `${isoWeek(weekOf)}주차 (${weekOf.slice(5)}~${addDays(weekOf, 4).slice(5)})`;
}

/** "11-21" */
export function short(date: string) {
  return date.slice(5);
}

export function daysBetween(from: string, to: string) {
  return Math.round((toUTC(to).getTime() - toUTC(from).getTime()) / DAY);
}
