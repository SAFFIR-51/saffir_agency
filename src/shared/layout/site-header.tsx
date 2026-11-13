import { SiteMenu } from "./site-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background">
      <SiteMenu />
    </header>
  );
}
