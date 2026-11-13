import { routes } from "@/shared/config";
import { ButtonLink, PageHeader } from "@/shared/ui";
import { getPortfolioMeta, listPortfolioByGroup } from "../api/queries";
import { PortfolioBrowser } from "./portfolio-browser";
import "./portfolio.css";

/** 포트폴리오 목록 (NHN Cloud 서비스 목록 구성): 검정 띠 → 왼쪽 거르기 + 오른쪽 카드 */
export function PortfolioListPage() {
  const meta = getPortfolioMeta();
  const groups = listPortfolioByGroup().map((g) => ({
    group: g.group,
    name: g.name,
    items: g.items.map((item) => ({
      slug: item.slug,
      href: routes.portfolioDetail(item.slug),
      title: item.title,
      tech: item.tech[0] ?? "web",
      techNames: item.techNames.join(" · "),
      related: item.relatedName,
    })),
  }));
  return (
    <>
      <PageHeader
        title="사피어 포트폴리오"
        lead={`직접 설계하고 개발한 프로젝트 ${meta.total}건을 분야별로 모았습니다.`}
        tone="violet"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
          <ButtonLink href={routes.contact} variant="secondary">
            도입 상담
          </ButtonLink>
        </div>
      </PageHeader>
      <div className="nc-container py-12 lg:py-[60px]">
        <PortfolioBrowser groups={groups} />
      </div>
    </>
  );
}
