import type { Route } from "next";
import { routes } from "@/shared/config";
import { ButtonPair, SubpageClosing, SubpageSection } from "@/shared/sections";
import { listPortfolioByGroup } from "../api/queries";
import { PortfolioGallery } from "./portfolio-gallery";

const c = {
  hero: {
    secondary: "도입 상담",
    primary: "견적 요청",
  },
  work: {
    title: "All Work",
    sub: ["분야별로 골라 보세요.", "사례를 누르면 자세한 내용으로 이동합니다."],
  },
  closing: {
    title: "만들고 싶은 서비스가 있으신가요?",
    description: "만들고 싶은 것을 알려 주시면 범위와 금액을 안내해 드립니다.",
  },
};

/** 포트폴리오: 다른 세부 페이지와 같은 첫 화면 + 분야·기술로 거르는 사례 카드 */
export function PortfolioLanding() {
  const groups = listPortfolioByGroup();
  const items = groups.flatMap((g) =>
    g.items.map((item) => ({
      slug: item.slug,
      href: routes.portfolioDetail(item.slug),
      title: item.title,
      group: g.group,
      groupName: g.name,
      techNames: item.techNames,
      summary: item.summary,
      image: item.image,
      related:
        item.relatedSolution && item.relatedName
          ? { href: item.relatedSolution, name: item.relatedName.replace(/^사피어\s/, "") }
          : undefined,
    })),
  );
  const buttons = {
    secondary: { href: routes.contact as Route, label: c.hero.secondary },
    primary: { href: routes.development.estimate as Route, label: c.hero.primary },
  };

  return (
    <div className="bg-white pb-16 text-black">
      <h1 className="sr-only">포트폴리오</h1>
      <SubpageSection
        id="portfolio-work"
        first
        en={c.work.title}
        sub={c.work.sub}
        action={<ButtonPair {...buttons} />}
      >
        <PortfolioGallery
          items={items}
          groups={groups.map((g) => ({ key: g.group, name: g.name, count: g.items.length }))}
        />
      </SubpageSection>
      <SubpageClosing
        title={c.closing.title}
        description={c.closing.description}
        buttons={buttons}
      />
    </div>
  );
}
