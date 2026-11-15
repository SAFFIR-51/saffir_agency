import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";
import {
  NoteBox,
  Pill,
  PortalPanel,
  PortalTitle,
  Sheet,
  StatGrid,
  pBtnDark,
  pBtnLight,
} from "@/shared/ui";

async function Body() {
  const { data } = await requirePortal(routes.portal.geo);
  const geo = data.geo;
  if (!geo) {
    return (
      <>
        <PortalTitle
          title="GEO"
          sub="진단 기록이 없습니다. 홈페이지 주소로 무료 진단을 해 보세요."
        />
        <Link href={`${routes.hospital.geo}#diagnosis` as Route} className={pBtnDark}>
          무료 진단
        </Link>
      </>
    );
  }
  const { latest } = geo;
  const prev = geo.history.at(-2);
  const diff = prev ? latest.score - prev.score : null;
  const max = Math.max(...geo.history.map((h) => h.score), 100);
  return (
    <>
      <PortalTitle
        title="GEO"
        sub={geo.site}
        actions={
          <>
            <Link href={`${routes.hospital.geo}#diagnosis` as Route} className={pBtnLight}>
              다시 진단
            </Link>
            <Link href={routes.contactFor("geo-fix")} className={pBtnDark}>
              사피어가 고쳐드립니다
            </Link>
          </>
        }
      />
      <StatGrid
        items={[
          {
            label: "최근 진단 점수",
            value: latest.score,
            note: diff !== null ? `${diff >= 0 ? "+" : ""}${diff}점` : latest.date,
          },
          { label: "진단일", value: <span className="text-base">{latest.date}</span> },
          { label: "우선 개선 항목", value: latest.priorities.length },
          {
            label: "의료광고 검사",
            value: geo.adChecks.length,
            note:
              geo.adCheckFreeLeft !== undefined ? `무료 ${geo.adCheckFreeLeft}회 남음` : "무제한",
          },
        ]}
      />

      <div className="grid gap-x-10 lg:grid-cols-2">
        <PortalPanel title="영역별 점수" className="mt-12">
          <ul className="flex flex-col gap-3 text-sm">
            {latest.areas.map((a) => (
              <li
                key={a.name}
                className="grid grid-cols-[8rem_minmax(0,1fr)_3rem] items-center gap-3"
              >
                <span>{a.name}</span>
                <span className="h-2 overflow-hidden rounded-full bg-neutral-200">
                  <span className="block h-full bg-black" style={{ width: `${a.score}%` }} />
                </span>
                <span className="text-right font-semibold tabular-nums">{a.score}</span>
              </li>
            ))}
          </ul>
        </PortalPanel>
        <PortalPanel title="우선 개선 항목" className="mt-12">
          <ol className="flex flex-col gap-2 text-sm">
            {latest.priorities.map((p, i) => (
              <li key={p} className="flex gap-3 border-b border-neutral-200 pb-2">
                <span className="text-xs font-semibold text-neutral-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </PortalPanel>
      </div>

      <PortalPanel title="점수 추이">
        <div className="flex h-44 items-end gap-3 border-b border-neutral-300 pb-0">
          {geo.history.map((h) => (
            <div key={h.date} className="flex flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-xs font-semibold tabular-nums">{h.score}</span>
              <span
                className="w-full max-w-14 rounded-t bg-black"
                style={{ height: `${(h.score / max) * 120}px` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-3">
          {geo.history.map((h) => (
            <span key={h.date} className="flex-1 text-center text-xs text-neutral-500 tabular-nums">
              {h.date.slice(5)}
            </span>
          ))}
        </div>
      </PortalPanel>

      <PortalPanel
        title="AI 답변에 우리 병원이 나왔는지"
        sub="이번 달 측정. 질문은 진료과·지역 기준으로 정합니다."
      >
        {geo.visibility ? (
          <Sheet
            columns={["AI", "나온 질문", "전체 질문", "비율"]}
            rows={geo.visibility.map((v) => [
              v.ai,
              `${v.appeared}개`,
              `${v.asked}개`,
              <span key="r" className="font-semibold tabular-nums">
                {Math.round((v.appeared / v.asked) * 100)}%
              </span>,
            ])}
          />
        ) : (
          <div className="flex flex-col items-start gap-3">
            <NoteBox>
              매달 재진단과 AI 가시성 측정, 점수 추이는 모니터링 이상 구독에서 볼 수 있습니다.
            </NoteBox>
            <Link href={routes.order("geo-monitoring")} className={pBtnDark}>
              모니터링 구독하기
            </Link>
          </div>
        )}
      </PortalPanel>

      <PortalPanel
        title="의료광고 검사 기록"
        action={
          <Link
            href={`${routes.hospital.adCheck}#check` as Route}
            className="text-xs font-semibold"
          >
            새 문구 검사 →
          </Link>
        }
      >
        <Sheet
          columns={["날짜", "검사한 문구", "위험 표현"]}
          firstIsHeader={false}
          rows={geo.adChecks.map((c) => [
            <span key="d" className="tabular-nums">
              {c.date}
            </span>,
            c.summary,
            c.risks > 0 ? (
              <Pill key="r" tone="danger">
                {c.risks}개
              </Pill>
            ) : (
              <Pill key="r" tone="done">
                없음
              </Pill>
            ),
          ])}
        />
      </PortalPanel>
    </>
  );
}

export function GeoPortalPage() {
  return (
    <Suspense
      fallback={
        <div aria-busy="true">
          <h1 className="text-[1.75rem] font-bold tracking-[-0.03em]">GEO</h1>
          <div className="mt-8 h-72 animate-pulse rounded-lg bg-neutral-100" />
        </div>
      }
    >
      <Body />
    </Suspense>
  );
}
