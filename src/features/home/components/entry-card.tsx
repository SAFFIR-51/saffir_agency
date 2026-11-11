import type { Route } from "next";
import Link from "next/link";
import { ButtonLink } from "@/shared/ui";

/** 세 갈래 카드: 제목·설명·목록 + 같은 모양의 버튼 두 개 (링크 안에 링크를 넣지 않도록 카드 자체는 링크가 아니다) */
export function EntryCard({
  title,
  href,
  description,
  start,
  moreLabel,
  children,
}: {
  title: string;
  href: Route;
  description: string;
  start: { label: string; href: Route };
  moreLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-foreground/15 p-5">
      <p className="font-semibold">
        <Link href={href} className="hover:underline hover:underline-offset-4">
          {title}
        </Link>
      </p>
      <p className="mt-1 text-sm text-foreground/70">{description}</p>
      <div className="mt-3 flex-1 text-sm text-foreground/70">{children}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        <ButtonLink href={start.href} className="h-9 px-4">
          {start.label}
        </ButtonLink>
        <ButtonLink href={href} variant="secondary" className="h-9 px-4">
          {moreLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
