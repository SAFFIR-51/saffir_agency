import { notFound } from "next/navigation";
import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section, Todo } from "@/shared/ui";
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
      <Section title="프로젝트 내용">
        <Todo>고객 문제, 구현 내용, 결과, 화면 캡처</Todo>
      </Section>
      <Section title="관련 서비스">
        <div className="flex flex-wrap gap-3">
          {item.relatedSolution ? (
            <ButtonLink href={item.relatedSolution}>이 기능을 솔루션으로 도입하기</ButtonLink>
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
