import { businessModels, workflow } from "@/content/company";
import { portfolioItems } from "@/content/portfolio";
import { routes, site } from "@/shared/config";
import { ButtonLink, DataTable, PageHeader, Section, WireBox } from "@/shared/ui";
import { aboutContent as c } from "../model/content";

export function AboutPage() {
  const b = site.business;
  return (
    <>
      {/* 첫 화면 그림은 검정 띠의 3D 그림이 맡는다 (사무실·팀 사진은 정해지면 아래 구역에) */}
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="graphite" />

      <Section label="S2 · 하는 일" title={c.lines.title}>
        <DataTable
          columns={["방식", "무엇을", "어떻게"]}
          rows={businessModels.map((m) => [m.type, m.products, m.delivery])}
        />
      </Section>

      <Section label="S3 · 숫자" title={c.numbers.title}>
        <DataTable
          columns={["항목", "값"]}
          rows={[
            ["포트폴리오", `${portfolioItems.length}건`],
            ["운영 중인 고객사", "[ 숫자 ]"],
            ["설립", "[ 연도 ]"],
          ]}
        />
      </Section>

      <Section label="S4 · 일하는 방식" title={c.workflow.title}>
        <DataTable
          columns={["단계", "내용"]}
          rows={workflow.map((w, index) => [`${index + 1}. ${w.step}`, w.detail])}
        />
      </Section>

      <Section label="S5 · 연혁" title={c.history.title}>
        <DataTable columns={["연도", "내용"]} rows={[["[ 연도 ]", "[ 내용 ]"]]} />
      </Section>

      <Section label="S6 · 회사 정보" title={c.info.title}>
        <DataTable
          columns={["항목", "내용"]}
          rows={[
            ["상호", site.legalName],
            ["대표", b.ceo],
            ["사업자등록번호", b.registrationNumber],
            ["통신판매업 신고번호", b.mailOrderNumber],
            ["주소", b.address],
            ["이메일", b.email],
            ["전화", b.phone],
          ]}
        />
      </Section>

      <Section label="S7 · 위치" title={c.location.title}>
        <WireBox label="지도" size="lg" />
      </Section>

      <Section label="S8 · 상담" title={c.closing.title} description={c.closing.description}>
        <ButtonLink href={routes.contact}>{c.closing.cta}</ButtonLink>
      </Section>
    </>
  );
}
