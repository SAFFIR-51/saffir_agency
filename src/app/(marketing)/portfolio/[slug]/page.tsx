import type { Metadata } from "next";
import { getPortfolioMetadata, getPortfolioSlugs, PortfolioDetailPage } from "@/features/portfolio";

export async function generateStaticParams() {
  return getPortfolioSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return getPortfolioMetadata(slug);
}

export default async function Page({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  return <PortfolioDetailPage slug={slug} />;
}
