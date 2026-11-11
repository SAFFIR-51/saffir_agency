import { notFound } from "next/navigation";
import { businessFlywheel, overview, systemArchitecture } from "@/content/company";
import { priceBenchmarkNotes, priceBenchmarks } from "@/content/pricing";
import { services } from "@/content/services";
import { isProduction } from "@/server/env";
import { footerGroups, mainNav } from "@/shared/config";
import { BulletList, DataTable, Note, PageHeader, Section } from "@/shared/ui";
import {
  openQuestions,
  pageStructureRule,
  saffirgeoIntegration,
  tossReview,
} from "../model/content";

/** 기획서 중 공개 페이지에 나가지 않는 내용. 운영 환경에서는 404. */
export function PlanNotesPage() {
  if (isProduction) notFound();
  return (
    <>
      <PageHeader
        eyebrow="내부 검토용 · 운영 환경에서는 보이지 않음"
        title="사피어 웹사이트 통합 기획 메모"
        lead={overview.summary}
      />
      <Section title="한눈에 보기">
        <BulletList items={overview.points} />
        <BulletList items={businessFlywheel} />
      </Section>
      <Section title="시스템 구성">
        <BulletList items={systemArchitecture} />
      </Section>
      <Section title="사이트맵">
        <BulletList
          items={mainNav.map((item) =>
            item.children
              ? `${item.label} ${item.href} — ${item.children.map((c) => `${c.label} ${c.href}`).join(", ")}`
              : `${item.label} ${item.href}`,
          )}
        />
        <BulletList
          items={[
            "문의 /contact, FAQ /faq",
            "로그인·포털 /login, /dashboard",
            ...footerGroups.map(
              (g) => `하단 ${g.title}: ${g.items.map((f) => `${f.label} ${f.href}`).join(", ")}`,
            ),
          ]}
        />
      </Section>
      <Section title="서비스별 페이지 구성" description={pageStructureRule}>
        <DataTable
          columns={["서비스", "핵심 메시지", "주요 내용", "다음 행동 버튼", "근거 포트폴리오"]}
          rows={services.map((s) => [
            s.name,
            s.message,
            s.highlights.join(", "),
            s.nextAction,
            s.evidence.join(", "),
          ])}
        />
      </Section>
      <Section title="saffirgeo 통합 방식">
        <BulletList items={saffirgeoIntegration} />
      </Section>
      <Section title="가격 근거 (경쟁사 비교)">
        <DataTable
          columns={["분야", "경쟁사·상품", "공개 가격", "사피어 제안가", "판단"]}
          rows={priceBenchmarks.map((b) => [b.field, b.competitor, b.price, b.ours, b.judgement])}
        />
        <BulletList items={priceBenchmarkNotes} />
      </Section>
      <Section title="결제와 토스페이먼츠 심사">
        <Note title="기한">
          <p>{tossReview.deadline}</p>
        </Note>
        <BulletList items={tossReview.items} />
        <p className="font-semibold">우선 오픈 범위</p>
        <BulletList items={tossReview.firstRelease} />
        <p className="text-foreground/70">{tossReview.later}</p>
      </Section>
      <Section title="미정 사항">
        <ul className="space-y-2">
          {openQuestions.map((q) => (
            <li key={q}>☐ {q}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
