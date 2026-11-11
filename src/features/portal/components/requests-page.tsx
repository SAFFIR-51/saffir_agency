import { ScreenOutline } from "@/shared/layout";
import { menuItems } from "../model/content";

export function RequestsPage() {
  return <ScreenOutline eyebrow="포털" title="요청·문의" items={menuItems("요청·문의")} />;
}
