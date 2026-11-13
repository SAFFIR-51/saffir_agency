import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/shared/config";
import { Container } from "@/shared/ui";
import { cn } from "@/shared/lib";

export function SiteHeaderBar({
  children,
  className,
  onHomeNavigate,
  menuOpen = false,
}: {
  children: React.ReactNode;
  className?: string;
  onHomeNavigate?: () => void;
  menuOpen?: boolean;
}) {
  return (
    <Container
      className={cn(
        "relative flex h-(--site-header-height) max-w-none items-center justify-between px-5 md:px-11",
        !menuOpen && "bg-background",
        className,
      )}
    >
      <Link
        href={routes.home}
        onNavigate={onHomeNavigate}
        className="relative inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <Image
          src="/brand/saffir-logo.png"
          alt={site.name + " 홈"}
          width={1007}
          height={224}
          className={cn("h-7 w-auto md:h-11", menuOpen && "site-menu-logo")}
        />
      </Link>
      {children}
    </Container>
  );
}
