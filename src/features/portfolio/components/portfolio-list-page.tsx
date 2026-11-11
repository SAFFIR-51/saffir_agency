import { routes } from "@/shared/config";
import { BulletList, CardGrid, LinkCard, PageHeader, Section, Todo } from "@/shared/ui";
import { getPortfolioMeta, listPortfolioByGroup } from "../api/queries";

export function PortfolioListPage() {
  const meta = getPortfolioMeta();
  return (
    <>
      <PageHeader
        title="포트폴리오"
        lead={`고유 프로젝트 ${meta.total}건을 역량별 5개 묶음으로 정리했습니다.`}
      />
      <Section title="필터">
        <BulletList
          items={[
            `업종: ${meta.industryFilters.join(", ")} 등`,
            `기술: ${Object.values(meta.techLabels).join(", ")}`,
          ]}
        />
        <Todo>필터 기능 (업종·기술 선택 시 목록 좁히기)</Todo>
      </Section>
      {listPortfolioByGroup().map((group) => (
        <Section
          key={group.group}
          title={`${group.name} (${group.items.length}건)`}
          description={`사이트에서의 역할: ${group.role}`}
        >
          <CardGrid>
            {group.items.map((item) => (
              <LinkCard
                key={item.slug}
                href={routes.portfolioDetail(item.slug)}
                title={item.title}
                description={item.tech.map((t) => meta.techLabels[t]).join(" · ")}
              >
                {item.relatedSolution ? "관련 솔루션 있음" : null}
              </LinkCard>
            ))}
          </CardGrid>
        </Section>
      ))}
      <Section title="참고">
        <BulletList items={meta.notes} />
      </Section>
    </>
  );
}
