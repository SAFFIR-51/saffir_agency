import Link from "next/link";
import { routes } from "@/shared/config";
import { Section } from "@/shared/ui";
import { listPortfolio, listPortfolioGroups } from "../api/queries";

export function PortfolioListPage() {
  const items = listPortfolio();
  const groups = listPortfolioGroups();
  return (
    <Section
      title="포트폴리오"
      description="업종·기술 필터는 PortfolioFilter(클라이언트 컴포넌트)로 붙입니다."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="rounded-xl border border-foreground/10 p-5">
            <p className="text-xs text-foreground/60">{groups[item.group]}</p>
            <Link href={routes.portfolioDetail(item.slug)} className="mt-1 block font-medium">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
