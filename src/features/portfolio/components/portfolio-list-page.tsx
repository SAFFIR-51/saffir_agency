import Link from "next/link";
import { routes } from "@/shared/config";
import { ButtonLink, DataTable, PageHeader, Section, WireInput } from "@/shared/ui";
import { getPortfolioMeta, listPortfolioByGroup } from "../api/queries";

export function PortfolioListPage() {
  const meta = getPortfolioMeta();
  const groups = listPortfolioByGroup();
  return (
    <>
      <PageHeader title="포트폴리오" lead={`프로젝트 ${meta.total}건을 5개 분야로 정리했습니다.`} />
      <Section label="S2 · 필터">
        <div className="grid gap-4 sm:grid-cols-2">
          <WireInput
            label="업종"
            kind="select"
            placeholder={`${meta.industryFilters.join(", ")} 등`}
          />
          <WireInput
            label="기술"
            kind="select"
            placeholder={Object.values(meta.techLabels).join(", ")}
          />
        </div>
      </Section>
      {groups.map((group, index) => (
        <Section
          key={group.group}
          label={`S${index + 3} · ${group.name}`}
          title={`${group.name} · ${group.items.length}건`}
        >
          <DataTable
            columns={["프로젝트", "기술", "관련 솔루션"]}
            rows={group.items.map((item) => [
              <Link
                key={item.slug}
                href={routes.portfolioDetail(item.slug)}
                className="underline underline-offset-4"
              >
                {item.title}
              </Link>,
              item.techNames.join(", "),
              item.relatedSolution && item.relatedName ? (
                <Link
                  key={`${item.slug}-r`}
                  href={item.relatedSolution}
                  className="underline underline-offset-4"
                >
                  {item.relatedName}
                </Link>
              ) : (
                "-"
              ),
            ])}
          />
        </Section>
      ))}
      <Section
        label={`S${groups.length + 3} · 다음`}
        title="비슷한 것이 필요하세요?"
        description="만들고 싶은 것을 알려 주시면 범위와 금액을 안내해 드립니다."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.development.estimate}>견적 요청</ButtonLink>
          <ButtonLink href={routes.contact} variant="secondary">
            도입 상담
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
