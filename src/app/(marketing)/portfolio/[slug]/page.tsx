import { getPortfolioSlugs, PortfolioDetailPage } from "@/features/portfolio";

export async function generateStaticParams() {
  return getPortfolioSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  return <PortfolioDetailPage slug={slug} />;
}
