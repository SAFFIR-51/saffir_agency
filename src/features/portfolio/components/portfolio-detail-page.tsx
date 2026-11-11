import { notFound } from "next/navigation";
import { ButtonLink, Section } from "@/shared/ui";
import { findPortfolio } from "../api/queries";

export function PortfolioDetailPage({ slug }: { slug: string }) {
  const item = findPortfolio(slug);
  if (!item) notFound();
  return (
    <Section title={item.title} description={item.tech.join(" · ").toUpperCase()}>
      {item.relatedSolution ? (
        <ButtonLink href={item.relatedSolution}>이 기능을 솔루션으로 도입하기</ButtonLink>
      ) : null}
    </Section>
  );
}
