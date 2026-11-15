import type { Route } from "next";
import Link from "next/link";
import { demoAccounts } from "@/server/auth";
import { listClients, listProjects, listRequests, requireStaff } from "@/server/projects";
import { routes } from "@/shared/config";
import {
  createClientAction,
  linkAccountAction,
  removeClientAction,
  renameClientAction,
  unlinkAccountAction,
} from "../api/actions";
import { AdminPage } from "./admin-page";
import { AdminTitle, Panel, btnDark, btnLight, btnSmall, input, label, linkName } from "./ui";

const errors: Record<string, string> = {
  email: "이메일 형식을 확인해 주세요.",
  inuse: "프로젝트나 요청이 있는 고객사는 지울 수 없습니다. 프로젝트를 먼저 정리해 주세요.",
};

/** 고객사: 이름, 포털 계정 연결, 프로젝트 */
async function Body({ edit, error }: { edit?: string; error?: string }) {
  await requireStaff(routes.admin.clients);
  const clients = listClients();
  const projects = listProjects();
  const accountLabel = (id: string) => {
    const a = demoAccounts.find((x) => x.id === id);
    return a
      ? { email: a.email, name: a.name, pending: false }
      : { email: id, name: "", pending: true };
  };

  return (
    <>
      <AdminTitle
        title="고객사"
        sub="포털 계정을 연결하면 그 계정으로 로그인한 담당자가 이 고객사의 공개 항목을 봅니다."
      />
      {error && errors[error] ? (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors[error]}
        </p>
      ) : null}

      <ul className="flex flex-col gap-4">
        {clients.map((c) => {
          const own = projects.filter((p) => p.clientId === c.id);
          const open = listRequests({ clientId: c.id }).filter((r) => r.status !== "완료").length;
          return (
            <li
              key={c.id}
              id={c.id}
              className="scroll-mt-6 rounded-lg border border-neutral-300 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {edit === c.id ? (
                  <form
                    action={renameClientAction.bind(null, c.id)}
                    className="flex flex-wrap items-end gap-2"
                  >
                    <div>
                      <label htmlFor={`cn-${c.id}`} className={label}>
                        고객사 이름
                      </label>
                      <input
                        id={`cn-${c.id}`}
                        name="name"
                        defaultValue={c.name}
                        required
                        className={`${input} w-72`}
                      />
                    </div>
                    <button type="submit" className={btnDark}>
                      저장
                    </button>
                    <Link href={routes.admin.clients} className={btnLight}>
                      취소
                    </Link>
                  </form>
                ) : (
                  <div>
                    <h2 className="text-lg font-bold">{c.name}</h2>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      프로젝트 {own.length} · 열린 요청 {open}
                    </p>
                  </div>
                )}
                {edit === c.id ? null : (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`${routes.admin.clients}?edit=${c.id}#${c.id}` as Route}
                      className={btnSmall}
                    >
                      이름 수정
                    </Link>
                    <form action={removeClientAction.bind(null, c.id)}>
                      <button type="submit" className="text-xs text-neutral-400 hover:text-red-600">
                        삭제
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <div>
                  <p className={label}>프로젝트</p>
                  {own.length > 0 ? (
                    <ul className="flex flex-col gap-1.5 text-sm">
                      {own.map((p) => (
                        <li key={p.id}>
                          <Link href={routes.admin.project(p.id)} className={linkName}>
                            {p.name}
                          </Link>{" "}
                          <span className="text-xs text-neutral-500">
                            {p.archivedAt ? "보관" : p.stage}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-neutral-500">
                      없음 ·{" "}
                      <Link href={routes.admin.newProject} className="underline underline-offset-4">
                        새 프로젝트
                      </Link>
                    </p>
                  )}
                </div>
                <div>
                  <p className={label}>포털 계정</p>
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {c.accountIds.map((id) => {
                      const a = accountLabel(id);
                      return (
                        <li key={id} className="flex items-center justify-between gap-3">
                          <span>
                            {a.email}
                            {a.name ? (
                              <span className="ml-1.5 text-xs text-neutral-500">{a.name}</span>
                            ) : null}
                            {a.pending ? (
                              <span className="ml-1.5 rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                                가입 전
                              </span>
                            ) : null}
                          </span>
                          <form action={unlinkAccountAction.bind(null, c.id, id)}>
                            <button
                              type="submit"
                              className="text-xs text-neutral-400 hover:text-red-600"
                            >
                              연결 해제
                            </button>
                          </form>
                        </li>
                      );
                    })}
                    {c.accountIds.length === 0 ? (
                      <li className="text-neutral-500">연결된 계정 없음</li>
                    ) : null}
                  </ul>
                  <form action={linkAccountAction.bind(null, c.id)} className="mt-3 flex gap-2">
                    <label htmlFor={`la-${c.id}`} className="sr-only">
                      연결할 계정 이메일
                    </label>
                    <input
                      id={`la-${c.id}`}
                      name="email"
                      type="email"
                      required
                      placeholder="담당자 이메일"
                      className={input}
                    />
                    <button type="submit" className={btnLight}>
                      연결
                    </button>
                  </form>
                  <p className="mt-1.5 text-xs text-neutral-400">
                    아직 가입하지 않은 이메일은 &lsquo;가입 전&rsquo;으로 남고, 가입하면
                    연결됩니다(회원 DB 연결 후).
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Panel title="고객사 추가">
        <form action={createClientAction} className="flex max-w-xl gap-2">
          <label htmlFor="new-client" className="sr-only">
            고객사 이름
          </label>
          <input
            id="new-client"
            name="name"
            required
            placeholder="예: 주식회사 OO"
            className={input}
          />
          <button type="submit" className={btnDark}>
            추가
          </button>
        </form>
      </Panel>
    </>
  );
}

export function AdminClientsPage({ edit, error }: { edit?: string; error?: string }) {
  return (
    <AdminPage>
      <Body edit={edit} error={error} />
    </AdminPage>
  );
}
