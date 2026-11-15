import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECT_STAGES, requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import { cn } from "@/shared/lib";
import {
  NoteBox,
  Pill,
  PortalPanel,
  PortalTitle,
  ProgressLine,
  Sheet,
  pBtnDark,
  pBtnLight,
  pLabel,
  pTextarea,
} from "@/shared/ui";
import { decideDeliverableAction } from "../api/deliverable";
import { PortalPage } from "./portal-page";

const statusTone = {
  "작성 중": "default",
  "승인 대기": "strong",
  "수정 요청": "danger",
  "승인 완료": "done",
} as const;

async function Body({ projectId }: { projectId: string }) {
  const { session, data } = await requirePortal(routes.portal.project(projectId));
  if (!canSeePortalMenu(routes.portal.projects, session.kinds)) {
    return (
      <PortalNoAccess title="프로젝트" audience={portalMenuAudienceLabel(routes.portal.projects)} />
    );
  }
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) notFound();
  const current = PROJECT_STAGES.indexOf(project.stage);
  const waiting = project.deliverables.filter((d) => d.status === "승인 대기");
  const deliverables = project.deliverables.toSorted(
    (a, b) => Number(b.status === "승인 대기") - Number(a.status === "승인 대기"),
  );

  return (
    <>
      <p className="text-xs text-neutral-500">
        <Link href={routes.portal.projects} className="hover:text-black hover:underline">
          프로젝트
        </Link>{" "}
        / {project.name}
      </p>
      <div className="mt-2">
        <PortalTitle
          title={project.name}
          sub={`${project.period} · 다음 일정 ${project.nextMilestone}`}
          actions={<ProgressLine value={project.progress} label="전체 진행률" />}
        />
      </div>

      {waiting.length > 0 ? (
        <a
          href="#deliverables"
          className="mb-8 flex items-center justify-between gap-4 rounded-lg bg-black px-5 py-4 text-white"
        >
          <span className="text-[0.9375rem] font-semibold">
            확인하고 승인할 산출물이 {waiting.length}건 있습니다.
          </span>
          <span className="text-sm">확인하기 →</span>
        </a>
      ) : null}

      <ol className="grid grid-cols-3 border-t border-l border-neutral-300 sm:grid-cols-6">
        {PROJECT_STAGES.map((stage, i) => (
          <li
            key={stage}
            aria-current={i === current ? "step" : undefined}
            className={cn(
              "border-r border-b border-neutral-300 px-3 py-3 text-sm font-semibold",
              i === current && "bg-black text-white",
              i > current && "text-neutral-400",
            )}
          >
            <span className="block text-[0.6875rem] font-normal tabular-nums opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < current ? "✓ " : ""}
            {stage}
          </li>
        ))}
      </ol>

      <PortalPanel
        id="deliverables"
        title="산출물 확인·승인"
        sub="승인하면 다음 일정으로 넘어갑니다. 고칠 점이 있으면 의견을 남겨 주세요."
      >
        {deliverables.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {deliverables.map((d) => (
              <li
                key={d.id ?? d.name}
                className={cn(
                  "rounded-lg border p-5",
                  d.status === "승인 대기" ? "border-black" : "border-neutral-300",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">
                      {d.stage} · {d.date}
                    </p>
                    <h3 className="mt-1 text-base font-bold">{d.name}</h3>
                    {d.note ? <p className="mt-1 text-sm text-neutral-700">{d.note}</p> : null}
                    {d.link ? (
                      <a
                        href={d.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm font-semibold underline underline-offset-4"
                      >
                        열어 보기 ↗
                      </a>
                    ) : null}
                    {d.feedback ? (
                      <p className="mt-2 text-sm text-neutral-600">보낸 의견: {d.feedback}</p>
                    ) : null}
                  </div>
                  <Pill tone={statusTone[d.status]}>{d.status}</Pill>
                </div>
                {d.status === "승인 대기" && d.id ? (
                  <form
                    action={decideDeliverableAction.bind(null, project.id, d.id)}
                    className="mt-5 flex flex-col gap-3 border-t border-neutral-200 pt-5"
                  >
                    <label htmlFor={`fb-${d.id}`} className={pLabel}>
                      의견 <span className="font-normal text-neutral-500">(수정 요청 시 필수)</span>
                    </label>
                    <textarea
                      id={`fb-${d.id}`}
                      name="feedback"
                      rows={2}
                      placeholder="고칠 점을 적어 주세요."
                      className={pTextarea}
                    />
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" name="decision" value="approve" className={pBtnDark}>
                        승인하기
                      </button>
                      <button type="submit" name="decision" value="changes" className={pBtnLight}>
                        수정 요청
                      </button>
                    </div>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">아직 올라온 산출물이 없습니다.</p>
        )}
      </PortalPanel>

      <div className="grid gap-x-10 lg:grid-cols-2">
        <PortalPanel title="일정">
          <Sheet
            columns={["단계", "일정", "예정", "완료"]}
            firstIsHeader={false}
            rows={project.schedule.map((s) => [
              s.stage,
              <span key="t" className={s.done ? "text-neutral-500" : "font-semibold"}>
                {s.title ?? "-"}
              </span>,
              <span key="p" className="tabular-nums">
                {s.planned}
              </span>,
              <span key="d" className="tabular-nums">
                {s.done ?? "-"}
              </span>,
            ])}
          />
        </PortalPanel>
        <PortalPanel title="진행 중인 작업">
          <Sheet
            columns={["작업", "상태", "마감"]}
            empty="진행 중인 작업이 없습니다."
            rows={(project.tasks ?? []).map((t) => [
              t.title,
              <Pill
                key="s"
                tone={t.status === "진행 중" ? "strong" : t.status === "보류" ? "warn" : "default"}
              >
                {t.status}
              </Pill>,
              <span key="d" className="tabular-nums">
                {t.due}
              </span>,
            ])}
          />
        </PortalPanel>
      </div>

      <div className="mt-10">
        <NoteBox>
          매주 작업 보고와 회의록은{" "}
          <Link href={routes.portal.reports} className="font-semibold underline underline-offset-4">
            작업 보고
          </Link>
          에서, 수정 요청은{" "}
          <Link
            href={routes.portal.requests}
            className="font-semibold underline underline-offset-4"
          >
            요청·문의
          </Link>
          에서 볼 수 있습니다.
        </NoteBox>
      </div>
    </>
  );
}

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  return (
    <PortalPage title="프로젝트">
      <Body projectId={projectId} />
    </PortalPage>
  );
}
