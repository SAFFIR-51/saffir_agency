import { developmentAreas } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { listServices, serviceLines } from "@/content/services";
import { routes } from "@/shared/config";
import { homeContent as c } from "../model/content";
import { DeliveryModels } from "./delivery-models";
import { EntryCard } from "./entry-card";
import { HomeDetails } from "./home-details";
import { HomeHero } from "./home-hero";
import { HomePortfolio } from "./home-portfolio";
import { ServiceCards } from "./service-cards";

export function HomePage() {
  const featured = c.featured.flatMap((f) => {
    const item = portfolioItems.find((p) => p.slug === f.slug);
    return item ? [{ ...item, tag: f.tag }] : [];
  });
  const lines = c.entry.lines;

  return (
    <>
      <HomeHero />
      <HomePortfolio projects={featured} />

      <ServiceCards>
        <EntryCard
          title={serviceLines.hospital.name}
          href={routes.hospital.root}
          headline={lines.hospital.headline}
          image={lines.hospital.image}
          description={lines.hospital.description}
          items={listServices("hospital").map((s) => s.name)}
          start={lines.hospital.start}
          moreLabel={c.entry.more}
        />
        <EntryCard
          title={serviceLines.business.name}
          href={routes.solutions.root}
          headline={lines.business.headline}
          image={lines.business.image}
          description={lines.business.description}
          items={listServices("business").map((s) => s.name)}
          start={lines.business.start}
          moreLabel={c.entry.more}
        />
        <EntryCard
          title="맞춤 개발"
          href={routes.development.root}
          headline={lines.development.headline}
          image={lines.development.image}
          description={lines.development.description}
          items={developmentAreas}
          start={lines.development.start}
          moreLabel={c.entry.more}
        />
      </ServiceCards>

      <DeliveryModels />

      <HomeDetails />
    </>
  );
}
