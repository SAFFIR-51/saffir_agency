import { Suspense } from "react";
import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, DataTable, Note, PageHeader, Section, WireBox } from "@/shared/ui";

async function Body() {
  const { data } = await requirePortal(routes.portal.geo);
  const geo = data.geo;
  if (!geo) {
    return (
      <>
        <PageHeader eyebrow="포털" title="GEO" />
        <Section>
          <p className="text-foreground/70">
            진단 기록이 없습니다. 홈페이지 주소로 무료 진단을 해 보세요.
          </p>
          <ButtonLink href={`${routes.hospital.geo}#diagnosis`} variant="secondary">
            무료 진단
          </ButtonLink>
        </Section>
      </>
    );
  }
  const { latest } = geo;
  return (
    <>
      <PageHeader eyebrow="포털" title="GEO" lead={geo.site} />
      <Section
        label="S2 · 진단 리포트"
        title={`최근 진단 ${latest.score}점`}
        description={`${latest.date} 진단`}
      >
        <DataTable
          columns={["영역", "점수"]}
          rows={latest.areas.map((a) => [a.name, `${a.score}점`])}
        />
        <p className="text-sm font-semibold">우선 개선 항목</p>
        <BulletList items={latest.priorities} />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contactFor("geo-fix")}>사피어가 고쳐드립니다</ButtonLink>
          <ButtonLink href={`${routes.hospital.geo}#diagnosis`} variant="secondary">
            다시 진단
          </ButtonLink>
        </div>
      </Section>
      <Section label="S3 · AI 가시성" title="AI 답변에 우리 병원이 나왔는지">
        {geo.visibility ? (
          <DataTable
            columns={["AI", "나온 질문", "전체 질문", "비율"]}
            rows={geo.visibility.map((v) => [
              v.ai,
              `${v.appeared}개`,
              `${v.asked}개`,
              `${Math.round((v.appeared / v.asked) * 100)}%`,
            ])}
            caption="이번 달 측정. 질문은 진료과·지역 기준으로 정합니다."
          />
        ) : (
          <>
            <Note title="구독하면 볼 수 있습니다">
              <p>
                매달 재진단과 AI 가시성 측정, 점수 추이는 모니터링 이상 구독에서 볼 수 있습니다.
              </p>
            </Note>
            <ButtonLink href={routes.order("geo-monitoring")}>모니터링 구독하기</ButtonLink>
          </>
        )}
      </Section>
      <Section label="S4 · 진단 기록" title="점수 추이">
        <WireBox label="점수 추이 그래프" />
        <DataTable
          columns={["날짜", "점수", "변화"]}
          rows={geo.history.map((h, index) => {
            const prev = geo.history[index - 1];
            const diff = prev ? h.score - prev.score : 0;
            return [h.date, `${h.score}점`, prev ? `${diff >= 0 ? "+" : ""}${diff}` : "-"];
          })}
        />
      </Section>
      <Section label="S5 · 의료광고 점검" title="의료광고 검사 기록">
        <DataTable
          columns={["날짜", "검사한 문구", "위험 표현"]}
          rows={geo.adChecks.map((c) => [c.date, c.summary, c.risks > 0 ? `${c.risks}개` : "없음"])}
          caption={
            geo.adCheckFreeLeft !== undefined
              ? `이번 달 남은 무료 검사 ${geo.adCheckFreeLeft}회`
              : "구독 중이라 검사 횟수 제한이 없습니다."
          }
        />
        <ButtonLink href={`${routes.hospital.adCheck}#check`} variant="secondary">
          새 문구 검사
        </ButtonLink>
      </Section>
    </>
  );
}

export function GeoPortalPage() {
  return (
    <Suspense fallback={<PageHeader eyebrow="포털" title="GEO" />}>
      <Body />
    </Suspense>
  );
}
