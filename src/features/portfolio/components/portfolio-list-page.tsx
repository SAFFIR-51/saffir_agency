import Link from "next/link";
import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section, WireBox } from "@/shared/ui";
import { getPortfolioMeta, listPortfolioByGroup } from "../api/queries";

/** 포트폴리오 목록: 분야별 구역마다 카드 (대표 화면 · 이름 · 기술) */
export function PortfolioListPage() {
  const meta = getPortfolioMeta();
  const groups = listPortfolioByGroup();
  return (
    <>
      <PageHeader
        title="포트폴리오"
        lead={`직접 설계하고 개발한 프로젝트 ${meta.total}건을 ${groups.length}개 분야로 모았습니다.`}
      >
        {/* 분야 바로 가기 */}
        <nav aria-label="분야" className="flex flex-wrap justify-center gap-2">
          {groups.map((g) => (
            <a
              key={g.group}
              href={`#${g.group}`}
              className="rounded-full bg-surface px-4 py-2 text-sm hover:bg-divider/60"
            >
              {g.name} <span className="text-muted">{g.items.length}</span>
            </a>
          ))}
        </nav>
      </PageHeader>
      {groups.map((group) => (
        <Section key={group.group} id={group.group} title={group.name}>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={routes.portfolioDetail(item.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-surface transition duration-300 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgb(0_0_0/0.10)] [section:nth-of-type(even)_&]:bg-background"
                >
                  <WireBox
                    label={`${item.title} 대표 화면`}
                    size="fit"
                    className="aspect-[4/3] rounded-none! bg-divider/40!"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold text-muted">{item.techNames.join(" · ")}</p>
                    <p className="mt-1.5 text-[21px] font-semibold tracking-tight">{item.title}</p>
                    {item.relatedName ? (
                      <p className="mt-3 text-sm text-muted">관련 솔루션 · {item.relatedName}</p>
                    ) : null}
                    <p aria-hidden className="mt-auto pt-5 text-link group-hover:underline">
                      자세히 보기 ›
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <Section
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
