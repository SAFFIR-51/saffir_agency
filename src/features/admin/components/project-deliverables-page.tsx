import { Picker, toOptions } from "@/shared/ui";
import type { Route } from "next";
import Link from "next/link";
import { dataSource } from "@/server/api";
import { DELIVERABLE_STATUSES, PM_STAGES, short, type Deliverable } from "@/server/projects";
import { cn } from "@/shared/lib";
import {
  addDeliverableAction,
  editDeliverableAction,
  newVersionAction,
  removeDeliverableAction,
  requestApprovalAction,
  withdrawApprovalAction,
} from "../api/actions";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { Panel, btnDark, btnLight, btnSmall, input, label, textarea } from "./ui";

/** 파일 첨부 (백엔드 모드만, 백엔드 /api/upload와 같은 확장자·50MB) */
const UPLOAD_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg,.gif,.webp,.svg";
const UPLOAD_HINT = "PDF·문서·이미지·ZIP, 50MB까지";
const fileInput =
  "block w-full text-sm text-neutral-600 file:mr-3 file:h-9 file:rounded-md file:border file:border-neutral-300 file:bg-white file:px-3 file:text-sm file:font-semibold hover:file:border-black";

const tone: Record<Deliverable["status"], string> = {
  "작성 중": "border-neutral-300 text-neutral-600",
  "승인 요청": "border-black bg-black text-white",
  "수정 요청": "border-red-600 text-red-600",
  "승인 완료": "border-neutral-200 bg-neutral-100 text-neutral-500",
};

async function Body({
  projectId,
  edit,
  error,
}: {
  projectId: string;
  edit?: string;
  /** "1" 입력 확인, "file" 파일 올리기 실패 */
  error?: string;
}) {
  const { project, href } = await loadProject(projectId, "deliverables");
  const counts = DELIVERABLE_STATUSES.map(
    (s) => [s, project.deliverables.filter((d) => d.status === s).length] as const,
  );
  const ordered = project.deliverables.toSorted(
    (a, b) =>
      DELIVERABLE_STATUSES.indexOf(a.status === "수정 요청" ? "작성 중" : a.status) -
        DELIVERABLE_STATUSES.indexOf(b.status === "수정 요청" ? "작성 중" : b.status) ||
      PM_STAGES.indexOf(a.stage) - PM_STAGES.indexOf(b.stage),
  );
  const milestoneTitle = (id?: string) => project.milestones.find((m) => m.id === id)?.title;
  const uploads = dataSource() === "api";

  return (
    <ProjectFrame project={project} tab="deliverables" href={href}>
      <Panel
        title="산출물"
        sub="올리기 → 고객에게 승인 요청 → 고객이 포털에서 승인하거나 수정 요청. 승인되면 연결한 마일스톤도 완료됩니다."
        action={
          <ul className="flex flex-wrap gap-3 text-xs text-neutral-500">
            {counts.map(([s, n]) => (
              <li key={s}>
                {s} <span className="font-semibold text-black tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        }
      >
        <ul className="flex flex-col gap-3">
          {ordered.map((d) => (
            <li
              key={d.id}
              id={d.id}
              className={cn(
                "scroll-mt-6 rounded-lg border p-5",
                d.status === "수정 요청" ? "border-red-300" : "border-neutral-300",
              )}
            >
              {edit === d.id ? (
                <form
                  action={editDeliverableAction.bind(null, project.id, d.id)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor={`ed-name-${d.id}`} className={label}>
                      이름
                    </label>
                    <input
                      id={`ed-name-${d.id}`}
                      name="name"
                      defaultValue={d.name}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`ed-version-${d.id}`} className={label}>
                      버전
                    </label>
                    <input
                      id={`ed-version-${d.id}`}
                      name="version"
                      defaultValue={d.version}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`ed-link-${d.id}`} className={label}>
                      링크 (Figma, 테스트 주소, 문서)
                    </label>
                    <input
                      id={`ed-link-${d.id}`}
                      name="link"
                      defaultValue={d.link}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`ed-ms-${d.id}`} className={label}>
                      연결 마일스톤
                    </label>
                    <Picker
                      id={`ed-ms-${d.id}`}
                      name="milestoneId"
                      defaultValue={d.milestoneId ?? ""}
                      options={[
                        { value: "", label: "없음" },
                        ...project.milestones.map((m) => ({
                          value: m.id,
                          label: m.title,
                          hint: short(m.due),
                        })),
                      ]}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`ed-note-${d.id}`} className={label}>
                      설명 (고객에게 보임)
                    </label>
                    <textarea
                      id={`ed-note-${d.id}`}
                      name="note"
                      rows={2}
                      defaultValue={d.note}
                      className={textarea}
                    />
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="submit" className={btnDark}>
                      저장
                    </button>
                    <Link href={href.deliverables} className={btnLight}>
                      취소
                    </Link>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-500">
                        {d.stage}
                        {d.milestoneId ? ` · 마일스톤 ${milestoneTitle(d.milestoneId)}` : ""}
                      </p>
                      <h3 className="mt-1 text-base font-bold">
                        {d.name} <span className="font-semibold text-neutral-500">{d.version}</span>
                      </h3>
                      {d.note ? <p className="mt-1 text-sm text-neutral-700">{d.note}</p> : null}
                      {d.link ? (
                        <a
                          href={d.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block max-w-full truncate text-sm underline underline-offset-4"
                        >
                          {d.link}
                        </a>
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-7 shrink-0 items-center rounded-full border px-3 text-xs font-semibold",
                        tone[d.status],
                      )}
                    >
                      {d.status}
                    </span>
                  </div>

                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-500">
                    <div className="flex gap-1">
                      <dt>수정</dt>
                      <dd className="tabular-nums">{short(d.updatedAt)}</dd>
                    </div>
                    {d.requestedAt ? (
                      <div className="flex gap-1">
                        <dt>승인 요청</dt>
                        <dd className="tabular-nums">{short(d.requestedAt)}</dd>
                      </div>
                    ) : null}
                    {d.decidedAt ? (
                      <div className="flex gap-1">
                        <dt>{d.status === "승인 완료" ? "승인" : "수정 요청"}</dt>
                        <dd>
                          {short(d.decidedAt)} · {d.decidedBy}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  {d.status === "수정 요청" && d.feedback ? (
                    <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                      고객 의견: {d.feedback}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-4">
                    {d.status === "작성 중" ? (
                      <form action={requestApprovalAction.bind(null, project.id, d.id)}>
                        <button type="submit" className={btnDark}>
                          고객에게 승인 요청
                        </button>
                      </form>
                    ) : null}
                    {d.status === "승인 요청" ? (
                      <form action={withdrawApprovalAction.bind(null, project.id, d.id)}>
                        <button type="submit" className={btnLight}>
                          요청 거두기
                        </button>
                      </form>
                    ) : null}
                    {d.status === "수정 요청" ? (
                      <form
                        action={newVersionAction.bind(null, project.id, d.id)}
                        className="flex flex-wrap items-end gap-2"
                      >
                        <div>
                          <label htmlFor={`nv-${d.id}`} className={label}>
                            새 버전
                          </label>
                          <input
                            id={`nv-${d.id}`}
                            name="version"
                            required
                            placeholder="예: v3"
                            className={`${input} w-28`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`nl-${d.id}`} className={label}>
                            새 링크 (선택)
                          </label>
                          <input id={`nl-${d.id}`} name="link" className={`${input} w-64`} />
                        </div>
                        {uploads ? (
                          <div>
                            <label htmlFor={`nf-${d.id}`} className={label}>
                              또는 새 파일
                            </label>
                            <input
                              id={`nf-${d.id}`}
                              name="file"
                              type="file"
                              accept={UPLOAD_ACCEPT}
                              className={`${fileInput} w-64`}
                            />
                          </div>
                        ) : null}
                        <button type="submit" className={btnDark}>
                          올리고 다시 승인 요청
                        </button>
                      </form>
                    ) : null}
                    <Link
                      href={`${href.deliverables}?edit=${d.id}#${d.id}` as Route}
                      className={btnSmall}
                    >
                      수정
                    </Link>
                    <form
                      action={removeDeliverableAction.bind(null, project.id, d.id)}
                      className="ml-auto"
                    >
                      <button type="submit" className="text-xs text-neutral-400 hover:text-red-600">
                        삭제
                      </button>
                    </form>
                  </div>
                </>
              )}
            </li>
          ))}
          {ordered.length === 0 ? (
            <li className="text-sm text-neutral-500">아직 올린 산출물이 없습니다.</li>
          ) : null}
        </ul>
      </Panel>

      <Panel
        title="산출물 올리기"
        sub="기획서, 디자인 시안, 테스트 주소처럼 고객 확인이 필요한 결과물"
      >
        <form
          action={addDeliverableAction.bind(null, project.id)}
          className="grid gap-3 sm:grid-cols-4"
        >
          {error ? (
            <p role="alert" className="text-sm text-red-600 sm:col-span-4">
              {error === "file"
                ? "파일을 올리지 못했습니다. 형식(PDF·문서·이미지·ZIP)과 크기(50MB)를 확인해 주세요."
                : "이름과 단계를 입력해 주세요."}
            </p>
          ) : null}
          <div className="sm:col-span-2">
            <label htmlFor="d-name" className={label}>
              이름
            </label>
            <input
              id="d-name"
              name="name"
              required
              placeholder="예: 디자인 시안"
              className={input}
            />
          </div>
          <div>
            <label htmlFor="d-version" className={label}>
              버전
            </label>
            <input id="d-version" name="version" placeholder="v1" className={input} />
          </div>
          <div>
            <label htmlFor="d-stage" className={label}>
              단계
            </label>
            <Picker
              id="d-stage"
              name="stage"
              defaultValue={project.stage}
              options={toOptions(PM_STAGES)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-link" className={label}>
              링크 (Figma, 테스트 주소, 문서)
            </label>
            <input id="d-link" name="link" placeholder="https://" className={input} />
            {uploads ? (
              <div className="mt-2">
                <label htmlFor="d-file" className={label}>
                  또는 파일 ({UPLOAD_HINT})
                </label>
                <input
                  id="d-file"
                  name="file"
                  type="file"
                  accept={UPLOAD_ACCEPT}
                  className={fileInput}
                />
              </div>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-ms" className={label}>
              연결 마일스톤 (승인되면 같이 완료)
            </label>
            <Picker
              id="d-ms"
              name="milestoneId"
              options={[
                { value: "", label: "없음" },
                ...project.milestones
                  .filter((m) => !m.doneAt)
                  .map((m) => ({ value: m.id, label: m.title, hint: short(m.due) })),
              ]}
            />
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="d-note" className={label}>
              설명 (고객에게 보임)
            </label>
            <textarea
              id="d-note"
              name="note"
              rows={2}
              placeholder="무엇을 확인하면 되는지 적어 주세요."
              className={textarea}
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-4">
            <button type="submit" name="intent" value="save" className={btnLight}>
              올리기
            </button>
            <button type="submit" name="intent" value="request" className={btnDark}>
              올리고 승인 요청
            </button>
          </div>
        </form>
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectDeliverablesPage({
  projectId,
  edit,
  error,
}: {
  projectId: string;
  edit?: string;
  error?: string;
}) {
  return (
    <AdminPage>
      <Body projectId={projectId} edit={edit} error={error} />
    </AdminPage>
  );
}
