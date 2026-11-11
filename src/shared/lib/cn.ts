/** className 합치기. 필요해지면 clsx + tailwind-merge로 교체합니다. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
