import { ScreenOutline } from "@/shared/layout";
import { menuItems } from "../model/content";

export function AccountPage() {
  return <ScreenOutline eyebrow="포털" title="계정" items={menuItems("계정")} />;
}
