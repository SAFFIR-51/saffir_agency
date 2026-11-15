import { Picker, toOptions } from "@/shared/ui";
import Link from "next/link";
import {
  PM_STAGES,
  addDays,
  listClients,
  listStaff,
  requireStaff,
  todayKST,
} from "@/server/projects";
import { routes } from "@/shared/config";
import { createProjectAction } from "../api/actions";
import { AdminPage } from "./admin-page";
import { AdminTitle, Panel, btnDark, btnLight, input, label } from "./ui";

/** 새 프로젝트: 고객사·기간을 넣으면 단계별 마일스톤을 기간에 맞춰 자동으로 깐다 */
async function Body({ error }: { error?: boolean }) {
  const session = await requireStaff(routes.admin.newProject);
  const today = todayKST();
  return (
    <>
      <AdminTitle
        title="새 프로젝트"
        sub="기간과 단계를 고르면 단계별 마일스톤이 기간에 맞춰 만들어집니다. 만든 뒤 날짜를 고치면 됩니다."
      />
      <form action={createProjectAction} className="max-w-3xl">
        {error ? (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            이름과 기간을 확인해 주세요. 종료일은 시작일보다 뒤여야 합니다.
          </p>
        ) : null}
        <Panel title="고객사" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="n-client" className={label}>
                기존 고객사
              </label>
              <Picker
                id="n-client"
                name="clientId"
                options={[
                  { value: "", label: "새 고객사 (오른쪽에 입력)" },
                  ...listClients().map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
            </div>
            <div>
              <label htmlFor="n-client-name" className={label}>
                새 고객사 이름
              </label>
              <input
                id="n-client-name"
                name="clientName"
                placeholder="예: 주식회사 OO"
                className={input}
              />
            </div>
          </div>
        </Panel>
        <Panel title="프로젝트">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="n-name" className={label}>
                프로젝트 이름 (고객에게 보임)
              </label>
              <input
                id="n-name"
                name="name"
                required
                placeholder="예: 예약 웹앱 MVP"
                className={input}
              />
            </div>
            <div>
              <label htmlFor="n-pm" className={label}>
                PM
              </label>
              <Picker
                id="n-pm"
                name="pm"
                defaultValue={session.name}
                options={toOptions(listStaff())}
              />
            </div>
            <div />
            <div>
              <label htmlFor="n-start" className={label}>
                시작
              </label>
              <input
                id="n-start"
                name="start"
                type="date"
                required
                defaultValue={today}
                className={input}
              />
            </div>
            <div>
              <label htmlFor="n-end" className={label}>
                종료 (오픈)
              </label>
              <input
                id="n-end"
                name="end"
                type="date"
                required
                defaultValue={addDays(today, 84)}
                className={input}
              />
            </div>
          </div>
        </Panel>
        <Panel
          title="단계"
          sub="이 프로젝트에 있는 단계만 고르세요. 단계마다 마일스톤 1개가 만들어집니다."
        >
          <div className="flex flex-wrap gap-2">
            {PM_STAGES.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="checkbox"
                  name={`stage-${s}`}
                  defaultChecked
                  className="peer sr-only"
                />
                <span className="inline-flex h-10 items-center rounded-lg border border-neutral-300 px-4 text-sm text-neutral-600 peer-checked:border-black peer-checked:bg-black peer-checked:font-semibold peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </Panel>
        <div className="mt-10 flex gap-2">
          <button type="submit" className={btnDark}>
            프로젝트 만들기
          </button>
          <Link href={routes.admin.projects} className={btnLight}>
            취소
          </Link>
        </div>
      </form>
    </>
  );
}

export function NewProjectPage({ error }: { error?: boolean }) {
  return (
    <AdminPage>
      <Body error={error} />
    </AdminPage>
  );
}
