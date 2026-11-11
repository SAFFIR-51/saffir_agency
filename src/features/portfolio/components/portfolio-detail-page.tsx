import { notFound } from "next/navigation";
import { routes } from "@/shared/config";
import { ButtonLink, DataTable, PageHeader, Section, WireBox } from "@/shared/ui";
import { findPortfolio } from "../api/queries";

export function PortfolioDetailPage({ slug }: { slug: string }) {
  const item = findPortfolio(slug);
  if (!item) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`포트폴리오 · ${item.groupName}`}
        title={item.title}
        lead={`기술: ${item.techNames.join(", ")}`}
      />
      <Section label="S2 · 이미지">
        <WireBox label="대표 이미지" size="lg" />
      </Section>
      <Section label="S3 · 프로젝트 내용" title="프로젝트 내용">
        <DataTable
          columns={["항목", "내용"]}
          rows={[
            ["고객 문제", "[ 작성 예정 ]"],
            ["구현 내용", "[ 작성 예정 ]"],
            ["결과", "[ 작성 예정 ]"],
          ]}
        />
      </Section>
      <Section label="S4 · 관련 서비스" title="비슷한 것이 필요하다면">
        <div className="flex flex-wrap gap-3">
          {item.relatedSolution && item.relatedName ? (
            <ButtonLink href={item.relatedSolution}>{item.relatedName} 도입하기</ButtonLink>
          ) : null}
          <ButtonLink href={routes.development.estimate} variant="secondary">
            비슷한 개발 견적 요청
          </ButtonLink>
          <ButtonLink href={routes.portfolio} variant="secondary">
            포트폴리오 목록
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
