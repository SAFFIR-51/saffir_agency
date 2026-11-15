import { Picker, toOptions } from "@/shared/ui";
import {
  REQUEST_PRIORITIES,
  listClients,
  listProjects,
  listRequests,
  listStaff,
  requireStaff,
} from "@/server/projects";
import { routes } from "@/shared/config";
import { AdminPage } from "./admin-page";
import { RequestList } from "./request-list";
import { createRequestAction } from "../api/actions";
import { AdminTitle, Panel, btnDark, input, label, textarea } from "./ui";

async function Body({ status, error }: { status?: string; error?: boolean }) {
  await requireStaff(routes.admin.requests);
  const requests = listRequests();
  const targets = listClients().flatMap((c) => [
    { value: `${c.id}|`, label: `${c.name} 전체`, group: c.name, hint: "프로젝트 없음" },
    ...listProjects()
      .filter((p) => p.clientId === c.id && !p.archivedAt)
      .map((p) => ({ value: `${c.id}|${p.id}`, label: p.name, group: c.name })),
  ]);
  return (
    <>
      <AdminTitle
        title="요청함"
        sub="고객이 포털에서 보낸 수정 요청·장애 신고·문의입니다. 긴급한 것부터 보입니다."
      />
      <RequestList requests={requests} basePath={routes.admin.requests} status={status} />

      <Panel
        id="new"
        title="요청 직접 등록"
        sub="전화·메신저로 받은 요청을 대신 남깁니다. 고객 포털 '요청·문의'에도 보입니다."
      >
        <form action={createRequestAction} className="grid max-w-4xl gap-3 sm:grid-cols-4">
          {error ? (
            <p role="alert" className="text-sm text-red-600 sm:col-span-4">
              고객사, 유형, 제목을 입력해 주세요.
            </p>
          ) : null}
          <div className="sm:col-span-2">
            <label htmlFor="nr-client" className={label}>
              고객사 · 프로젝트
            </label>
            <Picker
              id="nr-client"
              name="target"
              defaultValue={targets[0]?.value}
              options={targets}
            />
          </div>
          <div>
            <label htmlFor="nr-kind" className={label}>
              유형
            </label>
            <Picker
              id="nr-kind"
              name="kind"
              defaultValue="수정 요청"
              options={toOptions(["수정 요청", "장애 신고", "문의"])}
            />
          </div>
          <div>
            <label htmlFor="nr-priority" className={label}>
              우선순위
            </label>
            <Picker
              id="nr-priority"
              name="priority"
              defaultValue="보통"
              options={toOptions(REQUEST_PRIORITIES)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="nr-title" className={label}>
              제목
            </label>
            <input id="nr-title" name="title" required className={input} />
          </div>
          <div>
            <label htmlFor="nr-from" className={label}>
              요청한 사람
            </label>
            <input id="nr-from" name="from" placeholder="예: 데모 팀장" className={input} />
          </div>
          <div>
            <label htmlFor="nr-assignee" className={label}>
              담당
            </label>
            <Picker id="nr-assignee" name="assignee" options={toOptions(listStaff(), "미지정")} />
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="nr-body" className={label}>
              내용
            </label>
            <textarea id="nr-body" name="body" rows={3} className={textarea} />
          </div>
          <div className="sm:col-span-4">
            <button type="submit" className={btnDark}>
              요청 등록
            </button>
          </div>
        </form>
      </Panel>
    </>
  );
}

export function AdminRequestsPage({ status, error }: { status?: string; error?: boolean }) {
  return (
    <AdminPage>
      <Body status={status} error={error} />
    </AdminPage>
  );
}
