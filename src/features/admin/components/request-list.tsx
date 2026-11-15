import { Picker, toOptions } from "@/shared/ui";
import type { Route } from "next";
import Link from "next/link";
import {
  REQUEST_PRIORITIES,
  REQUEST_STATUSES,
  getClient,
  getProject,
  listStaff,
  short,
  type PmRequest,
} from "@/server/projects";
import { cn } from "@/shared/lib";
import {
  editRequestAction,
  removeRequestAction,
  replyRequestAction,
  updateRequestAction,
} from "../api/actions";
import { Dot, StatusTag, btnDark, btnLight, input, label, textarea } from "./ui";

const filters = ["열린 요청", ...REQUEST_STATUSES, "전체"] as const;

/** 요청 목록: 상태 탭 + 줄을 펼쳐 답변·처리 */
export function RequestList({
  requests,
  basePath,
  status,
  showProject = true,
}: {
  requests: PmRequest[];
  basePath: string;
  status?: string;
  showProject?: boolean;
}) {
  const active = filters.find((f) => f === status) ?? "열린 요청";
  const match = (r: PmRequest) =>
    active === "전체" ? true : active === "열린 요청" ? r.status !== "완료" : r.status === active;
  const prio = (r: PmRequest) => REQUEST_PRIORITIES.indexOf(r.priority);
  const shown = requests.filter(match).toSorted((a, b) => prio(a) - prio(b));
  const staff = listStaff();

  return (
    <>
      <div
        role="tablist"
        aria-label="요청 상태"
        className="flex gap-5 overflow-x-auto border-b border-neutral-300"
      >
        {filters.map((f) => {
          const n = requests.filter((r) =>
            f === "전체" ? true : f === "열린 요청" ? r.status !== "완료" : r.status === f,
          ).length;
          return (
            <Link
              key={f}
              role="tab"
              aria-selected={f === active}
              href={
                (f === "열린 요청"
                  ? basePath
                  : `${basePath}?status=${encodeURIComponent(f)}`) as Route
              }
              className={cn(
                "-mb-px border-b-2 pb-2.5 text-sm font-semibold whitespace-nowrap",
                f === active
                  ? "border-black text-black"
                  : "border-transparent text-neutral-400 hover:text-black",
              )}
            >
              {f} <span className="tabular-nums">{n}</span>
            </Link>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {shown.map((r) => (
          <li key={r.id} id={r.id} className="scroll-mt-6">
            <details className="group rounded-lg border border-neutral-300 open:border-black">
              <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[4.5rem_minmax(0,1fr)_9rem_6rem_5rem_5rem] [&::-webkit-details-marker]:hidden">
                <span className="text-sm">
                  <Dot value={r.priority} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{r.title}</span>
                  <span className="block text-xs text-neutral-500">
                    {r.id} · {r.kind} · {r.from}
                    {showProject
                      ? ` · ${r.projectId ? getProject(r.projectId)?.name : getClient(r.clientId)?.name}`
                      : ""}
                  </span>
                </span>
                <span className="hidden text-sm text-neutral-600 sm:block">
                  {r.assignee || "담당 미정"}
                </span>
                <span className="hidden text-sm text-neutral-500 tabular-nums sm:block">
                  {short(r.createdAt)}
                </span>
                <span className="hidden text-xs sm:block">
                  {r.reply ? "답변함" : <span className="text-red-600">답변 전</span>}
                </span>
                <span className="justify-self-end">
                  <StatusTag value={r.status} />
                </span>
              </summary>

              <div className="grid gap-6 border-t border-neutral-200 px-4 py-5 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className={label}>고객 요청 내용</p>
                    <p className="text-sm leading-[1.7] whitespace-pre-line">{r.body}</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-neutral-500 underline underline-offset-4 hover:text-black">
                        요청 내용 고치기
                      </summary>
                      <form
                        action={editRequestAction.bind(null, r.id)}
                        className="mt-3 flex flex-col gap-2 rounded-lg bg-neutral-50 p-3"
                      >
                        <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)]">
                          <Picker
                            name="kind"
                            defaultValue={r.kind}
                            label="유형"
                            options={toOptions(["수정 요청", "장애 신고", "문의"])}
                          />
                          <input
                            name="title"
                            defaultValue={r.title}
                            aria-label="제목"
                            className={input}
                          />
                        </div>
                        <textarea
                          name="body"
                          rows={3}
                          defaultValue={r.body}
                          aria-label="내용"
                          className={textarea}
                        />
                        <div className="flex items-center gap-3">
                          <button type="submit" className={btnLight}>
                            저장
                          </button>
                        </div>
                      </form>
                      <form action={removeRequestAction.bind(null, r.id)} className="mt-2">
                        <button
                          type="submit"
                          className="text-xs text-neutral-400 hover:text-red-600"
                        >
                          요청 삭제
                        </button>
                      </form>
                    </details>
                  </div>
                  <form
                    action={replyRequestAction.bind(null, r.id)}
                    className="flex flex-col gap-2"
                  >
                    <label htmlFor={`reply-${r.id}`} className={label}>
                      고객에게 보낼 답변{" "}
                      {r.repliedAt ? (
                        <span className="font-normal">(마지막 {short(r.repliedAt)})</span>
                      ) : null}
                    </label>
                    <textarea
                      id={`reply-${r.id}`}
                      name="reply"
                      rows={3}
                      defaultValue={r.reply}
                      placeholder="고객 포털에 그대로 보입니다."
                      className={textarea}
                    />
                    <div>
                      <button type="submit" className={btnDark}>
                        답변 보내기
                      </button>
                    </div>
                  </form>
                </div>

                <form
                  action={updateRequestAction.bind(null, r.id)}
                  className="flex flex-col gap-3 rounded-lg bg-neutral-50 p-4"
                >
                  <p className="text-xs font-semibold text-neutral-600">처리 (내부)</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label htmlFor={`st-${r.id}`} className={label}>
                        상태
                      </label>
                      <Picker
                        id={`st-${r.id}`}
                        name="status"
                        defaultValue={r.status}
                        options={toOptions(REQUEST_STATUSES)}
                      />
                    </div>
                    <div>
                      <label htmlFor={`pr-${r.id}`} className={label}>
                        우선순위
                      </label>
                      <Picker
                        id={`pr-${r.id}`}
                        name="priority"
                        defaultValue={r.priority}
                        options={toOptions(REQUEST_PRIORITIES)}
                      />
                    </div>
                    <div>
                      <label htmlFor={`as-${r.id}`} className={label}>
                        담당
                      </label>
                      <Picker
                        id={`as-${r.id}`}
                        name="assignee"
                        defaultValue={r.assignee}
                        options={toOptions(staff, "미지정")}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`memo-${r.id}`} className={label}>
                      내부 메모 (고객에게 안 보임)
                    </label>
                    <textarea
                      id={`memo-${r.id}`}
                      name="memo"
                      rows={2}
                      defaultValue={r.memo}
                      className={textarea}
                    />
                  </div>
                  <div>
                    <button type="submit" className={btnLight}>
                      처리 저장
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500">상태를 바꾸면 고객에게 알림이 갑니다.</p>
                </form>
              </div>
            </details>
          </li>
        ))}
        {shown.length === 0 ? (
          <li className="py-6 text-sm text-neutral-500">해당하는 요청이 없습니다.</li>
        ) : null}
      </ul>
    </>
  );
}
